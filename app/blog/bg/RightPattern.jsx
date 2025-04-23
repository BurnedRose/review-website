const RightPattern = () => (
    <div className="h-full w-full relative overflow-hidden bg-[#f8f4eb]">
      <div className="absolute inset-0">
        <svg width="100%" height="100%" className="opacity-12">
          <pattern id="hexGrid" width="48" height="83" patternUnits="userSpaceOnUse" patternTransform="scale(1.2)">
            <path d="M24,0 L48,14 L48,42 L24,56 L0,42 L0,14 Z"
              fill="none" stroke="#2b5d4a" strokeWidth="0.8" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#hexGrid)" />
        </svg>
      </div>
      <div className="absolute inset-0">
        <svg width="100%" height="100%">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" fill="none" />
        </svg>
      </div>
      <div className="absolute inset-0">
        {Array(5).fill(0).map((_, i) => (
          <svg key={`thai-pattern-${i}`} className="absolute opacity-20" width="150" height="150"
            viewBox="0 0 150 150"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <path
              d="M75,10 L140,75 L75,140 L10,75 Z M75,30 L120,75 L75,120 L30,75 Z M75,50 L100,75 L75,100 L50,75 Z"
              stroke={i % 2 === 0 ? "#eab54e" : "#7ea566"} fill="none" strokeWidth="1.5" />
            <circle cx="75" cy="75" r="20" stroke="#2b5d4a" fill="none" strokeWidth="1.5" />
          </svg>
        ))}
      </div>
      <div className="absolute top-0 right-0">
        <svg width="200" height="200" viewBox="0 0 200 200" className="opacity-20">
          <path d="M200,0 L200,200 L0,200 C120,140 200,80 200,0 Z" fill="#2b5d4a" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0">
        <svg width="200" height="200" viewBox="0 0 200 200" className="opacity-20">
          <path d="M0,0 L200,0 L200,200 C100,120 50,60 0,0 Z" fill="#7ea566" />
        </svg>
      </div>
      <div className="absolute top-20 right-10">
        <svg width="120" height="200" viewBox="0 0 120 200" className="opacity-25">
          <path
            d="M60,0 C90,40 120,80 60,120 C0,80 30,40 60,0 Z
               M60,70 C75,90 90,110 60,130 C30,110 45,90 60,70 Z
               M60,140 C75,160 90,180 60,200 C30,180 45,160 60,140 Z"
            fill="none" stroke="#eab54e" strokeWidth="2" />
        </svg>
      </div>
      <div className="absolute bottom-10 left-0 w-full">
        <svg viewBox="0 0 1200 100" preserveAspectRatio="none" className="opacity-15">
          <path
            d="M0,0 C200,100 400,50 600,80 C800,110 1000,30 1200,70 L1200,100 L0,100 Z"
            fill="#7ea566"
          />
        </svg>
      </div>
      <div className="absolute top-5 left-5 right-5 h-2 opacity-25">
        <svg width="100%" height="100%" viewBox="0 0 100 2">
          <path d="M0,1 H100" stroke="#eab54e" strokeWidth="2" strokeDasharray="8 4" />
        </svg>
      </div>
      <div className="absolute bottom-5 left-5 right-5 h-2 opacity-25">
        <svg width="100%" height="100%" viewBox="0 0 100 2">
          <path d="M0,1 H100" stroke="#eab54e" strokeWidth="2" strokeDasharray="8 4" />
        </svg>
      </div>
    </div>
  );
  
  export default RightPattern;
  