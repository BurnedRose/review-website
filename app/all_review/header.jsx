import Image from "next/image";
import React, { useState, useEffect } from "react";
import { assets } from "@/Assets/assets";
import Link from 'next/link';
import { FaUserCircle } from "react-icons/fa"; // Import user icon from react-icons

const Header = () => {
  // State to manage dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  // Add event listener to close dropdown when clicking outside
  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('click', closeDropdown);
    }
    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, [isDropdownOpen]);

  // Prevent clicks inside dropdown from closing it
  const handleDropdownClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="bg-[#7BAE67] text-white px-6 sm:px-12 lg:px-24 py-4"> {/* ✅ ความสูงแทบเขียว */}
      {/* NAVBAR */}
      <div className="flex justify-between items-center">
        {/* LOGO */}
        <div className="flex items-center">
          <Image
            src={assets.logo}
            alt="logo"
            width={160}      // ✅ โลโก้เล็กลง
            height={60}
            className="h-[60px] w-auto" // ✅ จำกัดขนาดเฉพาะโลโก้
          />
        </div>
        
        {/* MENU */}
        <div className="hidden md:flex space-x-10 font-semibold text-lg">
          <a href="/all_review" className="hover:underline">Home</a>
          <a href="/blog" className="hover:underline">Blog</a>
          <a href="/about" className="hover:underline">About</a>
        </div>
        
        {/* ACCOUNT DROPDOWN */}
        <div className="relative">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              toggleDropdown();
            }} 
            className="flex items-center text-white hover:text-gray-200 focus:outline-none"
          >
            {/* Account Icon from react-icons */}
            <FaUserCircle size={24} />
          </button>
          
          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div 
              className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
              onClick={handleDropdownClick}
            >
              <Link 
                href="/user-account" 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                User Account
              </Link>
              <Link 
                href="/after" 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Member Account
              </Link>
              <div className="border-t border-gray-100 my-1"></div>
              <Link 
                href="/" 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;