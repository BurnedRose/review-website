import Image from "next/image";
import React from "react";
import Link from 'next/link';
import { assets } from "@/Assets/assets";

const Header = () => {
  return (
    <div className="bg-[#7BAE67] text-white px-6 sm:px-12 lg:px-24 py-4"> 
      {/* NAVBAR */}
      <div className="flex justify-between items-center">
        {/* LOGO */}
        <div className="flex items-center">
          <Image
            src={assets.logo}
            alt="logo"
            width={160}       
            height={60}
            className="h-[60px] w-auto" 
          />
        </div>

        {/* SIGNUP/LOGIN BUTTON */}
        <Link href="/login" className="bg-white text-green-800 text-sm font-semibold px-4 py-2 rounded-full shadow-md hover:bg-gray-100">
        Signup/Login
        </Link>
      </div>
    </div>
  );
};

export default Header;
