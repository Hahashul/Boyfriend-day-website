import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { playPopSound, playSparkleSound } from '../utils/audio';
import { Sparkles, RotateCw, Heart } from 'lucide-react';
import { WHEEL } from './Content';

// Pastel palette; colors repeat if there are more slices than colors
const SLICE_COLORS = [
  '#FF9FC4',
  '#FFE66D',
  '#9FE8C1',
  '#C9B5FF',
  '#93D5FD',
  '#FFB4D6',
  '#FDE047',
  '#A7F3D0',
  '#DDD6FE',
  '#BAE6FD',
];

// Split long labels into two lines at the word boundary nearest the middle
const splitLabel = (text: string): string[] => {
  if (text.length <= 12 || !text.includes(' ')) return [text];
  const words = text.split(' ');
  let best = 1;
  let bestDiff = Infinity;
  for (let k = 1; k < words.length; k++) {
    const diff = Math.abs(words.slice(0, k).join(' ').length - words.slice(k).join(' ').length);
    if (diff < bestDiff) { bestDiff = diff; best = k; }
  }
  return [words.slice(0, best).join(' '), words.slice(best).join(' ')];
};

export const SurpriseWheel: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [hasSpun, setHasSpun] = useState(false);
  const totalSpinsRef = useRef(0);

  const rewards = WHEEL.rewards;
  const SLICE_COUNT = rewards.length;
  const SLICE_DEGREE = 360 / SLICE_COUNT;

  // Coordinates helper for drawing pie slices
  const getCoordinatesForPercent = (angleInDegrees: number, radius = 175) => {
    // 0 deg is at 12 o'clock (-90 deg in Cartesian)
    const angleInRadians = (angleInDegrees - 90) * (Math.PI / 180);
    return {
      x: 200 + radius * Math.cos(angleInRadians),
      y: 200 + radius * Math.sin(angleInRadians),
    };
  };

  const handleSpin = () => {
    if (isSpinning) return;

    playPopSound();
    setIsSpinning(true);
    setWinner(null);
    setHasSpun(true);
    totalSpinsRef.current += 1;

    // Pick a random target slice index
    const targetIndex = Math.floor(Math.random() * SLICE_COUNT);

    // Calculate rotation:
    // To land targetIndex at the top needle (which points to 0°/360°):
    // Midpoint of slice targetIndex is: (targetIndex + 0.5) * SLICE_DEGREE
    // For wheel angle (targetIndex + 0.5) * SLICE_DEGREE to end up at 0°,
    // the wheel must end at: 360 - (targetIndex + 0.5) * SLICE_DEGREE
    const targetOffset = 360 - (targetIndex + 0.5) * SLICE_DEGREE;

    // Add 5-7 full spins (1800° - 2520°) for excitement
    const fullSpins = (5 + Math.floor(Math.random() * 3)) * 360;

    // Current effective angle mod 360
    const currentMod = rotation % 360;
    const additionalRotation = fullSpins + ((targetOffset - currentMod + 360) % 360);

    const nextRotation = rotation + additionalRotation;
    setRotation(nextRotation);

    // After animation finishes (~4000ms)
    setTimeout(() => {
      setIsSpinning(false);
      const wonReward = rewards[targetIndex];
      setWinner(wonReward);
      playSparkleSound();

      confetti({
        particleCount: 45,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#FF9FC4', '#FFE66D', '#C9B5FF', '#9FE8C1', '#93D5FD'],
        disableForReducedMotion: true,
      });
    }, 4100);
  };

  return (
    <section className="bg-white rounded-3xl border border-[#93D5FD] p-6 sm:p-8 relative shadow-sm">
      {/* Washi tape header */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 washi-tape-pink transform -rotate-1 rounded-xs flex items-center justify-center shadow-xs z-10">
        <span className="text-[10px] font-mono font-bold text-[#20304A] tracking-wider uppercase">
          {WHEEL.tape}
        </span>
      </div>

      {/* Header Info */}
      <div className="text-center max-w-md mx-auto pt-3">
        <h3 className="font-serif text-2xl sm:text-3xl text-[#20304A] font-bold">
          {WHEEL.title}
        </h3>
      </div>

      {/* Wheel Stage Container */}
      <div className="mt-8 flex flex-col items-center justify-center">
        <div className="relative w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] flex items-center justify-center select-none">
          {/* Top Pointer Needle */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 drop-shadow-md">
            <svg width="34" height="38" viewBox="0 0 34 38">
              <polygon
                points="17,38 4,4 30,4"
                fill="#20304A"
                stroke="#FFE66D"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <circle cx="17" cy="11" r="3.5" fill="#FFE66D" />
            </svg>
          </div>

          {/* Wheel Frame Glow / Shadow Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-dashed border-[#20304A]/25 pointer-events-none" />

          {/* SVG Rotating Wheel */}
          <svg
            viewBox="0 0 400 400"
            className="w-full h-full drop-shadow-md rounded-full overflow-hidden"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning
                ? 'transform 4s cubic-bezier(0.15, 0.9, 0.2, 1)'
                : 'none',
            }}
          >
            {/* Outer Rim */}
            <circle cx="200" cy="200" r="190" fill="#20304A" />
            <circle cx="200" cy="200" r="184" fill="#FFFFFF" />

            {/* Pie Slices */}
            {rewards.map((reward, i) => {
              const startAngle = i * SLICE_DEGREE;
              const endAngle = (i + 1) * SLICE_DEGREE;
              const start = getCoordinatesForPercent(startAngle, 180);
              const end = getCoordinatesForPercent(endAngle, 180);
              const midAngle = startAngle + SLICE_DEGREE / 2;

              return (
                <g key={`${reward}-${i}`}>
                  {/* Slice Wedge */}
                  <path
                    d={`M 200 200 L ${start.x} ${start.y} A 180 180 0 0 1 ${end.x} ${end.y} Z`}
                    fill={SLICE_COLORS[i % SLICE_COLORS.length]}
                    stroke="#20304A"
                    strokeWidth="1.5"
                  />

                  {/* Slice Label (Rotated along radial midpoint) */}
                  <g transform={`rotate(${midAngle - 90} 200 200)`}>
                    <text
                      x="366"
                      y="204"
                      textAnchor="end"
                      fill="#20304A"
                      className="font-sans font-bold select-none"
                      style={{ fontSize: Math.max(...splitLabel(reward).map((l) => l.length)) > 14 ? '10.5px' : '12.5px' }}
                    >
                      {splitLabel(reward).length === 1 ? (
                        <tspan x="366" dy="4">{reward}</tspan>
                      ) : (
                        splitLabel(reward).map((line, n) => (
                          <tspan key={n} x="366" dy={n === 0 ? -3 : 14}>{line}</tspan>
                        ))
                      )}
                    </text>
                  </g>
                </g>
              );
            })}

            {/* Inner Center Hub */}
            <circle cx="200" cy="200" r="42" fill="#20304A" stroke="#FFE66D" strokeWidth="4" />
            <circle cx="200" cy="200" r="32" fill="#FFE66D" />
            <text
              x="200"
              y="204"
              textAnchor="middle"
              fill="#20304A"
              className="text-xs font-sans font-extrabold uppercase tracking-wider select-none pointer-events-none"
            >
              {WHEEL.hubText}
            </text>
          </svg>

          {/* Interactive Center Click Button */}
          <button
            type="button"
            onClick={handleSpin}
            disabled={isSpinning}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full cursor-pointer z-20 focus:outline-hidden disabled:cursor-not-allowed"
            title="Click to spin the wheel"
          />
        </div>

        {/* Spin Action Button */}
        <div className="mt-6 flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={handleSpin}
            disabled={isSpinning}
            className={`px-8 py-3.5 rounded-2xl font-sans font-bold text-sm sm:text-base flex items-center gap-2 transition-all cursor-pointer shadow-md ${
              isSpinning
                ? 'bg-stone-300 text-stone-500 cursor-not-allowed scale-95'
                : 'bg-[#20304A] hover:bg-[#152033] text-white hover:scale-105 active:scale-95'
            }`}
          >
            <RotateCw className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
            <span>{isSpinning ? WHEEL.spinningButton : hasSpun ? WHEEL.spinAgainButton : WHEEL.spinButton}</span>
          </button>
          <span className="text-[11px] font-sans text-[#20304A]/60">
            {isSpinning ? WHEEL.hintSpinning : WHEEL.hintIdle}
          </span>
        </div>

        {/* Winner Announcement Banner */}
        {winner && !isSpinning && (
          <div className="mt-6 w-full max-w-md bg-[#FFFDF0] rounded-2xl border-2 border-dashed border-[#FF9FC4] p-5 text-center animate-in zoom-in-95 duration-300 shadow-sm relative">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FF9FC4]/40 border border-[#FF9FC4] text-[11px] font-mono font-bold text-[#20304A] uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-rose-600" />
              <span>{WHEEL.winnerBadge}</span>
              <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            </div>

            <h4 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#20304A] my-1">
              {winner}
            </h4>

            <p className="font-handwriting text-xl text-[#20304A] font-bold mt-1">
              {WHEEL.winnerNote}
            </p>

            <div className="mt-3 pt-3 border-t border-[#FF9FC4]/40 flex items-center justify-center gap-1.5 text-xs text-rose-600 font-sans font-semibold">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>{WHEEL.winnerFooter}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};