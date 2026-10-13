import React from 'react';

interface DainikJahanLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

export const DainikJahanLogo: React.FC<DainikJahanLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = false,
}) => {
  const pixelSizes = {
    xs: 32,
    sm: 44,
    md: 64,
    lg: 96,
    xl: 140,
  };

  const dim = pixelSizes[size];

  return (
    <div 
      className={`inline-flex flex-col items-center justify-center select-none ${className}`}
      style={{ width: `${dim}px`, height: `${dim}px` }}
      aria-label="দৈনিক জাহান অনলাইন লোগো - Dainik Jahan Online"
    >
      {/* Precision SVG Recreation of the user's Dainik Jahan Emblem */}
      <svg 
        viewBox="0 0 500 500" 
        className="w-full h-full overflow-visible drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
      >
        <defs>
          {/* Deep Crimson Red Crescent Gradient */}
          <radialGradient id="djRedCrescent" cx="70%" cy="50%" r="75%">
            <stop offset="0%" stopColor="#C41E26" />
            <stop offset="50%" stopColor="#9E1920" />
            <stop offset="100%" stopColor="#6E0F14" />
          </radialGradient>

          {/* Pure Deep Charcoal/Black Center */}
          <radialGradient id="djBlackDisc" cx="45%" cy="45%" r="65%">
            <stop offset="0%" stopColor="#1E1E1E" />
            <stop offset="70%" stopColor="#0D0D0D" />
            <stop offset="100%" stopColor="#050505" />
          </radialGradient>

          {/* Crisp White Text Filter for broadcast visibility */}
          <filter id="djTextShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* 1. Outer Crimson Red Crescent / Eclipse Ring */}
        <circle cx="265" cy="250" r="235" fill="url(#djRedCrescent)" />

        {/* 2. Main Inner Deep Black Circle */}
        <circle cx="230" cy="250" r="225" fill="url(#djBlackDisc)" stroke="#FFFFFF" strokeWidth="2.5" strokeOpacity="0.15" />

        {/* 3. Text Group: অনলাইন দৈনিক জাহান */}
        <g fill="#FFFFFF" filter="url(#djTextShadow)">
          
          {/* Top word: অনলাইন */}
          <text
            x="225"
            y="145"
            textAnchor="middle"
            fontFamily="'Plus Jakarta Sans', 'SolaimanLipi', 'Noto Sans Bengali', sans-serif"
            fontWeight="600"
            fontSize="44"
            letterSpacing="2"
            fill="#FFFFFF"
          >
            অনলাইন
          </text>

          {/* Middle word: দৈনিক */}
          <text
            x="225"
            y="255"
            textAnchor="middle"
            fontFamily="'Cinzel', 'Noto Serif Bengali', 'SolaimanLipi', serif"
            fontWeight="900"
            fontSize="108"
            letterSpacing="-1"
            fill="#FFFFFF"
          >
            দৈনিক
          </text>

          {/* Horizontal Divider Line */}
          <line
            x1="85"
            y1="275"
            x2="365"
            y2="275"
            stroke="#FFFFFF"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Bottom word: জাহান */}
          <text
            x="225"
            y="390"
            textAnchor="middle"
            fontFamily="'Cinzel', 'Noto Serif Bengali', 'SolaimanLipi', serif"
            fontWeight="900"
            fontSize="112"
            letterSpacing="-1"
            fill="#FFFFFF"
          >
            জাহান
          </text>
        </g>
      </svg>

      {showSubtitle && (
        <span className="text-[10px] font-bold text-slate-300 tracking-wider font-serif mt-1 whitespace-nowrap">
          দৈনিক জাহান
        </span>
      )}
    </div>
  );
};
