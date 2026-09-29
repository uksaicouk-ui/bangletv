import React from 'react';

interface BengalTVWatermarkProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showText?: boolean;
}

export const BengalTVWatermark: React.FC<BengalTVWatermarkProps> = ({
  className = '',
  size = 'md',
  showText = true,
}) => {
  // Dimensions for different sizes
  const dimensions = {
    sm: { width: 44, height: showText ? 56 : 44, emblemSize: 44, fontSize: '9px' },
    md: { width: 72, height: showText ? 90 : 72, emblemSize: 72, fontSize: '13px' },
    lg: { width: 110, height: showText ? 138 : 110, emblemSize: 110, fontSize: '18px' },
    hero: { width: 160, height: showText ? 200 : 160, emblemSize: 160, fontSize: '24px' }
  }[size];

  return (
    <div 
      className={`inline-flex flex-col items-center justify-center select-none pointer-events-none filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)] ${className}`}
      style={{ width: `${dimensions.width}px` }}
      aria-label="বেঙ্গল টিভি - Bengal TV Official Insignia"
    >
      {/* Emblem SVG */}
      <svg 
        viewBox="0 0 200 200" 
        className="w-full h-auto overflow-visible"
        style={{ maxWidth: `${dimensions.emblemSize}px` }}
      >
        <defs>
          {/* Metallic Gold Gradients */}
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2A3" />
            <stop offset="30%" stopColor="#DFB241" />
            <stop offset="70%" stopColor="#9C6B14" />
            <stop offset="100%" stopColor="#F9DF7B" />
          </linearGradient>

          <linearGradient id="darkGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="50%" stopColor="#8A6010" />
            <stop offset="100%" stopColor="#533702" />
          </linearGradient>

          {/* Bangladesh Green & Red Globe Gradient */}
          <radialGradient id="bdGreenGlobe" cx="65%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#007A58" />
            <stop offset="60%" stopColor="#00523B" />
            <stop offset="100%" stopColor="#002E20" />
          </radialGradient>

          {/* Bangladesh Red Circle */}
          <radialGradient id="bdRedCircle" cx="45%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#FF4A5E" />
            <stop offset="70%" stopColor="#D9162C" />
            <stop offset="100%" stopColor="#8F0514" />
          </radialGradient>

          {/* Metallic Chrome Ring */}
          <linearGradient id="metallicRim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="25%" stopColor="#7B8D9E" />
            <stop offset="50%" stopColor="#2A3845" />
            <stop offset="75%" stopColor="#A8BCCF" />
            <stop offset="100%" stopColor="#1E2830" />
          </linearGradient>

          {/* US Blue Field */}
          <linearGradient id="usBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1A3B66" />
            <stop offset="100%" stopColor="#091A33" />
          </linearGradient>

          {/* Sun Rays Gold */}
          <linearGradient id="sunRays" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#FFC83B" />
            <stop offset="100%" stopColor="#FF8500" />
          </linearGradient>

          {/* Text 3D Chrome Effect */}
          <linearGradient id="textGold" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF7D6" />
            <stop offset="35%" stopColor="#FFD359" />
            <stop offset="50%" stopColor="#C99419" />
            <stop offset="75%" stopColor="#885E07" />
            <stop offset="100%" stopColor="#FFECA7" />
          </linearGradient>

          <filter id="shadowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000000" floodOpacity="0.7" />
          </filter>
        </defs>

        {/* Outer Circular Ring (Metallic Bevel) */}
        <circle cx="100" cy="95" r="88" fill="url(#metallicRim)" stroke="#111822" strokeWidth="3" />
        <circle cx="100" cy="95" r="84" fill="#0A1118" stroke="url(#goldGradient)" strokeWidth="1.5" />

        {/* Globe Background with Latitude/Longitude Grid (Bangladesh Region) */}
        <g transform="translate(45, 30)">
          {/* Globe body */}
          <circle cx="75" cy="65" r="55" fill="url(#bdGreenGlobe)" />
          {/* Bangladesh Red Circle */}
          <circle cx="68" cy="62" r="22" fill="url(#bdRedCircle)" />
          {/* Longitude / Latitude grid lines */}
          <ellipse cx="75" cy="65" rx="55" ry="24" fill="none" stroke="#2DE0A5" strokeWidth="1" strokeOpacity="0.4" />
          <ellipse cx="75" cy="65" rx="28" ry="55" fill="none" stroke="#2DE0A5" strokeWidth="1" strokeOpacity="0.4" />
          <path d="M 20 65 L 130 65" stroke="#2DE0A5" strokeWidth="1" strokeOpacity="0.4" />
        </g>

        {/* Rising Golden Sun Rays (Emerging at bottom of globe) */}
        <g transform="translate(100, 140)">
          <path d="M 0 0 L -8 -30 L 0 -22 L 8 -30 Z" fill="url(#sunRays)" />
          <path d="M 0 0 L -25 -25 L -14 -18 L 0 0" fill="url(#sunRays)" />
          <path d="M 0 0 L 25 -25 L 14 -18 L 0 0" fill="url(#sunRays)" />
          <path d="M 0 0 L -40 -12 L -25 -10 L 0 0" fill="url(#sunRays)" />
          <path d="M 0 0 L 40 -12 L 25 -10 L 0 0" fill="url(#sunRays)" />
          {/* Sun Core */}
          <ellipse cx="0" cy="2" rx="26" ry="14" fill="url(#goldGradient)" />
        </g>

        {/* USA Flag Stripes under Tiger Neck/Body */}
        <g transform="translate(30, 80)">
          <path d="M 12 18 C 28 35 48 48 80 50 L 76 60 C 44 58 22 44 6 25 Z" fill="#CC1829" />
          <path d="M 8 22 C 24 39 44 52 76 54 L 72 64 C 40 62 18 48 2 29 Z" fill="#F4F6F9" />
          <path d="M 4 26 C 20 43 40 56 72 58 L 68 68 C 36 66 14 52 -2 33 Z" fill="#CC1829" />
        </g>

        {/* Royal Bengal Tiger Profile with Gold Metallic Highlights & USA Stars */}
        <g filter="url(#shadowFilter)" transform="translate(18, 12)">
          {/* US Blue Field behind Tiger Ear / Shoulder */}
          <path 
            d="M 52 42 C 60 30 75 25 85 28 C 78 40 65 60 55 78 C 45 68 45 52 52 42 Z" 
            fill="url(#usBlue)" 
            stroke="url(#goldGradient)" 
            strokeWidth="0.8" 
          />
          {/* Little Stars in Blue Field */}
          <circle cx="68" cy="35" r="1.8" fill="#FFFFFF" />
          <circle cx="76" cy="42" r="1.8" fill="#FFFFFF" />
          <circle cx="62" cy="46" r="1.8" fill="#FFFFFF" />
          <circle cx="70" cy="54" r="1.8" fill="#FFFFFF" />

          {/* Tiger Head Base & Jaws (Golden Regal Silhouette) */}
          <path 
            d="M 58 45 C 70 20 98 16 114 26 C 122 32 128 42 134 46 C 142 50 152 56 150 64 C 148 70 138 72 134 76 C 138 80 144 86 138 90 C 132 94 122 88 116 88 C 112 94 102 96 95 90 C 85 106 65 116 48 112 C 55 98 62 82 58 70 C 52 64 50 54 58 45 Z" 
            fill="url(#goldGradient)" 
            stroke="#150E02" 
            strokeWidth="2.5" 
          />

          {/* Tiger Facial Details & Black Bengal Stripes */}
          {/* Crown Stripes */}
          <path d="M 85 24 Q 92 34 88 42 Q 95 38 100 28 Z" fill="#181105" />
          <path d="M 98 32 Q 106 40 102 48 Q 110 44 114 34 Z" fill="#181105" />
          {/* Cheek & Brow Stripes */}
          <path d="M 72 52 Q 86 58 96 54 Q 88 64 78 62 Z" fill="#181105" />
          <path d="M 82 66 Q 98 72 110 65 Q 100 78 88 74 Z" fill="#181105" />
          <path d="M 94 76 Q 106 82 118 78 Q 112 86 102 84 Z" fill="#181105" />
          
          {/* Tiger Ear */}
          <path d="M 66 32 C 60 22 72 15 78 24 Z" fill="#FFFFFF" stroke="#181105" strokeWidth="1.5" />
          <path d="M 68 30 C 65 24 72 20 74 25 Z" fill="#181105" />

          {/* Fierce Tiger Eye */}
          <ellipse cx="118" cy="48" rx="5" ry="3" fill="#0A0802" />
          <ellipse cx="119" cy="48" rx="3.5" ry="2" fill="#38E54D" />
          <circle cx="119" cy="48" r="1.5" fill="#000000" />
          <circle cx="120" cy="47" r="0.7" fill="#FFFFFF" />

          {/* Nose & Whiskers Zone */}
          <path d="M 136 60 C 142 62 144 65 140 68 C 136 66 134 62 136 60 Z" fill="#110A03" />
          {/* Sharp Fangs / Teeth */}
          <path d="M 130 84 L 133 90 L 135 84 Z" fill="#FFFFFF" stroke="#181105" strokeWidth="0.8" />
          <path d="M 124 85 L 126 89 L 128 85 Z" fill="#FFFFFF" stroke="#181105" strokeWidth="0.8" />
        </g>

        {/* Dynamic Curved Ribbon Waves (Bottom Edge) */}
        <g transform="translate(35, 142)">
          <path 
            d="M 5 15 C 35 -2 65 20 100 8 C 120 0 135 5 140 10 C 115 15 85 0 50 18 C 25 30 10 24 5 15 Z" 
            fill="url(#goldGradient)" 
            stroke="#150E02" 
            strokeWidth="1.5" 
          />
          <path 
            d="M 12 20 C 40 5 70 25 105 14 C 125 6 138 12 142 16 C 120 20 90 8 55 24 C 32 35 18 28 12 20 Z" 
            fill="#FFFFFF" 
            opacity="0.85" 
          />
          <path 
            d="M 18 25 C 45 12 75 30 110 20 C 130 12 140 18 144 22 C 124 26 95 14 60 30 C 38 40 25 34 18 25 Z" 
            fill="#CC1829" 
          />
        </g>
      </svg>

      {/* 3D Embossed Metallic Bengali Typography: বেঙ্গল টিভি */}
      {showText && (
        <div 
          className="font-bold text-center tracking-tight leading-none mt-1 font-serif select-none"
          style={{ 
            fontSize: dimensions.fontSize,
            background: 'linear-gradient(180deg, #FFFFFF 0%, #FFD700 25%, #C99700 55%, #8B6500 80%, #FFF2A3 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.95)) drop-shadow(0 0 8px rgba(255,215,0,0.4))',
            letterSpacing: '0.02em',
          }}
        >
          বেঙ্গল টিভি
        </div>
      )}
    </div>
  );
};
