const CenterPattern = () => (
    <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
      <div className="absolute inset-0">
        <svg width="100%" height="100%" className="opacity-5">
          <pattern id="centerDotGrid" width="25" height="25" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#2b5d4a" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#centerDotGrid)" />
        </svg>
      </div>
      <div className="absolute inset-0">
        <svg width="100%" height="100%" className="opacity-3">
          <pattern id="centerDiagonal" width="15" height="15" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="15" stroke="#7ea566" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#centerDiagonal)" />
        </svg>
      </div>
      <div className="absolute top-0 left-0 w-full opacity-5">
        <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="w-full">
          <path d="M0,0V24C100,55 400,80 600,70C800,60 1000,30 1200,40V0Z" fill="#eab54e" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-full opacity-5">
        <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="w-full">
          <path d="M0,80V56C200,25 400,0 600,10C800,20 1000,50 1200,40V80Z" fill="#7ea566" />
        </svg>
      </div>
      {Array(6).fill(0).map((_, i) => (
        <svg key={`center-leaf-${i}`} className="absolute opacity-8"
          style={{
            width: `${Math.random() * 40 + 20}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 360}deg)`
          }}
          viewBox="0 0 100 100" fill="#7ea566"
        >
          <path d="M50,0 C70,30 90,60 50,100 C10,60 30,30 50,0 Z" />
        </svg>
      ))}
      <div className="absolute top-10 left-10">
        <svg width="100" height="100" viewBox="0 0 100 100" className="opacity-10">
          <circle cx="0" cy="0" r="50" fill="#eab54e" />
        </svg>
      </div>
      <div className="absolute bottom-10 right-10">
        <svg width="100" height="100" viewBox="0 0 100 100" className="opacity-10">
          <circle cx="100" cy="100" r="50" fill="#2b5d4a" />
        </svg>
      </div>
    </div>
  );
  
  export default CenterPattern;
  