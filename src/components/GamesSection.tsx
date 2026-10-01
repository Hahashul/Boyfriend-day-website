import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { playPopSound, playSparkleSound, playHeartChime } from '../utils/audio';
import { LoveReason } from '../types/scrapbook';
import { HeartDoodle, SparkleDoodle } from './Doodles';
import { Sparkles, Dices, RefreshCw, Heart, Smile } from 'lucide-react';

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
        particleCount: 30,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#F43F5E', '#FDE047', '#A7F3D0'],
      });
    }, 300);
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
      if (counter > 14) {
        clearInterval(interval);
        setSpinning(false);
        playHeartChime();
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    }, 100);
  };

  const handleTapLoveHeart = () => {
    playPopSound();
    setLoveClicks((prev) => prev + 1);
    if ((loveClicks + 1) % 10 === 0) {
      playSparkleSound();
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="font-casual text-xs font-semibold uppercase text-rose-600 tracking-wider">
          Playful Corner
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-stone-800">
          Cute Games & Surprises 🎮
        </h2>
        <p className="font-handwriting text-lg text-stone-600">
          Little interactive games to make you smile whenever you visit.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* GAME 1: The Jar of Reasons */}
        <div className="bg-[#FFFDF9] rounded-3xl border border-[#E8DFC8] p-6 sm:p-8 flex flex-col justify-between shadow-xs relative overflow-hidden">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-stone-400">GAME 01</span>
              <span className="text-xs font-casual text-rose-600 font-semibold bg-rose-50 px-2 py-0.5 rounded">
                Infinite Hugs
              </span>
            </div>

            <h3 className="font-serif text-2xl font-bold text-stone-800">
              The "Reasons Why I Love You" Jar 🫙
            </h3>
            <p className="font-casual text-xs text-stone-500">
              Tap the mason jar below to draw a folded paper note from inside.
            </p>

            {/* Mason Jar Illustration */}
            <div className="py-6 flex flex-col items-center justify-center">
              <button
                type="button"
                onClick={handlePullFromJar}
                className="group relative cursor-pointer transform hover:scale-105 active:scale-95 transition-transform"
                title="Tap to pull a love note"
              >
                {/* SVG Jar */}
                <svg viewBox="0 0 160 220" className="w-36 h-48 drop-shadow-md">
                  {/* Jar Lid */}
                  <rect x="40" y="10" width="80" height="16" rx="4" fill="#C4B5A5" stroke="#7A6856" strokeWidth="2" />
                  <rect x="35" y="24" width="90" height="8" rx="2" fill="#DFD7CB" stroke="#7A6856" strokeWidth="2" />
                  {/* Jar Body (glass) */}
                  <rect x="25" y="32" width="110" height="175" rx="22" fill="#EAF3F7" fillOpacity="0.65" stroke="#7A6856" strokeWidth="3" />
                  {/* Heart on glass */}
                  <path d="M80 120 C60 100 50 85 50 72 C50 62 58 55 68 55 C74 55 78 58 80 61 C82 58 86 55 92 55 C102 55 110 62 110 72 C110 85 100 100 80 120 Z" fill="#FDA4AF" fillOpacity="0.8" />
                  {/* Folded paper notes inside */}
                  <rect x="42" y="145" width="30" height="20" rx="3" fill="#FED7AA" transform="rotate(-15 42 145)" />
                  <rect x="85" y="140" width="28" height="22" rx="3" fill="#FBCFE8" transform="rotate(20 85 140)" />
                  <rect x="60" y="165" width="34" height="18" rx="3" fill="#BBF7D0" transform="rotate(-5 60 165)" />
                  <rect x="75" y="130" width="26" height="20" rx="3" fill="#BAE6FD" transform="rotate(10 75 130)" />
                </svg>

                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/90 border border-stone-200 px-3 py-1 rounded-full text-xs font-casual text-rose-600 shadow-xs">
                  Tap to pull a note ✨
                </div>
              </button>
            </div>

            {/* Pulled Note Display */}
            {pulledReason && (
              <div className="bg-lined-paper rounded-2xl border border-stone-200 p-5 animate-in fade-in zoom-in-95 shadow-sm relative">
                <div className="text-[10px] font-mono text-stone-400 uppercase tracking-widest pb-1 border-b border-stone-200">
                  REASON DRAWN FOR {boyfriendName || 'YOU'}
                </div>
                <p className="font-handwriting text-2xl text-stone-900 mt-3 leading-relaxed">
                  "{pulledReason.text}"
                </p>
                <div className="mt-3 flex items-center justify-between text-xs text-stone-400 font-casual">
                  <span>With all my heart ♡</span>
                  <button
                    type="button"
                    onClick={handlePullFromJar}
                    className="text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1 cursor-pointer"
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
        <div className="bg-[#FFFDF9] rounded-3xl border border-[#E8DFC8] p-6 sm:p-8 flex flex-col justify-between shadow-xs relative">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-stone-400">GAME 02</span>
              <span className="text-xs font-casual text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded">
                Can't Decide?
              </span>
            </div>

            <h3 className="font-serif text-2xl font-bold text-stone-800">
              Our Next Date Idea Roulette 🎲
            </h3>
            <p className="font-casual text-xs text-stone-500">
              Whenever we can't decide what to do on date night, spin this wheel!
            </p>

            <div className="py-6 flex flex-col items-center">
              <div className="w-full min-h-[130px] rounded-2xl bg-amber-50/70 border-2 border-dashed border-amber-200 p-5 flex flex-col items-center justify-center text-center">
                {selectedDateIdea ? (
                  <div className="animate-in fade-in">
                    <span className="text-[10px] font-mono uppercase text-amber-800 tracking-wider">
                      DECIDED BY DESTINY
                    </span>
                    <p className="font-serif text-lg sm:text-xl font-bold text-stone-800 mt-2">
                      {selectedDateIdea}
                    </p>
                    <span className="text-xs font-casual text-stone-500 mt-1 inline-block">
                      Get ready, handsome! ✨
                    </span>
                  </div>
                ) : (
                  <div className="text-stone-400 text-xs font-casual flex flex-col items-center">
                    <Dices className="w-8 h-8 mb-2 text-amber-400" />
                    <span>Press the button below to pick our next adventure</span>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleSpinDateWheel}
                disabled={spinning}
                className="mt-6 px-6 py-3 bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-white font-casual text-sm font-semibold rounded-xl shadow-sm transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <Dices className={`w-4 h-4 ${spinning ? 'animate-spin' : ''}`} />
                <span>{spinning ? 'Rolling the dice...' : 'Spin for Our Next Date'}</span>
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
            <span className="font-casual">100% girlfriend approved dates</span>
            <span>No backing out! 😉</span>
          </div>
        </div>
      </div>

      {/* Interactive Sweet Heart Tapper */}
      <section className="bg-notebook-grid rounded-3xl border border-[#E8DFC8] p-6 sm:p-8 text-center max-w-xl mx-auto space-y-3">
        <span className="font-casual text-xs font-semibold text-rose-600 uppercase">
          Love Battery Meter
        </span>
        <h3 className="font-serif text-2xl font-bold text-stone-800">
          How Much Love Can You Catch?
        </h3>
        <p className="font-casual text-xs text-stone-500">
          Tap the big heart to send virtual kisses & pump up our love score!
        </p>

        <div className="py-4 flex flex-col items-center">
          <button
            type="button"
            onClick={handleTapLoveHeart}
            className="group transform hover:scale-110 active:scale-90 transition-transform cursor-pointer"
          >
            <Heart className="w-20 h-20 text-rose-500 fill-rose-500 drop-shadow-md group-hover:fill-rose-400" />
          </button>

          <div className="mt-4 font-mono text-2xl font-bold text-rose-700">
            {loveClicks} <span className="text-sm font-casual text-stone-500">Kisses Sent</span>
          </div>
          <p className="font-handwriting text-lg text-stone-600 mt-1">
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
