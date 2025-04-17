import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/grid';
import { Navigation, Pagination, Autoplay, Grid } from 'swiper/modules';
import { FaStar } from 'react-icons/fa';

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
  {
    name: "Juliana Silva",
    department: "ComSci",
    content: "ระบบการสอนดีมาก ๆ มีการอัปเดตเนื้อหาตลอด",
    stars: 5,
    avatar: "/profile5.jpg",
  },
  {
    name: "Drew Feig",
    department: "ComSci",
    content: "กิจกรรมเยอะมาก สนุกด้วย ได้ประสบการณ์เพียบ",
    stars: 5,
    avatar: "/profile6.jpg",
  },
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
  {
    name: "Juliana Silva",
    department: "ComSci",
    content: "ระบบการสอนดีมาก ๆ มีการอัปเดตเนื้อหาตลอด",
    stars: 5,
    avatar: "/profile5.jpg",
  },
  {
    name: "Drew Feig",
    department: "ComSci",
    content: "กิจกรรมเยอะมาก สนุกด้วย ได้ประสบการณ์เพียบ",
    stars: 5,
    avatar: "/profile6.jpg",
  },
];

const TestimonialSection = () => {
  return (
    <div className="bg-[#2e2e2e] pt-16 pb-4 text-center text-white">
    <h2 className="text-4xl sm:text-5xl font-bold mb-10">
      What They Say <span className="underline" style={{ textDecorationColor: "#007a47" }}>About Us</span>
    </h2>
  
    <div className="px-4 max-w-6xl mx-auto relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, Grid]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        spaceBetween={30}
        slidesPerView={1}
        slidesPerGroup={1}
        grid={{ rows: 2, fill: 'row' }}
        className="!pb-14"
        breakpoints={{
          768: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            grid: { rows: 2, fill: 'row' },
          },
          1024: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            grid: { rows: 2, fill: 'row' },
          },
        }}
      >
        {testimonials.map((review, idx) => (
        <SwiperSlide key={idx} className="h-full">
        <div className="bg-[#FFFDEB] text-black rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-4 w-full h-full flex flex-col justify-between relative min-h-full">
          
          <div className="flex justify-end mb-2">
            <div className="flex text-yellow-500 mt-2">
              {[...Array(review.stars)].map((_, i) => (
                <FaStar key={i} className="text-2xl" />
              ))}
            </div>
          </div>
      
          <div className="text-left text-4sm mb-4 mt-4 line-clamp-4">{review.content}</div>
      
          <div className="flex items-center gap-3 pt-4 border-t border-gray-300 mt-auto">
            <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full" />
            <div className="text-left">
              <div className="font-bold text-xl">{review.name}</div>
              <div className="text-xl text-gray-500">{review.department}</div>
            </div>
          </div>
        </div>
      </SwiperSlide>
      
       
        ))}
      </Swiper>
    </div>
  </div>  
  );
};

export default TestimonialSection;