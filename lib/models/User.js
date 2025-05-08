import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // ระบุว่า name เป็นข้อมูลที่จำเป็น
    },
    username: {
      type: String,
      required: true, // ระบุว่า username เป็นข้อมูลที่จำเป็น
      unique: true,    // ระบุว่า username ต้องไม่ซ้ำ
    },
    bio: {
      type: String,
      default: "ComSci enthusiast", // ตั้งค่าค่าพื้นฐานให้ bio
    },
    profileImageUrl: {
      type: String,
      default: "", // ตั้งค่าค่าพื้นฐานให้ profileImageUrl เป็นค่าว่าง
    },
  },
  { timestamps: true } // เพิ่ม timestamps เพื่อให้ MongoDB จัดเก็บเวลาสร้างและอัปเดตข้อมูล
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
