import ReviewModel from "@/lib/models/ReviewModel";
import { ConnectDB } from "@/lib/config/db";

export default async function handler(req, res) {
  await ConnectDB();
  const { id } = req.query;
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ success: false, message: 'กรุณาระบุ userId' });
  }

  try {
    if (req.method === 'POST') {
      const review = await ReviewModel.findById(id);

      if (!review) {
        return res.status(404).json({ success: false, message: 'ไม่พบรีวิวที่ต้องการ' });
      }

      const hasLiked = review.likedBy && review.likedBy.includes(userId);

      if (hasLiked) {
        await ReviewModel.findByIdAndUpdate(id, {
          $inc: { likes: -1 },
          $pull: { likedBy: userId }
        });

        return res.status(200).json({
          success: true,
          message: 'ยกเลิกการกดไลค์เรียบร้อยแล้ว',
          action: 'unliked'
        });
      } else {
        await ReviewModel.findByIdAndUpdate(id, {
          $inc: { likes: 1 },
          $push: { likedBy: userId }
        });

        return res.status(200).json({
          success: true,
          message: 'กดไลค์เรียบร้อยแล้ว',
          action: 'liked'
        });
      }
    }

    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  } catch (error) {
    console.error('Error handling like:', error);
    return res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดบนเซิร์ฟเวอร์' });
  }
}