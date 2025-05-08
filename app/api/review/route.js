import { ConnectDB } from "@/lib/config/db";
import ReviewModel from "@/lib/models/ReviewModel";
import { NextResponse } from "next/server";
import { checkDuplicateReview, checkInappropriateContent } from "@/lib/middlewares/anti-spam";

export async function GET() {
  await ConnectDB();
  try {
    const reviews = await ReviewModel.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(request) {
  await ConnectDB();

  // ดึงข้อมูลจาก request
  const { title, description, category, author, date, rating, authorImg } = await request.json();
  
  // ดึง IP address และ User Agent
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';

  // ตรวจสอบข้อมูล
  if (!title || !description || !category || !author || !rating) {
    return NextResponse.json({ success: false, message: "Missing fields" }, { status: 400 });
  }

  try {
    // ตรวจสอบเนื้อหาที่ไม่เหมาะสม
    const reviewData = { title, description, category, author, rating };
    const contentCheck = checkInappropriateContent(reviewData);
    
    if (contentCheck.isInappropriate) {
      return NextResponse.json({ 
        success: false, 
        message: contentCheck.message 
      }, { status: 400 });
    }
    
    // ตรวจสอบการส่งซ้ำหรือสแปม
    const duplicateCheck = await checkDuplicateReview(ReviewModel, reviewData, ip);
    
    if (duplicateCheck.isDuplicate) {
      return NextResponse.json({ 
        success: false, 
        message: duplicateCheck.message 
      }, { status: 429 });
    }

    // สร้างข้อมูลรีวิวพร้อมข้อมูลเพิ่มเติมสำหรับตรวจสอบ
    const ReviewData = {
      title,
      description,
      category,
      author,
      authorImg: authorImg || "https://i.pravatar.cc/150?u=default",
      date: date || new Date(),
      rating,
      ip,
      userAgent,
      createdAt: new Date()
    };

    // บันทึกข้อมูล
    await ReviewModel.create(ReviewData);
    return NextResponse.json({ success: true, msg: "Review Added" });
  } catch (error) {
    console.error("Error saving review:", error);
    return NextResponse.json({ success: false, message: "Failed to add review" }, { status: 500 });
  }
}