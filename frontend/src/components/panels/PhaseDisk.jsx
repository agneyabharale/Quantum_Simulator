import React from 'react';

const PhaseDisk = ({ phase, size = 40, color = "#3f51b5" }) => {
  // phase is in radians
  const x = Math.cos(phase) * (size / 2 - 4);
  const y = -Math.sin(phase) * (size / 2 - 4); // Negative because SVG y-axis is inverted

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background Disk */}
        <circle 
          cx={size/2} 
          cy={size/2} 
          r={size/2 - 2} 
          fill="rgba(255, 255, 255, 0.03)" 
          stroke="rgba(255, 255, 255, 0.1)" 
          strokeWidth="1.5" 
        />
        
        {/* Phase Indicator Line */}
        <line 
          x1={size/2} 
          y1={size/2} 
          x2={size/2 + x} 
          y2={size/2 + y} 
          stroke={color} 
          strokeWidth="2" 
          strokeLinecap="round"
        />
        
        {/* Phase Point */}
        <circle 
          cx={size/2 + x} 
          cy={size/2 + y} 
          r="2.5" 
          fill={color} 
        />

        {/* Center Point */}
        <circle 
          cx={size/2} 
          cy={size/2} 
          r="1.5" 
          fill="#9ca3af" 
        />
      </svg>
    </div>
  );
};

export default PhaseDisk;
