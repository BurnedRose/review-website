// app/api/review/[id]/like/route.js

import { NextResponse } from 'next/server'
import { ConnectDB } from '@/lib/config/db'
import ReviewModel from "@/lib/models/ReviewModel";

export async function POST(req, {params}) {
  try {
    await ConnectDB()

    const { id } = params
    const { userId } = await req.json()

    if (!userId || typeof userId !== 'string') {
      return NextResponse.json({ success: false, message: 'Missing or invalid userId' }, { status: 400 })
    }

    const review = await ReviewModel.findById(id)
    if (!review) {
      return NextResponse.json({ success: false, message: 'Review not found' }, { status: 404 })
    }

    // Ensure `likes` is always an array
    if (!Array.isArray(review.likes)) {
      review.likes = []
    }

    const alreadyLiked = review.likes.includes(userId)

    if (alreadyLiked) {
      review.likes = review.likes.filter(uid => uid !== userId)
    } else {
      review.likes.push(userId)
    }

    await review.save()

    return NextResponse.json({
      success: true,
      liked: !alreadyLiked,
      totalLikes: review.likes.length,
    })
  } catch (error) {
    console.error('Error toggling like:', error)
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 })
  }
}
