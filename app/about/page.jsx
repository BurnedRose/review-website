"use client";

import React from 'react';
import Head from 'next/head';
import Header from '../all_review/header';
import { FaEnvelope, FaRocket, FaUsers, FaInfoCircle, FaComment, FaCheck } from 'react-icons/fa';

// ข้อมูลทีมงาน
const teamMembers = [
  {
    name: 'Kamik Piboonchaisit',
    role: 'นักพัฒนา backend',
    img: 'https://i.pravatar.cc/150?img=1',
    id: '2210511101016',
  },
  {
    name: 'Satchakorn Chansri',
    role: 'นักพัฒนา frontend',
    img: 'https://i.pravatar.cc/150?img=2',
    id: '2210511101037',
  },
  {
    name: 'Khemapat Yungprayoor',
    role: 'นักพัฒนา frontend',
    img: 'https://i.pravatar.cc/150?img=3',
    id: '2210511101060',
  },
];

const visionMission = [
  {
    icon: <FaRocket className="text-[#2b5d4a] text-2xl mb-3" />,
    title: "วิสัยทัศน์",
    description: "มุ่งสร้างแพลตฟอร์มรีวิวที่โปร่งใส เข้าถึงง่าย และเป็นแหล่งข้อมูลที่ผู้ใช้สามารถเชื่อถือได้จริง เพื่อเป็นประโยชน์แก่นักศึกษาและผู้ที่สนใจ"
  },
  {
    icon: <FaUsers className="text-[#2b5d4a] text-2xl mb-3" />,
    title: "พันธกิจ",
    description: "พัฒนาระบบที่ใช้งานง่าย ส่งเสริมการแสดงความคิดเห็นอย่างสร้างสรรค์ และรวบรวมข้อมูลรีวิวที่มีคุณภาพจากนักศึกษาที่กำลังศึกษาอยู่จริง"
  }
];

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>เกี่ยวกับเรา | UTCC Review</title>
        <meta name="description" content="แพลตฟอร์มรีวิวมหาวิทยาลัยที่สร้างสรรค์โดยนักศึกษาเพื่อนักศึกษา" />
      </Head>

      <Header />

      {/* Hero */}
      <section className="bg-[#f8f5f0] py-16 text-center font-[Prompt]">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-[#2b5d4a]">
            UTCCReview <span className="text-[#7ea566]">แพลตฟอร์มรีวิวมหาวิทยาลัย</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-[#4a4a4a] mb-8">
            เราสร้างพื้นที่ให้นักศึกษาได้แบ่งปันประสบการณ์และข้อมูลเชิงลึกเกี่ยวกับมหาวิทยาลัย
            เพื่อช่วยให้ผู้คนได้รับข้อมูลที่เป็นประโยชน์ก่อนการตัดสินใจ
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <a href="#about-us" className="px-6 py-2 bg-[#2b5d4a] text-white font-medium rounded-md hover:bg-[#7ea566] transition">เกี่ยวกับเรา</a>
            <a href="/blog" className="px-6 py-2 bg-white border border-[#7ea566] text-[#2b5d4a] font-medium rounded-md hover:bg-[#f0e6d9] transition">อ่านรีวิว</a>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="about-us" className="py-16 bg-white px-4 font-[Prompt]">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#2b5d4a]">เรื่องราวของเรา</h2>
            <div className="w-16 h-1 bg-[#7ea566] mx-auto mt-3"></div>
          </div>
          <div className="max-w-3xl mx-auto bg-[#f0e6d9] p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <FaInfoCircle className="text-[#2b5d4a] text-xl" />
              <h3 className="text-xl font-semibold text-[#2b5d4a]">แพลตฟอร์มรีวิวมหาวิทยาลัยที่สร้างสรรค์โดยนักศึกษาเพื่อนักศึกษา</h3>
            </div>
            <div className="space-y-4 text-[#4a4a4a]">
              <p>เว็บไซต์นี้จัดทำขึ้นภายใต้โครงงานวิชาพัฒนาเว็บ โดยมีเป้าหมายเพื่อสร้างแพลตฟอร์มสำหรับรีวิวประสบการณ์และข้อมูลเชิงลึกเกี่ยวกับมหาวิทยาลัย</p>
              <p>ด้วยการออกแบบที่ทันสมัย ใช้งานง่าย และคำนึงถึงประสบการณ์ของผู้ใช้ ทีมผู้พัฒนาต้องการยกระดับคุณภาพของการแลกเปลี่ยนความคิดเห็นในโลกดิจิทัล</p>
              <p>เราเชื่อว่าการแชร์ประสบการณ์อย่างเปิดกว้างในสภาพแวดล้อมที่ปลอดภัยและเป็นกลาง จะช่วยเสริมสร้างความเข้าใจและสร้างชุมชนออนไลน์ที่แข็งแรงและมีคุณภาพ</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 px-4 bg-[#f8f5f0] font-[Prompt]">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#2b5d4a]">วิสัยทัศน์และพันธกิจ</h2>
            <div className="w-16 h-1 bg-[#7ea566] mx-auto mt-3"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {visionMission.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-[#e5e1d8]">
                <div className="flex justify-center">{item.icon}</div>
                <h3 className="text-xl font-semibold text-center text-[#2b5d4a] mb-3">{item.title}</h3>
                <p className="text-[#4a4a4a] text-center">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 bg-white p-6 rounded-lg shadow-sm max-w-4xl mx-auto border border-[#e5e1d8]">
            <h3 className="text-lg font-semibold text-[#2b5d4a] mb-4">เป้าหมายของเรา</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "พัฒนาเว็บไซต์ที่ใช้งานง่ายและมีประสิทธิภาพ",
                "ส่งเสริมการแสดงความคิดเห็นอย่างสร้างสรรค์",
                "รวบรวมข้อมูลรีวิวจากนักศึกษาที่กำลังศึกษาอยู่จริง",
                "เรียนรู้และต่อยอดทักษะจากการทำงานร่วมกันในทีม"
              ].map((goal, index) => (
                <div key={index} className="flex items-start gap-2">
                  <FaCheck className="text-[#7ea566] text-sm mt-1 flex-shrink-0" />
                  <p className="text-[#4a4a4a]">{goal}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="our-team" className="py-20 px-4 bg-white font-[Prompt]">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="bg-[#7ea566] text-white px-4 py-1 rounded-full text-sm font-medium">OUR TEAM</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 text-[#2b5d4a]">ทีมงานของเรา</h2>
            <div className="w-20 h-1 bg-[#7ea566] mx-auto mt-4"></div>
            <p className="text-[#4a4a4a] mt-6 max-w-2xl mx-auto">พบกับทีมผู้สร้างสรรค์ที่อยู่เบื้องหลังแพลตฟอร์ม Review ของเรา</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden border border-[#f0e6d9]">
                <div className="h-1 bg-gradient-to-r from-[#7ea566] to-[#2b5d4a]"></div>
                <div className="p-8">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#7ea566] to-[#2b5d4a]"></div>
                    <img src={member.img} alt={member.name} className="absolute inset-1 w-[calc(100%-8px)] h-[calc(100%-8px)] rounded-full object-cover border-4 border-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#2b5d4a]">{member.name}</h3>
                  <p className="text-[#7ea566] font-medium mb-3">{member.role}</p>
                  <p className="text-[#a8a195] text-sm mb-4">รหัสนักศึกษา: {member.id}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 px-4 bg-[#2b5d4a] text-white font-[Prompt]">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">ติดต่อเรา</h2>
            <div className="w-16 h-1 bg-[#7ea566] mx-auto mt-3"></div>
          </div>
          <div className="bg-[#2b5d4a] bg-opacity-80 rounded-lg p-6 border border-[#7ea566]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <FaEnvelope className="text-[#f8f5f0]" />
                  <span>ส่งข้อความถึงเรา</span>
                </h3>
                <p className="text-[#f8f5f0] mb-4">
                  สนใจร่วมงานกับเรา หรือมีข้อเสนอแนะใดๆ สามารถส่งข้อความถึงเราได้
                </p>
                <a href="mailto:contact@unireview.com" className="inline-flex items-center gap-2 bg-[#f0e6d9] text-[#2b5d4a] font-medium px-4 py-2 rounded-md hover:bg-white transition">
                  <FaEnvelope />
                  ติดต่อทางอีเมล
                </a>
              </div>
              <div className="md:border-l md:border-[#7ea566] md:pl-6">
                <h3 className="text-lg font-semibold mb-3">ติดตามเรา</h3>
                <div className="grid grid-cols-2 gap-3">
                  {["facebook", "instagram"].map((platform, idx) => (
                    <a key={idx} href="#" className="flex justify-center items-center bg-[#7ea566] bg-opacity-30 hover:bg-opacity-40 px-3 py-2 rounded-md transition">
                      <span className="capitalize">{platform}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#4a4a4a] text-[#f8f5f0] py-4 text-center text-sm font-[Prompt]">
        <div className="container mx-auto">
          <p>© {new Date().getFullYear()} UTCC ComSci Review. โครงงานวิชาพัฒนาเว็บ.</p>
        </div>
      </footer>
    </>
  );
};

export default AboutPage;