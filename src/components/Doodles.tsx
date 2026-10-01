import React from 'react';

export const HeartDoodle = ({ className = 'w-6 h-6 text-rose-400' }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path
      d="M50 86 C25 68 8 50 8 32 C8 17 20 8 34 8 C42 8 47 12 50 16 C53 12 58 8 66 8 C80 8 92 17 92 32 C92 50 75 68 50 86 Z"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fillOpacity="0.85"
    />
  </svg>
);

export const OutlineHeartDoodle = ({ className = 'w-6 h-6 text-rose-400' }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <path
      d="M50 84 C26 67 10 50 10 33 C10 18 21 10 34 10 C42 10 47 14 50 18 C53 14 58 10 66 10 C79 10 90 18 90 33 C90 50 74 67 50 84 Z"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M62 22 C67 22 72 26 73 31"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

export const StarDoodle = ({ className = 'w-5 h-5 text-amber-400' }: { className?: string }) => (
  <svg viewBox="0 0 50 50" className={className} fill="none" stroke="currentColor">
    <path
      d="M25 4 L28 19 L43 21 L31 29 L35 44 L25 34 L15 44 L19 29 L7 21 L22 19 Z"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.4"
    />
  </svg>
);

export const SparkleDoodle = ({ className = 'w-5 h-5 text-amber-400' }: { className?: string }) => (
  <svg viewBox="0 0 40 40" className={className} fill="currentColor">
    <path d="M20 2 C20 12 28 20 38 20 C28 20 20 28 20 38 C20 28 12 20 2 20 C12 20 20 12 20 2 Z" />
  </svg>
);

export const PaperPlaneDoodle = ({ className = 'w-6 h-6 text-stone-500' }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor">
    <path
      d="M10 50 L90 15 L55 85 L45 58 L10 50 Z"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <path d="M90 15 L45 58" strokeWidth="3" strokeDasharray="3 3" />
  </svg>
);

export const ArrowDoodle = ({ className = 'w-10 h-6 text-stone-400' }: { className?: string }) => (
  <svg viewBox="0 0 100 40" className={className} fill="none" stroke="currentColor">
    <path
      d="M5 25 Q 45 5, 85 20 M 70 8 L 88 20 L 72 32"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const PostageStamp = ({ label = 'AIR MAIL', price = '0.00' }: { label?: string; price?: string }) => (
  <div className="relative inline-block p-2 bg-[#FFF8EB] border-2 border-dashed border-[#D4C3A3] rounded-sm shadow-sm select-none">
    <div className="border border-[#E4D5BC] p-2 text-center min-w-[72px]">
      <div className="text-[9px] font-sans font-semibold tracking-wider text-[#A0886A] uppercase">{label}</div>
      <div className="text-xl my-0.5">💌</div>
      <div className="text-[8px] font-mono text-[#B0997B]">LOVE NO. 1004</div>
      <div className="text-[10px] font-handwriting font-bold text-rose-500">{price} ∞</div>
    </div>
  </div>
);

export const WaxSeal = ({ onClick, isOpened = false }: { onClick?: () => void; isOpened?: boolean }) => (
  <button
    type="button"
    onClick={onClick}
    className={`group relative flex items-center justify-center w-16 h-16 rounded-full transition-transform duration-300 ${
      isOpened ? 'scale-90 opacity-70' : 'hover:scale-105 active:scale-95'
    } shadow-md`}
    style={{
      background: 'radial-gradient(circle, #B91C1C 0%, #991B1B 65%, #7F1D1D 100%)',
      boxShadow: '0 4px 10px rgba(127, 29, 29, 0.4), inset 0 2px 3px rgba(255, 255, 255, 0.25)'
    }}
  >
    {/* Irregular scalloped edge illusion */}
    <div className="absolute inset-1 rounded-full border-2 border-rose-300/40 border-dashed" />
    <span className="text-2xl filter drop-shadow select-none group-hover:scale-110 transition-transform">
      {isOpened ? '✨' : '💖'}
    </span>
  </button>
);

// Tasteful hand-drawn sketches for Polaroid placeholders (NO stock photos)
export const SketchDoodleArt = ({ type }: { type: 'sunset' | 'coffee' | 'hands' | 'stargazing' | 'cinema' | 'cozy' }) => {
  switch (type) {
    case 'coffee':
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full text-stone-700">
          <rect width="200" height="200" fill="#FDFBF7" />
          {/* Two coffee mugs clinking */}
          <path d="M50 110 C50 145 80 150 95 150 C110 150 140 145 140 110 L140 85 L50 85 Z" fill="#F7EFE2" stroke="#5C4D3C" strokeWidth="3" />
          <path d="M140 95 C155 95 165 105 165 115 C165 125 155 135 140 135" fill="none" stroke="#5C4D3C" strokeWidth="3" strokeLinecap="round" />
          {/* Steam hearts */}
          <path d="M80 75 Q75 60 85 50 Q90 40 85 30" fill="none" stroke="#C27878" strokeWidth="2" strokeDasharray="3 3" />
          <path d="M110 75 Q115 60 105 50 Q100 40 105 30" fill="none" stroke="#C27878" strokeWidth="2" strokeDasharray="3 3" />
          <text x="100" y="180" textAnchor="middle" fill="#8C7A6B" className="font-handwriting text-sm">
            "Warm coffee & endless talks"
          </text>
        </svg>
      );
    case 'hands':
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full text-stone-700">
          <rect width="200" height="200" fill="#FCFAF6" />
          {/* Holding hands doodle */}
          <path d="M40 100 Q70 110 95 105 Q105 102 115 108 Q140 115 160 100" fill="none" stroke="#685545" strokeWidth="3" strokeLinecap="round" />
          <path d="M70 105 C75 125 90 135 105 125 C115 120 120 105 115 95" fill="none" stroke="#685545" strokeWidth="3" strokeLinecap="round" />
          {/* Cute pink heart on fingers */}
          <circle cx="102" cy="85" r="4" fill="#E17076" />
          <path d="M96 82 C96 78 100 76 102 78 C104 76 108 78 108 82 C108 86 102 90 102 90 C102 90 96 86 96 82 Z" fill="#E17076" />
          <text x="100" y="180" textAnchor="middle" fill="#8C7A6B" className="font-handwriting text-sm">
            "You fit right in my hand"
          </text>
        </svg>
      );
    case 'stargazing':
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <rect width="200" height="200" fill="#242838" />
          {/* Crescent moon */}
          <path d="M150 40 C140 40 130 50 130 65 C130 80 142 90 155 88 C145 92 132 88 125 78 C118 68 120 52 130 44 C136 39 143 38 150 40 Z" fill="#FCE588" />
          {/* Two heads silhouetted */}
          <circle cx="85" cy="150" r="18" fill="#151722" />
          <circle cx="115" cy="148" r="19" fill="#151722" />
          <ellipse cx="100" cy="185" rx="55" ry="30" fill="#151722" />
          {/* Tiny stars */}
          <circle cx="45" cy="50" r="1.5" fill="#FFF" />
          <circle cx="70" cy="70" r="2" fill="#FCE588" />
          <circle cx="100" cy="40" r="1.5" fill="#FFF" />
          <circle cx="170" cy="75" r="1.5" fill="#FFF" />
          <text x="100" y="195" textAnchor="middle" fill="#B7BED4" className="font-handwriting text-sm">
            "Counting stars with you"
          </text>
        </svg>
      );
    case 'cinema':
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full text-stone-700">
          <rect width="200" height="200" fill="#FAF5ED" />
          {/* Movie ticket & Popcorn */}
          <rect x="50" y="70" width="100" height="60" rx="6" fill="#F3E7D3" stroke="#8C6D4C" strokeWidth="2.5" />
          <line x1="110" y1="70" x2="110" y2="130" stroke="#8C6D4C" strokeWidth="2" strokeDasharray="4 3" />
          <circle cx="50" cy="100" r="6" fill="#FAF5ED" />
          <circle cx="150" cy="100" r="6" fill="#FAF5ED" />
          <text x="80" y="105" textAnchor="middle" fill="#8C6D4C" className="font-sans font-bold text-xs tracking-widest">
            ADMIT 2
          </text>
          <text x="130" y="105" textAnchor="middle" fill="#E17076" className="text-sm">
            ♥
          </text>
          <text x="100" y="180" textAnchor="middle" fill="#8C7A6B" className="font-handwriting text-sm">
            "Our cozy movie marathons"
          </text>
        </svg>
      );
    case 'cozy':
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full text-stone-700">
          <rect width="200" height="200" fill="#FDFBF7" />
          {/* Two sleeping cats / cuddle sketch */}
          <path d="M70 120 C60 100 70 85 90 90 C105 80 125 80 135 95 C145 110 135 130 110 130 C90 130 80 130 70 120 Z" fill="#F1E3D3" stroke="#7A634E" strokeWidth="2.5" />
          {/* Ears */}
          <polygon points="75,90 82,75 90,88" fill="#E2CDB5" stroke="#7A634E" strokeWidth="2" />
          <polygon points="120,88 128,75 135,90" fill="#E2CDB5" stroke="#7A634E" strokeWidth="2" />
          {/* Sleeping eyes */}
          <path d="M85 105 Q92 110 99 105" fill="none" stroke="#7A634E" strokeWidth="2" strokeLinecap="round" />
          <path d="M112 105 Q119 110 126 105" fill="none" stroke="#7A634E" strokeWidth="2" strokeLinecap="round" />
          <text x="100" y="180" textAnchor="middle" fill="#8C7A6B" className="font-handwriting text-sm">
            "My favorite place is by you"
          </text>
        </svg>
      );
    case 'sunset':
    default:
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <linearGradient id="sunsetGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F9A8A8" />
              <stop offset="50%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#DDD6FE" />
            </linearGradient>
          </defs>
          <rect width="200" height="200" fill="url(#sunsetGrad)" />
          {/* Setting sun */}
          <circle cx="100" cy="120" r="35" fill="#FFF" fillOpacity="0.85" />
          {/* Hills */}
          <path d="M0 160 Q 60 140, 110 155 Q 160 170, 200 150 L200 200 L0 200 Z" fill="#816B88" fillOpacity="0.75" />
          <path d="M0 175 Q 80 165, 140 180 Q 180 190, 200 180 L200 200 L0 200 Z" fill="#58485F" />
          {/* Birds */}
          <path d="M40 70 Q45 65 50 70 Q55 65 60 70" fill="none" stroke="#7E5F6D" strokeWidth="2" strokeLinecap="round" />
          <path d="M65 80 Q69 76 73 80 Q77 76 81 80" fill="none" stroke="#7E5F6D" strokeWidth="1.5" strokeLinecap="round" />
          <text x="100" y="195" textAnchor="middle" fill="#FDFBF7" className="font-handwriting text-sm">
            "Golden hour memories"
          </text>
        </svg>
      );
  }
};
