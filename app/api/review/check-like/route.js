import ReviewModel from '@/models/ReviewModel';
import dbConnect from '@/lib/dbConnect';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ success: false, message: 'กรุณาระบุ userId' });
  }

  try {
    if (req.method === 'GET') {
      const review = await ReviewModel.findById(id);

      if (!review) {
        return res.status(404).json({ success: false, message: 'ไม่พบรีวิวที่ต้องการ' });
      }

      const hasLiked = review.likedBy && review.likedBy.includes(userId);

      return res.status(200).json({
        success: true,
        hasLiked: hasLiked,
        likes: review.likes,
        views: review.views
      });
    }

    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  } catch (error) {
    console.error('Error checking like status:', error);
    return res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดบนเซิร์ฟเวอร์' });
  }
}
