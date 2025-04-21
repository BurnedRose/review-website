"use client";

import Link from "next/link";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { FaCirclePlus, FaRegUser, FaRegHeart } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { FaGlobe, FaPuzzlePiece, FaLinkedin } from "react-icons/fa";

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-[rgba(248,244,235,0.5)]">
      {/* Profile Header - Full Width with softer gradient */}
      <div className="bg-gradient-to-br from-[#8fb277] to-[#3a6959] w-full py-6 sm:py-8 px-4 sm:px-6 relative">
        {/* Logout Button - Fixed position with consistent styling */}
        <div className="absolute top-4 sm:top-6 right-4 sm:right-6 md:right-8 z-10">
          <Link 
            href="/" 
            className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition duration-300 block text-center text-sm sm:text-base">
            Logout
          </Link>
        </div>
        
        {/* Main header content with improved responsive layout */}
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            {/* Profile Image - Better sizing for small screens */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 bg-white rounded-full flex justify-center items-center shadow-md border-4 border-white overflow-hidden flex-shrink-0 mx-auto sm:mx-0">
              <CgProfile className="text-[#3a6959] text-5xl sm:text-6xl md:text-7xl" />
            </div>
            
            {/* Profile Info - Better text sizing and spacing */}
            <div className="flex-grow text-center sm:text-left sm:ml-4 md:ml-6 lg:ml-8 mt-3 sm:mt-0">
              <div className="flex items-center justify-center sm:justify-start">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Name</h1>
                <Link href="/edit">
                  <button aria-label="Edit profile" className="ml-2 sm:ml-3 p-1.5 sm:p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition duration-300">
                    <FaEdit size={16} className="sm:hidden" />
                    <FaEdit size={18} className="hidden sm:block" />
                  </button>
                </Link>
              </div>
              <p className="text-white/90 mt-1 sm:mt-2 text-sm sm:text-base">@ : username</p>
              <p className="text-white/90 mt-1 sm:mt-2 text-sm sm:text-base">Bio : ComSci</p>
              
              {/* Social Links - Better spacing on small screens */}
              <div className="flex space-x-2 sm:space-x-3 mt-2 sm:mt-3 justify-center sm:justify-start">
                <Link href="#" className="p-1.5 sm:p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition duration-300">
                  <FaGlobe size={16} className="sm:hidden" />
                  <FaGlobe size={18} className="hidden sm:block" />
                </Link>
                <Link href="#" className="p-1.5 sm:p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition duration-300">
                  <FaPuzzlePiece size={16} className="sm:hidden" />
                  <FaPuzzlePiece size={18} className="hidden sm:block" />
                </Link>
                <Link href="#" className="p-1.5 sm:p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition duration-300">
                  <FaLinkedin size={16} className="sm:hidden" />
                  <FaLinkedin size={18} className="hidden sm:block" />
                </Link>
              </div>
            </div>
            
            {/* Stats Cards - Better responsive sizing and layout */}
            <div className="flex gap-3 sm:gap-4 justify-center sm:justify-end sm:ml-auto mt-3 sm:mt-0">
              {/* Stat: Post */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 lg:w-24 lg:h-24 bg-white/15 backdrop-blur-sm rounded-lg sm:rounded-xl flex flex-col justify-center items-center text-white">
                <p className="text-lg sm:text-xl md:text-2xl font-bold">0</p>
                <p className="text-xs md:text-sm text-white/90">Post</p>
              </div>

              {/* Stat: Like */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 lg:w-24 lg:h-24 bg-white/15 backdrop-blur-sm rounded-lg sm:rounded-xl flex flex-col justify-center items-center text-white">
                <p className="text-lg sm:text-xl md:text-2xl font-bold">0</p>
                <p className="text-xs md:text-sm text-white/90">Like</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content with Two Columns Layout - Improved responsive padding */}
      <div className="bg-white w-full py-6 sm:py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Left Column - Latest Review with improved grid spacing */}
            <div className="w-full lg:w-2/3">
              <h2 className="text-lg sm:text-xl font-bold text-[#3a6959] mb-4 sm:mb-6">Latest Review</h2>
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 sm:gap-6">
                {/* Review cards with better sizing */}
                {[1, 2].map((item) => (
                  <div key={item} className="bg-[#f4f2ec] rounded-xl p-3 sm:p-4 hover:shadow-md transition duration-300 border border-[#e5e1d8]">
                    <div className="bg-[#e5e1d8] h-32 xs:h-36 sm:h-40 md:h-48 rounded-lg mb-2 sm:mb-3"></div>
                    <p className="font-bold text-[#3a6959] text-sm sm:text-base">Title{item}</p>
                  </div>
                ))}
              </div>
              
              {/* Add Project Button with improved responsive padding */}
              <div className="mt-6 sm:mt-8">
                <Link href="/add-review" className="block">
                  <button className="group w-full flex items-center justify-center gap-2 sm:gap-3 py-3 sm:py-4 px-4 sm:px-6 bg-gradient-to-r from-[#8fb277] to-[#3a6959] text-white rounded-xl text-base sm:text-lg font-semibold shadow-sm hover:shadow-md transform transition duration-300 hover:-translate-y-0.5">
                    <FaCirclePlus size={20} className="sm:hidden text-white" />
                    <FaCirclePlus size={24} className="hidden sm:block text-white" />
                    <span>Add New Review</span>
                  </button>
                </Link>
              </div>
            </div>
            
            {/* Right Column - Quick Links with improved responsive sizing */}
            <div className="w-full lg:w-1/3 mt-6 lg:mt-0">
              <h2 className="text-lg sm:text-xl font-bold text-[#3a6959] mb-4 sm:mb-6">Quick Links</h2>
              <div className="space-y-3 sm:space-y-4">
                <Link href="/my-work">
                  <div className="flex items-center p-3 sm:p-4 bg-[#f4f2ec] hover:bg-[#e5e1d8] rounded-xl transition duration-300 shadow-sm border border-[#e5e1d8]">
                    <div className="p-2 sm:p-3 rounded-full bg-[#8fb277] text-white mr-3 sm:mr-4">
                      <FaRegUser size={16} className="sm:hidden" />
                      <FaRegUser size={20} className="hidden sm:block" />
                    </div>
                    <span className="text-[#3a6959] font-medium text-sm sm:text-base">My Post</span>
                    <div className="ml-auto text-[#8fb277]">
                      <FaArrowLeft size={14} className="sm:hidden rotate-180" />
                      <FaArrowLeft size={16} className="hidden sm:block rotate-180" />
                    </div>
                  </div>
                </Link>
                
                <Link href="/saved-inspiration">
                  <div className="flex items-center p-3 sm:p-4 bg-[#f4f2ec] hover:bg-[#e5e1d8] rounded-xl transition duration-300 shadow-sm border border-[#e5e1d8]">
                    <div className="p-2 sm:p-3 rounded-full bg-[#8fb277] text-white mr-3 sm:mr-4">
                      <FaRegHeart size={16} className="sm:hidden" />
                      <FaRegHeart size={20} className="hidden sm:block" />
                    </div>
                    <span className="text-[#3a6959] font-medium text-sm sm:text-base">Saved Post</span>
                    <div className="ml-auto text-[#8fb277]">
                      <FaArrowLeft size={14} className="sm:hidden rotate-180" />
                      <FaArrowLeft size={16} className="hidden sm:block rotate-180" />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}