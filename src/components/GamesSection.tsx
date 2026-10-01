import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { playPopSound, playSparkleSound, playHeartChime } from '../utils/audio';
import { LoveReason } from '../types/scrapbook';
import { Sparkles, Dices, RefreshCw, Heart } from 'lucide-react';

interface GamesSectionProps {
  reasons: LoveReason[];
  boyfriendName: string;
  senderName: string;
}

export const GamesSection: React.FC<GamesSectionProps> = ({
  reasons,
  boyfriendName,
  senderName,
}) => {
  // Jar state
  const [pulledReason, setPulledReason] = useState<LoveReason | null>(null);
  const [isOpeningNote, setIsOpeningNote] = useState(false);

  // Date Spinner state
  const dateIdeas = [
    '🍝 Cooking homemade pasta together & playing Italian jazz',
    '🎬 Blanket fort movie marathon with your favorite popcorn',
    '🍦 Late night 11pm ice cream run in our pajamas',
    '☕️ Exploring a cozy new coffee shop and talking for hours',
    '🌌 Stargazing in the car with warm hot chocolate',
    '🎮 Video game tournament (I will try my best not to lose!)',
    '🍕 Pizza tasting night & rating every slice',
    '🏖️ Sunset walk holding hands with zero phones',
  ];
  const [spinning, setSpinning] = useState(false);
  const [selectedDateIdea, setSelectedDateIdea] = useState<string | null>(null);

  // Love meter state
  const [loveClicks, setLoveClicks] = useState(0);

  const handlePullFromJar = () => {
    setIsOpeningNote(true);
    playPopSound();
    const randomIndex = Math.floor(Math.random() * reasons.length);
    setTimeout(() => {
      setPulledReason(reasons[randomIndex]);
      setIsOpeningNote(false);
      playSparkleSound();
      confetti({
        particleCount: 20,
        spread: 45,
        origin: { y: 0.65 },
        colors: ['#FB7185', '#FDE68A', '#DDD6FE'],
        disableForReducedMotion: true,
      });
    }, 250);
  };

  const handleSpinDateWheel = () => {
    if (spinning) return;
    setSpinning(true);
    playPopSound();

    let counter = 0;
    const interval = setInterval(() => {
      const tempIndex = Math.floor(Math.random() * dateIdeas.length);
      setSelectedDateIdea(dateIdeas[tempIndex]);
      counter++;
      if (counter > 12) {
        clearInterval(interval);
        setSpinning(false);
        playHeartChime();
        confetti({
          particleCount: 25,
          spread: 55,
          origin: { y: 0.65 },
          colors: ['#FB7185', '#FDE68A', '#BAE6FD'],
          disableForReducedMotion: true,
        });
      }
    }, 90);
  };

  const handleTapLoveHeart = () => {
    playPopSound();
    const nextCount = loveClicks + 1;
    setLoveClicks(nextCount);
    if (nextCount % 10 === 0) {
      playSparkleSound();
      confetti({
        particleCount: 22,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#E11D48', '#FB7185', '#FDA4AF'],
        disableForReducedMotion: true,
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-1">
        <span className="inline-block px-3 py-1 bg-[#FFF4B8] border border-[#F2DE79] rounded-full font-sans text-xs font-semibold uppercase text-[#24324A] tracking-wider shadow-2xs">
          Playful Corner
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#24324A] font-bold tracking-tight">
          Cute Games & Surprises 🎮
        </h2>
        <p className="font-handwriting text-xl text-[#24324A]/80">
          Little interactive games to make you smile whenever you visit.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* GAME 1: The Jar of Reasons */}
        <div className="bg-white rounded-3xl border border-[#F5B4C9] p-6 sm:p-8 flex flex-col justify-between shadow-2xs relative">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-[#24324A]/50">GAME 01</span>
              <span className="text-xs font-sans text-[#24324A] font-medium bg-[#FFDDE8] px-2.5 py-0.5 rounded-full border border-[#F5B4C9]">
                Infinite Hugs
              </span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#24324A]">
              The "Reasons Why I Love You" Jar 🫙
            </h3>
            <p className="font-sans text-xs text-[#24324A]/70">
              Tap the mason jar below to draw a folded note from inside.
            </p>

            {/* Mason Jar Illustration */}
            <div className="py-5 flex flex-col items-center justify-center">
              <button
                type="button"
                onClick={handlePullFromJar}
                className="group relative cursor-pointer transform hover:scale-105 active:scale-95 transition-transform"
                title="Tap to pull a love note"
              >
                {/* SVG Jar */}
                <svg viewBox="0 0 160 220" className="w-32 h-44 drop-shadow-xs">
                  {/* Jar Lid */}
                  <rect x="42" y="12" width="76" height="14" rx="3" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
                  <rect x="36" y="24" width="88" height="7" rx="2" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1.5" />
                  {/* Jar Body (glass) */}
                  <rect x="25" y="31" width="110" height="175" rx="20" fill="#EAF6FF" fillOpacity="0.85" stroke="#BAE6FD" strokeWidth="2.5" />
                  {/* Heart on glass */}
                  <path d="M80 115 C62 98 52 84 52 72 C52 63 60 56 69 56 C75 56 78 59 80 62 C82 59 85 56 91 56 C100 56 108 63 108 72 C108 84 98 98 80 115 Z" fill="#FB7185" fillOpacity="0.8" />
                  {/* Folded paper notes inside */}
                  <rect x="42" y="145" width="28" height="18" rx="3" fill="#FFF4B8" stroke="#EBD668" strokeWidth="1" transform="rotate(-15 42 145)" />
                  <rect x="85" y="140" width="26" height="20" rx="3" fill="#FFDDE8" stroke="#F5B4C9" strokeWidth="1" transform="rotate(18 85 140)" />
                  <rect x="62" y="165" width="32" height="16" rx="3" fill="#E9DEFF" stroke="#CFB7FF" strokeWidth="1" transform="rotate(-5 62 165)" />
                  <rect x="76" y="130" width="24" height="18" rx="3" fill="#DDF7E8" stroke="#B4E8C8" strokeWidth="1" transform="rotate(10 76 130)" />
                </svg>

                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white border border-[#F5B4C9] px-3.5 py-1 rounded-full text-xs font-sans font-semibold text-[#24324A] shadow-2xs">
                  Tap to draw a note ✨
                </div>
              </button>
            </div>

            {/* Pulled Note Display */}
            {pulledReason && (
              <div className="bg-lined-paper-pink rounded-2xl border border-[#F5B4C9] p-5 animate-in fade-in zoom-in-95 shadow-2xs relative">
                <div className="text-[10px] font-mono text-rose-600 font-semibold uppercase tracking-wider pb-1 border-b border-rose-200">
                  REASON DRAWN FOR {boyfriendName || 'YOU'}
                </div>
                <p className="font-handwriting text-2xl text-[#24324A] font-bold mt-3 leading-relaxed">
                  "{pulledReason.text}"
                </p>
                <div className="mt-3 flex items-center justify-between text-xs font-sans">
                  <span className="text-[#24324A]/70 font-medium">With all my heart ♡</span>
                  <button
                    type="button"
                    onClick={handlePullFromJar}
                    className="text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Pull another</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* GAME 2: Date Night Idea Roulette */}
        <div className="bg-white rounded-3xl border border-[#F2DE79] p-6 sm:p-8 flex flex-col justify-between shadow-2xs relative">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-[#24324A]/50">GAME 02</span>
              <span className="text-xs font-sans text-[#24324A] font-medium bg-[#FFF4B8] px-2.5 py-0.5 rounded-full border border-[#F2DE79]">
                Can't Decide?
              </span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#24324A]">
              Our Next Date Idea Roulette 🎲
            </h3>
            <p className="font-sans text-xs text-[#24324A]/70">
              Whenever we can't decide what to do on date night, spin this wheel!
            </p>

            <div className="py-5 flex flex-col items-center">
              <div className="w-full min-h-[130px] rounded-2xl bg-[#FFFDF0] border border-[#F2DE79] p-5 flex flex-col items-center justify-center text-center">
                {selectedDateIdea ? (
                  <div className="animate-in fade-in">
                    <span className="text-[10px] font-mono font-semibold uppercase text-[#24324A]/60 tracking-wider">
                      DECIDED BY DESTINY
                    </span>
                    <p className="font-serif text-lg sm:text-xl font-bold text-[#24324A] mt-2">
                      {selectedDateIdea}
                    </p>
                    <span className="text-xs font-sans font-medium text-rose-600 mt-1 inline-block">
                      Get ready, handsome! ✨
                    </span>
                  </div>
                ) : (
                  <div className="text-[#24324A]/70 text-xs font-sans flex flex-col items-center">
                    <Dices className="w-8 h-8 mb-2 text-amber-500" />
                    <span>Press the button below to pick our next adventure</span>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleSpinDateWheel}
                disabled={spinning}
                className="mt-5 px-6 py-2.5 bg-[#24324A] hover:bg-[#1A2538] disabled:opacity-50 text-white font-sans text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <Dices className={`w-4 h-4 ${spinning ? 'animate-spin' : ''}`} />
                <span>{spinning ? 'Rolling the dice...' : 'Spin for Our Next Date'}</span>
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-amber-100 flex items-center justify-between text-xs text-[#24324A]/70 font-sans">
            <span>100% girlfriend approved</span>
            <span className="font-medium text-[#24324A]">No backing out! 😉</span>
          </div>
        </div>
      </div>

      {/* GAME 3: Interactive Sweet Heart Tapper */}
      <section className="bg-white rounded-3xl border border-[#D0BDFF] p-6 sm:p-8 text-center max-w-xl mx-auto space-y-3 shadow-2xs">
        <span className="inline-block px-3 py-1 bg-[#E9DEFF] border border-[#D0BDFF] rounded-full font-sans text-xs font-semibold text-[#24324A] uppercase tracking-wider shadow-2xs">
          Love Battery Meter
        </span>
        <h3 className="font-serif text-2xl font-bold text-[#24324A]">
          How Much Love Can You Catch?
        </h3>
        <p className="font-sans text-xs text-[#24324A]/70">
          Tap the big heart to send virtual kisses & pump up our love score!
        </p>

        <div className="py-4 flex flex-col items-center">
          <button
            type="button"
            onClick={handleTapLoveHeart}
            className="group transform hover:scale-110 active:scale-90 transition-transform cursor-pointer"
          >
            <Heart className="w-16 h-16 text-rose-500 fill-rose-500 drop-shadow-xs group-hover:fill-rose-400 transition-colors" />
          </button>

          <div className="mt-3 font-serif text-2xl font-bold text-[#24324A]">
            {loveClicks} <span className="text-xs font-sans font-medium text-[#24324A]/70">Kisses Sent</span>
          </div>
          <p className="font-handwriting text-xl text-[#24324A] font-bold mt-1">
            {loveClicks === 0 && 'Tap the heart to start!'}
            {loveClicks > 0 && loveClicks < 10 && 'A few sweet kisses on your cheek 💕'}
            {loveClicks >= 10 && loveClicks < 25 && 'Super high love battery! You are loved so much! ✨'}
            {loveClicks >= 25 && 'Maximum overload of hugs and love in the universe! 🚀❤️'}
          </p>
        </div>
      </section>
    </div>
  );
};
