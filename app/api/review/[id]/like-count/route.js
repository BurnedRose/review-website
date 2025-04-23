import { ConnectDB } from "@/lib/config/db";
import ReviewModel from "@/lib/models/ReviewModel";
import { NextResponse } from "next/server";


export async function GET(_, { params }) {
  await ConnectDB()

  const { id } = params

  try {
    const review = await ReviewModel.findById(id)
    if (!review) {
      return NextResponse.json({ success: false, message: "Review not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      totalLikes: review.likes.length,
    })
  } catch (err) {
    console.error('Error fetching like count:', err)
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 })
  }
}
