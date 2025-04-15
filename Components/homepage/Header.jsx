import Image from "next/image";
import React from "react";
import { assets } from "@/Assets/assets";

const Header = () => {
  return (
    <div className="bg-[#7BAE67] text-white px-6 sm:px-12 lg:px-24 py-4"> {/* ✅ ความสูงแทบเขียว */}
      {/* NAVBAR */}
      <div className="flex justify-between items-center">
        {/* LOGO */}
        <div className="flex items-center">
          <Image
            src={assets.logo}
            alt="logo"
            width={160}       // ✅ โลโก้เล็กลง
            height={60}
            className="h-[60px] w-auto" // ✅ จำกัดขนาดเฉพาะโลโก้
          />
        </div>

        {/* MENU */}
        <div className="hidden md:flex space-x-10 font-semibold text-lg">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Blog</a>
          <a href="#" className="hover:underline">About</a>
        </div>

        {/* SIGNUP/LOGIN BUTTON */}
        <button className="bg-white text-black text-sm font-semibold px-4 py-2 rounded-full shadow-md hover:bg-gray-100">
          Signup/Login
        </button>
      </div>
    </div>
  );
};

export default Header;
