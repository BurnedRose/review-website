// server.js
const express = require('express');
const http = require('http');
const { MongoClient } = require('mongodb');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // อนุญาต URL ของ Next.js client
    methods: ["GET", "POST"]
  }
});

// กำหนด URI ของ MongoDB (ต้องเป็น replica set หรือ sharded cluster)
const uri = 'mongodb://localhost:27017/yourDatabase?replicaSet=rs0'; // แก้ไขตาม URI ของคุณ
const client = new MongoClient(uri);

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('เชื่อมต่อกับ MongoDB สำเร็จ');
    
    const db = client.db('yourDatabase'); // แก้ไขตามชื่อ database ของคุณ
    const userStatsCollection = db.collection('userStats');
    
    // ตั้งค่า Change Stream เพื่อติดตามการเปลี่ยนแปลงของข้อมูล
    const changeStream = userStatsCollection.watch();
    
    changeStream.on('change', async (change) => {
      // เมื่อมีการเปลี่ยนแปลงในคอลเลกชัน
      if (change.operationType === 'update' || change.operationType === 'insert' || change.operationType === 'replace') {
        try {
          const userId = change.documentKey._id;
          
          // ดึงข้อมูลล่าสุดจาก DB
          const userData = await userStatsCollection.findOne({ _id: userId });
          
          if (userData) {
            // ส่งข้อมูลไปยัง client ที่กำลังฟังอยู่
            io.emit('user-stats-update', {
              userId: userId.toString(),
              posts: userData.posts,
              likes: userData.likes
            });
            console.log('ส่งข้อมูลอัพเดต:', userData);
          }
        } catch (error) {
          console.error('เกิดข้อผิดพลาดในการประมวลผลการเปลี่ยนแปลง:', error);
        }
      }
    });
    
    console.log('เริ่มติดตามการเปลี่ยนแปลงใน userStats collection');
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการเชื่อมต่อ MongoDB:', error);
  }
}

// รับการเชื่อมต่อ Socket.IO
io.on('connection', async (socket) => {
  console.log('Client เชื่อมต่อ:', socket.id);
  
  // เมื่อ client ร้องขอข้อมูลสถิติของผู้ใช้
  socket.on('get-user-stats', async (userId) => {
    try {
      const db = client.db('yourDatabase'); // แก้ไขตามชื่อ database ของคุณ
      const userStats = await db.collection('userStats').findOne({ _id: userId });
      
      if (userStats) {
        socket.emit('user-stats', {
          userId: userId,
          posts: userStats.posts,
          likes: userStats.likes
        });
      } else {
        // ถ้าไม่พบข้อมูลผู้ใช้ ให้ส่งค่าเริ่มต้น
        socket.emit('user-stats', { userId: userId, posts: 0, likes: 0 });
      }
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการดึงข้อมูลสถิติ:', error);
      socket.emit('user-stats', { userId: userId, posts: 0, likes: 0 });
    }
  });
  
  socket.on('disconnect', () => {
    console.log('Client ตัดการเชื่อมต่อ:', socket.id);
  });
});

// เริ่มเซิร์ฟเวอร์
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server กำลังทำงานที่พอร์ต ${PORT}`);
  connectToMongoDB();
});