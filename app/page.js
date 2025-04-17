"use client"

import Header  from "@/Components/homepage/Header"
import Footer  from "@/Components/homepage/Footer"
import TestimonialSection from "@/Components/TestimonialSection";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


export default function Home() {
  return (
    <>
    <Header/>
    <TestimonialSection/>
    <Footer/>
    </>
  );
}
