import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  authorImg: {
    type: String,
    required: true,
  },
<<<<<<< HEAD
  date:{
        type:Date,
        default:Date.now(),
    },
=======
  date: {
    type: Date,
    default: Date.now(),
  },
>>>>>>> 4425184a5bf9d11b737f3cf8b1ce439170fadd40
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
<<<<<<< HEAD
  }
 /* // เพิ่มฟิลด์เพื่อเก็บข้อมูลสำหรับตรวจสอบการสแปม
=======
  },
>>>>>>> 4425184a5bf9d11b737f3cf8b1ce439170fadd40
  ip: {
    type: String,
    default: "unknown"
  }
  userAgent: {
    type: String,
    default: "unknown"
  }
  createdAt: {
    type: Date,
    default: Date.now
  }
    */
});

// สร้าง index เพื่อเพิ่มประสิทธิภาพในการค้นหา
Schema.index({ author: 1, createdAt: -1 });
Schema.index({ ip: 1, createdAt: -1 });
Schema.index({ title: "text", description: "text" });

const ReviewModel = mongoose.models.review || mongoose.model("review", Schema);

export default ReviewModel;