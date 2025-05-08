import ReviewModel from "@/lib/models/ReviewModel";
import { ConnectDB } from "@/lib/config/db";

export default async function handler(req, res) {
  await ConnectDB();
  const { id } = req.query;
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const userAgent = req.headers['user-agent'] || 'unknown';

  try {
    if (req.method === 'POST') {
      const review = await ReviewModel.findByIdAndUpdate(
        id,
        {
          $inc: { views: 1 },
          ip: Array.isArray(ip) ? ip[0] : ip,
          userAgent
        },
        { new: true }
      );

      if (!review) {
        return res.status(404).json({ success: false, message: 'ไม่พบรีวิวที่ต้องการ' });
      }

      return res.status(200).json({
        success: true,
        message: 'เพิ่มจำนวนวิวเรียบร้อยแล้ว',
        views: review.views
      });
    }

    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  } catch (error) {
    console.error('Error handling view count:', error);
    return res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดบนเซิร์ฟเวอร์' });
  }
}
