import { NextResponse } from 'next/server';
import { ConnectDB } from "@/lib/config/db"; 
import User from '@/lib/models/User';

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, username, bio, profileImageUrl } = body;

    // ตรวจสอบข้อมูลที่ได้รับ
    if (!name || !username || !bio || !profileImageUrl) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    // เชื่อมต่อกับฐานข้อมูล MongoDB
    await ConnectDB();

    // ค้นหาและอัปเดตข้อมูลผู้ใช้ (ถ้าไม่พบจะเพิ่มผู้ใช้ใหม่)
    const updatedUser = await User.findOneAndUpdate(
      { username },
      { name, bio, profileImageUrl: profileImageUrl }, // อัปเดตข้อมูลโปรไฟล์
      { upsert: true, new: true } // upsert: ถ้าไม่พบจะเพิ่มใหม่, new: คืนค่าเอกสารที่อัปเดตแล้ว
    );

    // ตรวจสอบผลลัพธ์
    if (updatedUser) {
      return NextResponse.json({ 
        success: true, 
        message: "Profile updated", 
        imageUrl: profileImageUrl,
        user: updatedUser // ส่งข้อมูลผู้ใช้ที่อัปเดตกลับไปด้วย
      });
    } else {
      return NextResponse.json({ success: false, message: "Failed to update profile" }, { status: 400 });
    }
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, message: "Something went wrong", error: error.message }, { status: 500 });
  }
}
