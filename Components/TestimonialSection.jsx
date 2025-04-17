"use client";

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const testimonials = [
  {
    name: "jiara00",
    department: "ComSci",
    content: "บรรยากาศโดยรวมของคณะวิทยาศาสตร์และเทคโนโลยีที่มหาวิทยาลัยหอการค้าไทย มีความเป็นกันเองและอบอุ่นมาก อาจารย์และเจ้าหน้าที่ดูแล...",
    stars: 5,
    avatar: "/profile1.jpg",
  },
  {
    name: "Juliana Silva",
    department: "ComSci",
    content: "การเรียนที่นี่ไม่ได้มีแค่การนั่งฟังบรรยายแบบเดิมๆ แต่จะมีการทำ Workshop, Project-based Learning และ Case Study ที่ช่วยให้เรานำความรู้ไปประยุกต์ใช้จริง...",
    stars: 5,
    avatar: "/profile2.jpg",
  },
  {
    name: "Drew Feig",
    department: "ComSci",
    content: "นักศึกษาส่วนใหญ่มีความเป็นกันเองและช่วยเหลือกันดี มีชมรมและโครงการที่ช่วยส่งเสริมทักษะทั้งในด้านวิชาการและ Soft Skills อื่นๆอีกมากมาย ซึ่ง...",
    stars: 5,
    avatar: "/profile3.jpg",
  },
  {
    name: "jiara00",
    department: "ComSci",
    content: "เป็นคณะที่อบอุ่นที่สุดที่เคยเจอมาเลย",
    stars: 5,
    avatar: "/profile4.jpg",
  },
];

const TestimonialCard = ({ review, isActive }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: isActive ? 1.05 : 0.95 }}
      transition={{ duration: 0.5 }}
      className={`bg-[#fff8ef] text-black rounded-xl shadow-xl p-10 w-full flex flex-col justify-between relative 
        transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl 
        ${isActive ? 'border-4 border-[#007a47] z-10' : ''}
        min-h-[300px]`} // เพิ่ม min-height เพื่อให้ Card มีความสูงเท่ากัน
    >
      <div className="flex justify-end mb-2">
        <div className="flex text-yellow-500 mt-2">
          {[...Array(review.stars)].map((_, i) => (
            <FaStar key={i} className="text-xl" />
          ))}
        </div>
      </div>

      <div className="text-left text-sm mb-4 mt-4 line-clamp-4">{review.content}</div>

      <div className="flex items-center gap-3 pt-4 border-t border-gray-300 mt-auto">
        <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover" />
        <div className="text-left">
          <div className="font-bold text-lg">{review.name}</div>
          <div className="text-gray-600">{review.department}</div>
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000); // Simulate loading
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="bg-[#2e2e2e] pt-16 pb-10 text-center text-white">
      <h2 className="text-5xl sm:text-6xl font-bold mb-10">
        What They Say <span className="underline" style={{ textDecorationColor: "#007a47" }}>About Us</span>
      </h2>

      <div className="px-4 max-w-6xl mx-auto relative">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{
            clickable: true,
            bulletActiveClass: 'bg-[#007a47] opacity-100',
            bulletClass: 'inline-block w-2 h-2 rounded-full bg-green-700 mx-1 cursor-pointer transition-all duration-300 hover:scale-125',
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          spaceBetween={20}
          slidesPerView={1}
          centeredSlides={true}
          loop={true}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          breakpoints={{
            640: {
              slidesPerView: 1.5,
              centeredSlides: true,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 2.5,
              centeredSlides: true,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 3,
              centeredSlides: true,
              spaceBetween: 40,
            },
          }}
          className="testimonial-swiper !pb-16"
        >
          {testimonials.map((review, idx) => (
            <SwiperSlide key={idx} className="h-auto py-20 flex items-stretch">
              <TestimonialCard review={review} isActive={activeIndex === idx % testimonials.length} />
            </SwiperSlide>
          ))}
          
        </Swiper>
      </div>

      <style jsx global>{`
        .testimonial-swiper .swiper-pagination {
          position: relative;
          bottom: -10px;
          margin-top: 30px;
        }

        .swiper-slide-active {
          z-index: 10;
        }

        .swiper-button-prev, .swiper-button-next {
          transform: translateY(-50%);
        }
      `}</style>
    </div>
  );
};

export default TestimonialSection;