// /pages/api/review/[id]/like.js
import dbConnect from "../../../lib/dbConnect";
import Review from "../../../models/Review";

export default async function handler(req, res) {
  await dbConnect();
  
  const { id } = req.query;

  if (req.method === "POST") {
    try {
      const review = await Review.findByIdAndUpdate(
        id,
        { $inc: { likes: 1 } },
        { new: true }
      );
      res.status(200).json({ success: true, review });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
