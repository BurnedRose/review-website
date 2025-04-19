import Image from "next/image";
import React from "react";
import Link from 'next/link';
import logo from "../../public/logo.png"

const Header = () => {
  return (
    <div className="bg-[#7BAE67] text-white px-6 sm:px-12 lg:px-24 py-4"> 
      {/* NAVBAR */}
      <div className="flex justify-between items-center">
        {/* LOGO */}
        <div className="flex items-center">
          <Image
            src={logo.png}
            alt="logo"
            width={160}       
            height={60}
            className="h-[60px] w-auto" 
          />
        </div>

        {/* MENU */}
        <div className="hidden md:flex space-x-10 font-semibold text-lg">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Blog</a>
          <a href="#" className="hover:underline">About</a>
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
