import { useState, useEffect } from 'react';

const LeftPattern = () => {
  const [isClient, setIsClient] = useState(false);
  const [circleStyles, setCircleStyles] = useState([]);
  const [leafStyles, setLeafStyles] = useState([]);
  
  useEffect(() => {
    // Only run on client-side after hydration
    setIsClient(true);
    
    // Generate random styles for circles
    const newCircleStyles = Array(8).fill(0).map(() => ({
      width: `${Math.random() * 180 + 60}px`,
      height: `${Math.random() * 180 + 60}px`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      transform: 'translate(-50%, -50%)'
    }));
    
    // Generate random styles for leaves
    const newLeafStyles = Array(8).fill(0).map(() => ({
      width: `${Math.random() * 70 + 30}px`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      transform: `rotate(${Math.random() * 360}deg)`
    }));
    
    setCircleStyles(newCircleStyles);
    setLeafStyles(newLeafStyles);
  }, []);
  
  return (
    <div className="h-full w-full relative overflow-hidden bg-[#f8f4eb]">
      <div className="absolute inset-0 opacity-15">
        {isClient && circleStyles.map((style, i) => (
          <div 
            key={`circle-${i}`} 
            className="absolute rounded-full border-[3px] border-[#2b5d4a]"
            style={style}
          />
        ))}
      </div>
      <div className="absolute inset-0">
        {isClient && leafStyles.map((style, i) => (
          <svg 
            key={`leaf-${i}`} 
            className="absolute opacity-15"
            style={style}
            viewBox="0 0 100 100" 
            fill="#7ea566"
          >
            <path d="M50,0 C70,30 90,60 50,100 C10,60 30,30 50,0 Z" />
          </svg>
        ))}
      </div>
      <div className="absolute inset-0">
        <svg width="100%" height="100%" className="opacity-8">
          <pattern id="honeycomb" width="30" height="52" patternUnits="userSpaceOnUse">
            <path d="M15,0 L30,8.66 L30,26 L15,34.64 L0,26 L0,8.66 Z"
              fill="none" stroke="#eab54e" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#honeycomb)" />
        </svg>
      </div>
      <div className="absolute top-40 left-10">
        <svg width="120" height="120" viewBox="0 0 120 120" className="opacity-20">
          <path d="M60,10 L110,60 L60,110 L10,60 Z M60,30 L90,60 L60,90 L30,60 Z"
            stroke="#2b5d4a" fill="none" strokeWidth="2" />
          <circle cx="60" cy="60" r="15" stroke="#2b5d4a" fill="none" strokeWidth="2" />
        </svg>
      </div>
      <div className="absolute bottom-20 left-0 w-full">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="opacity-15">
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="#2b5d4a" />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            fill="#7ea566" />
        </svg>
      </div>
      <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-r from-[#7ea566] via-[#eab54e] to-[#7ea566] opacity-25"></div>
      <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-r from-[#7ea566] via-[#eab54e] to-[#7ea566] opacity-25"></div>
    </div>
  );
};

export default LeftPattern;