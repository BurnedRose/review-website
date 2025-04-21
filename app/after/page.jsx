"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowLeft, FaSignOutAlt, FaEdit } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { FaPen, FaRegHeart } from "react-icons/fa";

export default function AfterPage() {
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [mounted, setMounted] = useState(false);

  // โหลดค่าจาก localStorage เมื่อหน้าโหลด
  useEffect(() => {
    setMounted(true);
    const storedImage = localStorage.getItem("profileImage");
    const storedName = localStorage.getItem("profileName");
    const storedUsername = localStorage.getItem("profileUsername");

    setProfileImage(storedImage || null);
    setName(storedName || "User");
    setUsername(storedUsername || "username");
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f8f4eb] py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Card Container */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          {/* Header with Profile */}
          <div className="relative bg-gradient-to-br from-[#7ea566] to-[#2b5d4a] pt-16 pb-24 px-6 sm:px-10">
            {/* Navigation Controls */}
            <div className="absolute top-6 w-full left-0 px-6 sm:px-10 flex justify-between">
              <Link href="/all_review" className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition duration-300">
                <FaArrowLeft size={20} />
              </Link>
              <Link href="/" className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition duration-300">
                <FaSignOutAlt size={20} />
              </Link>
            </div>
            
            {/* Profile Picture */}
            <div className="flex flex-col items-center">
              <div className="w-36 h-36 bg-[#2b5d4a] rounded-full flex justify-center items-center shadow-xl border-4 border-white overflow-hidden">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <CgProfile className="text-white text-7xl" />
                )}
              </div>
              
              {/* Name with Edit Button */}
              <div className="mt-6 flex items-center">
                <h2 className="text-3xl font-bold text-white drop-shadow-sm">{name}</h2>
                <Link href="/edit">
                  <button aria-label="Edit profile" className="ml-3 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition duration-300">
                    <FaEdit size={18} />
                  </button>
                </Link>
              </div>
              <p className="text-white/90 mt-2">@{username}</p>
            </div>
          </div>
          
          {/* Floating Stats Card */}
          <div className="relative -mt-12 mx-6 sm:mx-10">
            <div className="bg-white rounded-2xl shadow-lg p-4 flex justify-around">
              <div className="text-center">
                <p className="text-2xl font-bold text-[#2b5d4a]">0</p>
                <p className="text-sm text-[#7ea566]">Posts</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-[#2b5d4a]">0</p>
                <p className="text-sm text-[#7ea566]">likes</p>
              </div>
            </div>
          </div>
          
          {/* Content Area */}
          <div className="p-6 sm:p-10 pt-8 bg-[#f8f4eb]">
            <h1 className="text-2xl font-bold text-[#2b5d4a] mb-6">Quick Actions</h1>
            
            {/* Primary Action Button */}
            <Link href="/add-review" className="block mb-8">
              <button className="group w-full flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-[#7ea566] to-[#2b5d4a] text-white rounded-xl text-lg font-semibold shadow-md hover:shadow-lg transform transition duration-300 hover:-translate-y-0.5">
                <FaCirclePlus size={24} className="text-white" />
                <span>Create New Post</span>
              </button>
            </Link>
            
            {/* Account Options */}
            <div className="space-y-3">
              <Link href="/my-posts">
                <div className="flex items-center p-4 bg-[#e5e1d8] hover:bg-white rounded-xl transition duration-300">
                  <div className="p-2 rounded-full bg-[#7ea566] text-white mr-4">
                    <FaPen size={20} />
                  </div>
                  <span className="text-[#2b5d4a] font-medium">My Posts</span>
                  <div className="ml-auto text-[#7ea566]">
                    <FaArrowLeft size={16} className="rotate-180" />
                  </div>
                </div>
              </Link>
              
              <Link href="/liked-posts">
                <div className="flex items-center p-4 bg-[#e5e1d8] hover:bg-white rounded-xl transition duration-300">
                  <div className="p-2 rounded-full bg-[#7ea566] text-white mr-4">
                    <FaRegHeart size={20} />
                  </div>
                  <span className="text-[#2b5d4a] font-medium">Liked Posts</span>
                  <div className="ml-auto text-[#7ea566]">
                    <FaArrowLeft size={16} className="rotate-180" />
                  </div>
                </div>
              </Link>
              
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}