"use client";

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaStar, FaRegEye } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { FaGlobe, FaPuzzlePiece, FaLinkedin } from "react-icons/fa";

export default function UserPage() {
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
                <Link href="/edit-user">
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
              
              {/* User Type Badge - New addition */}
              <div className="mt-3 sm:mt-4 inline-block">
                <span className="px-3 py-1 bg-white/20 text-white text-xs sm:text-sm rounded-full backdrop-blur-sm">
                  Viewer Account
                </span>
              </div>
            </div>
            
            {/* Stats Cards - Better responsive sizing and layout */}
            <div className="flex gap-3 sm:gap-4 justify-center sm:justify-end sm:ml-auto mt-3 sm:mt-0">
              {/* Stat: Viewed */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 lg:w-24 lg:h-24 bg-white/15 backdrop-blur-sm rounded-lg sm:rounded-xl flex flex-col justify-center items-center text-white">
                <p className="text-lg sm:text-xl md:text-2xl font-bold">0</p>
                <p className="text-xs md:text-sm text-white/90">Viewed</p>
              </div>

              {/* Stat: Saved */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 lg:w-24 lg:h-24 bg-white/15 backdrop-blur-sm rounded-lg sm:rounded-xl flex flex-col justify-center items-center text-white">
                <p className="text-lg sm:text-xl md:text-2xl font-bold">0</p>
                <p className="text-xs md:text-sm text-white/90">Saved</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content with Two Columns Layout - Improved responsive padding */}
      <div className="bg-white w-full py-6 sm:py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Left Column - Featured Reviews with improved grid spacing */}
            <div className="w-full lg:w-2/3">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-[#3a6959]">Featured Reviews</h2>
                <Link href="/all_review" className="text-sm sm:text-base text-[#8fb277] hover:text-[#3a6959] transition duration-300">
                  View All
                </Link>
              </div>
              
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 sm:gap-6">
                {/* Review cards with better sizing */}
                {[1, 2].map((item) => (
                  <div key={item} className="bg-[#f4f2ec] rounded-xl p-3 sm:p-4 hover:shadow-md transition duration-300 border border-[#e5e1d8]">
                    <div className="bg-[#e5e1d8] h-32 xs:h-36 sm:h-40 md:h-48 rounded-lg mb-2 sm:mb-3"></div>
                    <p className="font-bold text-[#3a6959] text-sm sm:text-base">Title{item}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs sm:text-sm text-gray-500">By: Author</span>
                      <div className="flex items-center gap-1 text-[#8fb277]">
                        <FaRegEye size={14} />
                        <span className="text-xs">0</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right Column - Quick Links with improved responsive sizing */}
            <div className="w-full lg:w-1/3 mt-6 lg:mt-0">
              <h2 className="text-lg sm:text-xl font-bold text-[#3a6959] mb-4 sm:mb-6">Quick Links</h2>
              <div className="space-y-3 sm:space-y-4">
                <Link href="/blog">
                  <div className="flex items-center p-3 sm:p-4 bg-[#f4f2ec] hover:bg-[#e5e1d8] rounded-xl transition duration-300 shadow-sm border border-[#e5e1d8]">
                    <div className="p-2 sm:p-3 rounded-full bg-[#8fb277] text-white mr-3 sm:mr-4">
                      <FaRegEye size={16} className="sm:hidden" />
                      <FaRegEye size={20} className="hidden sm:block" />
                    </div>
                    <span className="text-[#3a6959] font-medium text-sm sm:text-base">Recently Viewed</span>
                    <div className="ml-auto text-[#8fb277]">
                      <FaArrowLeft size={14} className="sm:hidden rotate-180" />
                      <FaArrowLeft size={16} className="hidden sm:block rotate-180" />
                    </div>
                  </div>
                </Link>
                
                <Link href="/blog">
        <div className="flex items-center p-3 sm:p-4 bg-[#f4f2ec] hover:bg-[#e5e1d8] rounded-xl transition duration-300 shadow-sm border border-[#e5e1d8]">
            <div className="p-2 sm:p-3 rounded-full bg-[#8fb277] text-white mr-3 sm:mr-4">
        <FaStar size={16} className="sm:hidden" />
      <FaStar size={20} className="hidden sm:block" />
    </div>
    <span className="text-[#3a6959] font-medium text-sm sm:text-base">Star Filter</span>
    <div className="ml-auto text-[#8fb277]">
      <FaArrowLeft size={14} className="sm:hidden rotate-180" />
      <FaArrowLeft size={16} className="hidden sm:block rotate-180" />
    </div>
  </div>
</Link>
                
                <Link href="/blog">
                  <div className="flex items-center p-3 sm:p-4 bg-[#f4f2ec] hover:bg-[#e5e1d8] rounded-xl transition duration-300 shadow-sm border border-[#e5e1d8]">
                    <div className="p-2 sm:p-3 rounded-full bg-[#8fb277] text-white mr-3 sm:mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                      </svg>
                    </div>
                    <span className="text-[#3a6959] font-medium text-sm sm:text-base">Explore Reviews</span>
                    <div className="ml-auto text-[#8fb277]">
                      <FaArrowLeft size={14} className="sm:hidden rotate-180" />
                      <FaArrowLeft size={16} className="hidden sm:block rotate-180" />
                    </div>
                  </div>
                </Link>
              </div>
              
              {/* Popular Categories - New addition */}
              <div className="mt-6 sm:mt-8">
                <h2 className="text-lg sm:text-xl font-bold text-[#3a6959] mb-4">All Categories</h2>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {["Study", "Environment", "Experience", "Other"].map((category) => (
                    <Link key={category} href={`/category/${category.toLowerCase()}`}>
                      <span className="inline-block px-3 py-1.5 bg-[#f4f2ec] hover:bg-[#e5e1d8] text-[#3a6959] text-xs sm:text-sm rounded-lg transition duration-300 border border-[#e5e1d8]">
                        {category}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}