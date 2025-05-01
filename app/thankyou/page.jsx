"use client";
import React, { useEffect, useState } from "react";
import { FaCheck, FaHeart, FaArrowLeft } from "react-icons/fa";

const ThankYouPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [iconIndex, setIconIndex] = useState(0);
  
  useEffect(() => {
    // Animation
    setTimeout(() => setIsVisible(true), 100);
    
    const animationInterval = setInterval(() => {
      setIconIndex(prev => (prev + 1) % 2); // ลดเหลือแค่ 2 icons
    }, 1500);

    return () => clearInterval(animationInterval);
  }, []);

  const handleBack = () => window.history.back();

  // Icons
  const icons = [
    <FaCheck key="check" size={36} color="#10B981" />,
    <FaHeart key="heart" size={36} color="#EC4899" />
  ];

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-amber-50 to-white px-6 py-8">
      <div 
        className={`transform transition-all duration-1000 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center max-w-md mx-auto">
          {/* Icon */}
          <div className="w-20 h-20 mb-6 rounded-full bg-green-100 flex items-center justify-center shadow-md">
            <div className="transition-all duration-500 ease-out">
              {icons[iconIndex]}
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-medium text-gray-800 mb-4">ขอบคุณค่ะ</h1>
          
          {/* Text */}
          <p className="text-lg text-gray-600 text-center mb-6">
            เราได้รับข้อความของคุณแล้ว<br />
            สามารถคลิกปุ่ม <strong className="text-green-600">back</strong> ด้านล่าง<br />
            เพื่อย้อนกลับหน้าเดิม
          </p>

          {/* Image */}
          <img
            src="thx.png"
            alt="Thank you character"
            className="w-40 h-auto object-contain mx-auto mb-6"
          />

          {/* Button */}
          <button
            onClick={handleBack}
            className="px-6 py-2 rounded-full border-2 border-green-500 bg-white text-green-600 hover:bg-green-50 transition-all flex items-center space-x-2 shadow-md"
          >
            <FaArrowLeft size={16} />
            <span className="font-medium">Back</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;