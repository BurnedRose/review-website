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

  date: {
    type: Date,
    default: Date.now, // ✅ ไม่มีวงเล็บ
  },

  rating: {
    type: Number,
    required: true, // ✅ เพิ่ม field นี้
    min: 1,
    max: 5,
  },
});

const ReviewModel = mongoose.models.review || mongoose.model("review", Schema);

export default ReviewModel;
