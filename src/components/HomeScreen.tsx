import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { HeartDoodle, StarDoodle, SparkleDoodle, ArrowDoodle } from './Doodles';
import { playPopSound, playSparkleSound } from '../utils/audio';
import { NavSection } from './Navbar';
import { Heart, Sparkles, Clock, Award, Gift, ArrowRight, Eye, RefreshCw } from 'lucide-react';

interface HomeScreenProps {
  boyfriendName: string;
  senderName: string;
  anniversaryDate: string;
  specialNickname: string;
  onNavigate: (section: NavSection) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  boyfriendName,
  senderName,
  anniversaryDate,
  specialNickname,
  onNavigate,
}) => {
  // Live duration counter
  const [timeTogether, setTimeTogether] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Scratch card state
  const [isScratched, setIsScratched] = useState(false);

  // Open When letter modal
  const [activeLetter, setActiveLetter] = useState<{ title: string; content: string } | null>(null);

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(anniversaryDate).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, now - start);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeTogether({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [anniversaryDate]);

  const handleScratch = () => {
    if (!isScratched) {
      setIsScratched(true);
      playSparkleSound();
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#F43F5E', '#FBBF24', '#F472B6'],
      });
    }
  };

  const openWhenLetters = [
    {
      id: 'miss-me',
      title: 'Open when you miss me...',
      tag: 'Lonely Nights',
      color: 'bg-rose-50 border-rose-200 text-rose-800',
      content:
        "Close your eyes and take a deep breath. Imagine me wrapping my arms around you right now and resting my head on your chest. Distance means so little when someone means so much. Text me a random silly emoji and I will know it's you missing me! Always yours.",
    },
    {
      id: 'tired-day',
      title: 'Open when you had a tiring day...',
      tag: 'Exhausted',
      color: 'bg-amber-50 border-amber-200 text-amber-800',
      content:
        "You worked so hard today, and I am endlessly proud of you. Kick your shoes off, drink a big glass of water, and leave the stress at the door. You are doing amazing, and you are my biggest hero. Sending you a million warm hugs and forehead kisses.",
    },
    {
      id: 'cant-sleep',
      title: 'Open when you can\'t sleep...',
      tag: 'Late Hours',
      color: 'bg-indigo-50 border-indigo-200 text-indigo-800',
      content:
        "If you're staring at the ceiling in the dark, know that I'm probably dreaming of you right now. Put on our cassette tape in the music tab, listen to the gentle chords, and think of our funniest date. May you have the sweetest dreams tonight.",
    },
    {
      id: 'need-love',
      title: 'Open when you need to know how loved you are...',
      tag: 'Gentle Reminder',
      color: 'bg-emerald-50 border-emerald-200 text-emerald-800',
      content:
        "In case no one reminded you today: you are my safe place, my best friend, and my whole heart. Loving you is the easiest and most natural thing I have ever done. You are irreplaceable to me.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
      {/* Hero Welcome Banner */}
      <section className="relative bg-[#FFFDF9] rounded-3xl border border-[#EBE3D3] p-6 sm:p-10 shadow-sm overflow-hidden">
        {/* Washi tape on corner */}
        <div className="absolute -top-3 left-10 w-28 h-7 washi-tape-pink transform -rotate-3 rounded-xs flex items-center justify-center">
          <span className="text-[10px] font-mono text-rose-900 tracking-wider">OFFICIAL CORNER</span>
        </div>

        <div className="absolute top-6 right-6 hidden md:block opacity-70">
          <HeartDoodle className="w-12 h-12 text-rose-300" />
        </div>

        <div className="max-w-2xl space-y-3 mt-2">
          <div className="flex items-center gap-2 text-rose-600 font-casual text-sm tracking-wide">
            <Sparkles className="w-4 h-4" />
            <span>Welcome to your private paradise</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-stone-900 leading-tight">
            Hi {boyfriendName || 'My Love'}, {specialNickname ? `(${specialNickname})` : ''} 🤍
          </h1>

          <p className="font-serif text-stone-600 text-base sm:text-lg leading-relaxed">
            I built this little digital corner with my own hands to celebrate you, our laughter, the songs we share, and every small memory that makes my life so much brighter.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('memories')}
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-casual text-sm shadow-xs transition-transform active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <span>See Our Memories</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('music')}
              className="px-4 py-2.5 bg-white border border-stone-200 hover:border-rose-300 text-stone-700 rounded-xl font-casual text-sm transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Play Our Cassette</span>
            </button>
          </div>
        </div>
      </section>

      {/* Love Duration Clock / Counter */}
      <section className="bg-notebook-grid rounded-3xl border border-[#E8DFC8] p-6 sm:p-8 text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/90 border border-stone-200 rounded-full text-xs font-casual text-stone-600 mb-3">
          <Clock className="w-3.5 h-3.5 text-rose-500" />
          <span>Counting every single second together</span>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl text-stone-800 font-medium">
          We have been in love for...
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto mt-6">
          <div className="bg-white/95 rounded-2xl border border-stone-200/90 p-4 shadow-xs">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-rose-700 tabular-nums">
              {timeTogether.days}
            </span>
            <div className="text-xs font-casual text-stone-500 mt-1 uppercase tracking-wider">Days</div>
          </div>
          <div className="bg-white/95 rounded-2xl border border-stone-200/90 p-4 shadow-xs">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-stone-800 tabular-nums">
              {timeTogether.hours}
            </span>
            <div className="text-xs font-casual text-stone-500 mt-1 uppercase tracking-wider">Hours</div>
          </div>
          <div className="bg-white/95 rounded-2xl border border-stone-200/90 p-4 shadow-xs">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-stone-800 tabular-nums">
              {timeTogether.minutes}
            </span>
            <div className="text-xs font-casual text-stone-500 mt-1 uppercase tracking-wider">Minutes</div>
          </div>
          <div className="bg-white/95 rounded-2xl border border-stone-200/90 p-4 shadow-xs">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-rose-500 tabular-nums">
              {timeTogether.seconds}
            </span>
            <div className="text-xs font-casual text-stone-500 mt-1 uppercase tracking-wider">Seconds</div>
          </div>
        </div>

        <p className="font-handwriting text-lg sm:text-xl text-stone-600 mt-4">
          ...and I'd still choose you in every lifetime. 💕
        </p>
      </section>

      {/* Two Column Layout: VIP Boyfriend Certificate & Scratch Card */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Certificate Card */}
        <div className="bg-[#FFFDF7] rounded-3xl border-2 border-dashed border-[#D9CDBB] p-6 sm:p-7 relative shadow-xs flex flex-col justify-between">
          <div className="absolute -top-3 right-8 w-24 h-6 washi-tape-yellow transform rotate-2 rounded-xs flex items-center justify-center">
            <span className="text-[9px] font-mono text-amber-900">VERIFIED CERTIFICATE</span>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-stone-400">CERTIFICATE NO. 2026-BF-01</span>
              <Award className="w-6 h-6 text-amber-500" />
            </div>

            <h3 className="font-serif text-xl sm:text-2xl text-stone-800 mt-3 font-semibold">
              Official Best Boyfriend Certificate
            </h3>

            <p className="font-casual text-xs text-stone-500 mt-1">
              Presented to: <strong className="text-stone-800 font-semibold">{boyfriendName || 'You'}</strong>
            </p>

            <div className="mt-4 space-y-2 border-t border-b border-stone-100 py-3 text-xs sm:text-sm font-serif text-stone-700">
              <div className="flex items-start gap-2">
                <span className="text-rose-500">✓</span>
                <span>Unlimited warm hugs & back scratches on demand</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-rose-500">✓</span>
                <span>Pardon for stealing my food or fries</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-rose-500">✓</span>
                <span>Permanent VIP residency inside my heart</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-rose-500">✓</span>
                <span>Entitled to endless love and affection</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-2 flex items-center justify-between text-xs text-stone-500 font-handwriting text-base">
            <span>Signed with love,</span>
            <span className="font-bold text-rose-700 text-lg border-b border-stone-300">
              {senderName || 'Your Girlfriend'}
            </span>
          </div>
        </div>

        {/* Secret Love Scratch-Off Card */}
        <div className="bg-[#FFFDF7] rounded-3xl border border-[#E6DAC6] p-6 sm:p-7 relative shadow-xs flex flex-col justify-between">
          <div className="absolute -top-3 left-8 w-24 h-6 washi-tape-sage transform -rotate-2 rounded-xs flex items-center justify-center">
            <span className="text-[9px] font-mono text-emerald-900">SURPRISE TICKET</span>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-stone-400">SECRET SCRATCH CARD</span>
              <Gift className="w-5 h-5 text-rose-500" />
            </div>

            <h3 className="font-serif text-xl sm:text-2xl text-stone-800 mt-3 font-semibold">
              Today's Secret Scratch Note
            </h3>
            <p className="font-casual text-xs text-stone-500 mt-1">
              Tap or scratch the ticket below to uncover today's secret surprise!
            </p>

            {/* The Scratch Area */}
            <div className="mt-5 relative">
              <div className="w-full min-h-[120px] rounded-2xl p-4 bg-rose-50 border border-rose-200/80 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-casual text-rose-500 uppercase tracking-widest font-semibold">
                  SECRET COUPON
                </span>
                <p className="font-handwriting text-xl sm:text-2xl text-rose-900 font-bold mt-1">
                  "Valid for one romantic date night, all your favorite snacks & a long forehead kiss!"
                </p>
                <span className="text-[11px] font-casual text-rose-600 mt-1">
                  (No expiration date · Redeem anytime)
                </span>
              </div>

              {/* Scratch Cover */}
              {!isScratched && (
                <button
                  type="button"
                  onClick={handleScratch}
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-stone-300 via-stone-200 to-stone-400 hover:from-stone-200 hover:to-stone-300 cursor-pointer shadow-inner flex flex-col items-center justify-center transition-all p-4 text-center group"
                >
                  <Sparkles className="w-6 h-6 text-stone-600 group-hover:scale-110 transition-transform mb-1" />
                  <span className="font-casual text-sm font-semibold text-stone-700">
                    Tap to Scratch & Reveal 🎟️
                  </span>
                  <span className="text-[10px] font-mono text-stone-500 mt-0.5">
                    Click to peel silver foil
                  </span>
                </button>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-stone-400">
            <span>{isScratched ? 'Coupon Unlocked ✨' : 'Locked Mystery'}</span>
            {isScratched && (
              <button
                type="button"
                onClick={() => setIsScratched(false)}
                className="text-stone-500 hover:text-stone-800 underline font-casual cursor-pointer"
              >
                Hide again
              </button>
            )}
          </div>
        </div>
      </section>

      {/* "Open When..." Letters Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-2xl text-stone-800 font-semibold">
              "Open When..." Letters 💌
            </h3>
            <p className="font-casual text-sm text-stone-500">
              For whatever you are feeling right now — click to open.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {openWhenLetters.map((letter) => (
            <button
              key={letter.id}
              type="button"
              onClick={() => {
                playPopSound();
                setActiveLetter({ title: letter.title, content: letter.content });
              }}
              className="bg-white rounded-2xl border border-stone-200 p-5 text-left hover:border-rose-300 hover:shadow-sm transition-all duration-200 group flex flex-col justify-between h-44 cursor-pointer"
            >
              <div>
                <span className="text-2xl mb-2 inline-block group-hover:scale-110 transition-transform">
                  ✉️
                </span>
                <h4 className="font-serif text-base font-semibold text-stone-800 group-hover:text-rose-700 transition-colors line-clamp-2">
                  {letter.title}
                </h4>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-stone-100 text-xs text-stone-500">
                <span className="font-casual">{letter.tag}</span>
                <span className="font-casual text-rose-600 group-hover:translate-x-1 transition-transform">
                  Read letter →
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Modal for viewing an "Open When" Letter */}
      {activeLetter && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFDF9] rounded-3xl border border-[#E5DAC6] max-w-md w-full p-6 sm:p-8 shadow-xl relative animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200/80 mb-4">
              <span className="font-casual text-xs text-rose-600 uppercase font-semibold">
                💌 A letter from {senderName || 'Your Love'}
              </span>
              <button
                type="button"
                onClick={() => setActiveLetter(null)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center text-sm font-semibold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <h4 className="font-serif text-xl text-stone-800 font-bold mb-3">
              {activeLetter.title}
            </h4>

            <div className="bg-lined-paper rounded-xl p-5 border border-stone-200 text-stone-700 font-handwriting text-xl leading-relaxed">
              {activeLetter.content}
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveLetter(null)}
                className="px-4 py-2 bg-stone-900 text-stone-100 rounded-xl text-xs font-casual hover:bg-stone-800 cursor-pointer"
              >
                Close Letter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
