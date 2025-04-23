import dynamic from 'next/dynamic';

// แก้ไข path ให้ถูกต้อง - เช่น ถ้าอยู่ในโฟลเดอร์เดียวกัน
const LeftPattern = dynamic(() => import('./LeftPattern'), { 
  ssr: false 
});

// หรือถ้าอยู่ในตำแหน่งอื่น ให้ใส่ path ที่ถูกต้อง
// const LeftPattern = dynamic(() => import('../LeftPattern'), { ssr: false });

const LeftPatternWrapper = () => {
  return <LeftPattern />;
};

export default LeftPatternWrapper;