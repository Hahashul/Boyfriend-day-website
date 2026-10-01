import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { HeartDoodle, ArrowDoodle } from './Doodles';
import { playPopSound, playSparkleSound } from '../utils/audio';
import { NavSection } from './Navbar';
import { Heart, Sparkles, Clock, Award, Gift, ArrowRight } from 'lucide-react';

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
      // Controlled, subtle celebratory sparkle
      confetti({
        particleCount: 22,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#FB7185', '#FDE68A', '#DDD6FE'],
        disableForReducedMotion: true,
      });
    }
  };

  const openWhenLetters = [
    {
      id: 'miss-me',
      title: 'Open when you miss me...',
      tag: 'Lonely Nights',
      cardBg: 'bg-[#FFDDE8]/40 border-[#F5B4C9] hover:border-rose-400',
      badge: 'bg-white text-[#24324A] border border-[#F5B4C9]/70',
      content:
        "Close your eyes and take a deep breath. Imagine me wrapping my arms around you right now and resting my head on your chest. Distance means so little when someone means so much. Text me a random silly emoji and I will know it's you missing me! Always yours.",
    },
    {
      id: 'tired-day',
      title: 'Open when you had a tiring day...',
      tag: 'Exhausted',
      cardBg: 'bg-[#FFF4B8]/40 border-[#F2DE79] hover:border-amber-400',
      badge: 'bg-white text-[#24324A] border border-[#F2DE79]/70',
      content:
        "You worked so hard today, and I am endlessly proud of you. Kick your shoes off, drink a big glass of water, and leave the stress at the door. You are doing amazing, and you are my biggest hero. Sending you a million warm hugs and forehead kisses.",
    },
    {
      id: 'cant-sleep',
      title: 'Open when you can\'t sleep...',
      tag: 'Late Hours',
      cardBg: 'bg-[#E9DEFF]/40 border-[#D0BDFF] hover:border-purple-400',
      badge: 'bg-white text-[#24324A] border border-[#D0BDFF]/70',
      content:
        "If you're staring at the ceiling in the dark, know that I'm probably dreaming of you right now. Put on our cassette tape in the music tab, listen to the gentle chords, and think of our funniest date. May you have the sweetest dreams tonight.",
    },
    {
      id: 'need-love',
      title: 'Open when you need a reminder of love...',
      tag: 'Gentle Reminder',
      cardBg: 'bg-[#DDF7E8]/40 border-[#A7E9C1] hover:border-emerald-400',
      badge: 'bg-white text-[#24324A] border border-[#A7E9C1]/70',
      content:
        "In case no one reminded you today: you are my safe place, my best friend, and my whole heart. Loving you is the easiest and most natural thing I have ever done. You are irreplaceable to me.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
      {/* Hero Welcome Banner in Baby Yellow Scrapbook Accent */}
      <section className="relative bg-[#FFF4B8]/40 rounded-3xl border border-[#F2DE79] p-6 sm:p-10 shadow-[0_8px_24px_rgba(36,50,74,0.05)] overflow-hidden">
        {/* Washi tape on corner */}
        <div className="absolute -top-3 left-10 w-28 h-7 washi-tape-pink transform -rotate-2 rounded-xs flex items-center justify-center">
          <span className="text-[10px] font-mono font-semibold text-[#24324A] tracking-wider uppercase">CHAPTER 01</span>
        </div>

        <div className="absolute top-6 right-6 hidden md:block opacity-70">
          <HeartDoodle className="w-12 h-12 text-[#FFDDE8]" />
        </div>

        <div className="max-w-2xl space-y-3 mt-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-[#F2DE79] text-[#24324A] font-sans text-xs font-semibold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Welcome to our shared digital keepsake</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-[#24324A] font-bold tracking-tight">
            Hi {boyfriendName || 'My Love'} {specialNickname ? `(${specialNickname})` : ''} 🤍
          </h1>

          <p className="font-serif text-[#24324A]/85 text-base sm:text-lg leading-relaxed">
            I built this little digital corner with my own hands to celebrate you, our laughter, the songs we share, and every small memory that makes my life so much brighter.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('memories')}
              className="px-5 py-2.5 bg-[#24324A] hover:bg-[#1A2538] active:scale-95 text-white rounded-xl font-sans text-sm font-semibold shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>See Our Memories</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('music')}
              className="px-4 py-2.5 bg-white border border-[#CCE5F8] hover:bg-[#EAF6FF] text-[#24324A] rounded-xl font-sans text-sm font-medium shadow-2xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Play Our Cassette</span>
            </button>
          </div>
        </div>
      </section>

      {/* 8. Relationship Countdown (Mint Green Section Background #DDF7E8) */}
      <section className="bg-[#DDF7E8]/70 rounded-3xl border border-[#A7E9C1] p-6 sm:p-8 text-center relative overflow-hidden shadow-2xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#A7E9C1] rounded-full text-xs font-sans font-semibold text-[#24324A] mb-2 shadow-2xs">
          <Clock className="w-3.5 h-3.5 text-emerald-600" />
          <span>Counting every single second together</span>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl text-[#24324A] font-bold mt-1">
          We have been in love for...
        </h2>

        {/* The 4 Clean Metric Blocks with Numbers as Focus */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto mt-6">
          <div className="bg-white rounded-2xl border border-[#A7E9C1]/70 p-4 sm:p-5 shadow-2xs">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#24324A] tabular-nums">
              {timeTogether.days}
            </span>
            <div className="text-[11px] font-sans font-semibold text-[#24324A]/70 mt-1 uppercase tracking-wider">Days</div>
          </div>
          <div className="bg-white rounded-2xl border border-[#A7E9C1]/70 p-4 sm:p-5 shadow-2xs">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#24324A] tabular-nums">
              {timeTogether.hours}
            </span>
            <div className="text-[11px] font-sans font-semibold text-[#24324A]/70 mt-1 uppercase tracking-wider">Hours</div>
          </div>
          <div className="bg-white rounded-2xl border border-[#A7E9C1]/70 p-4 sm:p-5 shadow-2xs">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#24324A] tabular-nums">
              {timeTogether.minutes}
            </span>
            <div className="text-[11px] font-sans font-semibold text-[#24324A]/70 mt-1 uppercase tracking-wider">Minutes</div>
          </div>
          <div className="bg-white rounded-2xl border border-[#A7E9C1]/70 p-4 sm:p-5 shadow-2xs">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-rose-600 tabular-nums">
              {timeTogether.seconds}
            </span>
            <div className="text-[11px] font-sans font-semibold text-[#24324A]/70 mt-1 uppercase tracking-wider">Seconds</div>
          </div>
        </div>

        <p className="font-handwriting text-xl text-[#24324A] font-bold mt-4">
          ...and I'd still choose you in every lifetime. ♡
        </p>
      </section>

      {/* 9. Certificate + Scratch Card (Unified Keepsakes with Yellow & Lavender Accents) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Certificate Card */}
        <div className="bg-white rounded-3xl border border-dashed border-[#F2DE79] p-6 sm:p-7 relative shadow-2xs flex flex-col justify-between">
          <div className="absolute -top-3 right-8 w-26 h-6 washi-tape-yellow transform rotate-1 rounded-xs flex items-center justify-center">
            <span className="text-[9px] font-mono font-semibold text-[#24324A]">VERIFIED OFFICIAL</span>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#24324A]/50 uppercase">NO. 2026-BF-01</span>
              <Award className="w-5 h-5 text-amber-500" />
            </div>

            <h3 className="font-serif text-xl sm:text-2xl text-[#24324A] mt-3 font-bold">
              Official Best Boyfriend Certificate
            </h3>

            <p className="font-sans text-xs text-[#24324A]/70 mt-1">
              Presented to: <strong className="text-[#24324A] font-semibold">{boyfriendName || 'You'}</strong>
            </p>

            <div className="mt-4 space-y-2.5 border-t border-b border-[#F2DE79]/40 py-3.5 text-xs sm:text-sm font-serif text-[#24324A]">
              <div className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✓</span>
                <span>Unlimited warm hugs & back scratches on demand</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✓</span>
                <span>Pardon for stealing my food or fries</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✓</span>
                <span>Permanent VIP residency inside my heart</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✓</span>
                <span>Entitled to endless love and affection</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-2 flex items-center justify-between text-xs text-[#24324A]/70 font-handwriting text-base">
            <span>Signed with love,</span>
            <span className="font-bold text-[#24324A] text-lg border-b border-[#F5B4C9] pb-0.5">
              {senderName || 'Your Girlfriend'}
            </span>
          </div>
        </div>

        {/* Secret Love Scratch-Off Card in Soft Lavender Accent */}
        <div className="bg-white rounded-3xl border border-[#D0BDFF] p-6 sm:p-7 relative shadow-2xs flex flex-col justify-between">
          <div className="absolute -top-3 left-8 w-26 h-6 washi-tape-lavender transform -rotate-1 rounded-xs flex items-center justify-center">
            <span className="text-[9px] font-mono font-semibold text-[#24324A]">SURPRISE TICKET</span>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#24324A]/50 uppercase">SECRET SCRATCH CARD</span>
              <Gift className="w-5 h-5 text-purple-500" />
            </div>

            <h3 className="font-serif text-xl sm:text-2xl text-[#24324A] mt-3 font-bold">
              Today's Secret Scratch Note
            </h3>
            <p className="font-sans text-xs text-[#24324A]/70 mt-1">
              Tap or scratch the ticket below to uncover today's secret surprise!
            </p>

            {/* The Scratch Area */}
            <div className="mt-5 relative">
              <div className="w-full min-h-[120px] rounded-2xl p-4 bg-[#FFDDE8]/60 border border-[#F5B4C9] flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-sans text-[#24324A] uppercase tracking-widest font-bold">
                  SECRET COUPON
                </span>
                <p className="font-handwriting text-2xl text-[#24324A] font-bold mt-1">
                  "Valid for one romantic date night, all your favorite snacks & a long forehead kiss!"
                </p>
                <span className="text-[11px] font-sans text-[#24324A]/80 mt-1">
                  (No expiration date · Redeem anytime)
                </span>
              </div>

              {/* Scratch Cover in Warm Foil Texture */}
              {!isScratched && (
                <button
                  type="button"
                  onClick={handleScratch}
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-stone-200 via-stone-100 to-stone-300 hover:from-stone-100 hover:to-stone-200 cursor-pointer shadow-inner flex flex-col items-center justify-center transition-all p-4 text-center group border border-stone-200"
                >
                  <Sparkles className="w-5 h-5 text-stone-600 group-hover:scale-110 transition-transform mb-1" />
                  <span className="font-sans text-xs font-semibold text-[#24324A]">
                    Tap to Scratch & Reveal 🎟️
                  </span>
                  <span className="text-[10px] font-mono text-stone-500 mt-0.5">
                    Click to peel silver foil
                  </span>
                </button>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-[#24324A]/60 font-sans">
            <span>{isScratched ? 'Coupon Unlocked ✨' : 'Locked Mystery'}</span>
            {isScratched && (
              <button
                type="button"
                onClick={() => setIsScratched(false)}
                className="text-[#24324A] hover:underline font-sans cursor-pointer text-xs font-semibold"
              >
                Hide again
              </button>
            )}
          </div>
        </div>
      </section>

      {/* "Open When..." Letters Section */}
      <section className="space-y-4">
        <div>
          <h3 className="font-serif text-2xl text-[#24324A] font-bold">
            "Open When..." Letters 💌
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#24324A]/70 mt-0.5">
            For whatever you are feeling right now — click to open.
          </p>
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
              className={`rounded-2xl border ${letter.cardBg} p-5 text-left transition-all duration-200 group flex flex-col justify-between h-44 cursor-pointer shadow-2xs hover:shadow-xs hover:-translate-y-0.5`}
            >
              <div>
                <span className="text-2xl mb-2 inline-block group-hover:scale-110 transition-transform">
                  ✉️
                </span>
                <h4 className="font-serif text-base font-bold text-[#24324A] group-hover:text-blue-700 transition-colors line-clamp-2">
                  {letter.title}
                </h4>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-black/5 text-xs">
                <span className={`font-sans px-2 py-0.5 rounded-md text-[11px] font-medium shadow-2xs ${letter.badge}`}>
                  {letter.tag}
                </span>
                <span className="font-sans font-semibold text-[#24324A] group-hover:translate-x-1 transition-transform">
                  Read →
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Modal for viewing an "Open When" Letter */}
      {activeLetter && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#CCE5F8] max-w-md w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#EAF6FF] mb-4">
              <span className="font-sans text-xs text-[#24324A] uppercase font-semibold">
                💌 A letter from {senderName || 'Your Love'}
              </span>
              <button
                type="button"
                onClick={() => setActiveLetter(null)}
                className="w-8 h-8 rounded-full bg-[#EAF6FF] hover:bg-stone-200 text-[#24324A] flex items-center justify-center text-sm font-semibold cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            <h4 className="font-serif text-xl text-[#24324A] font-bold mb-3">
              {activeLetter.title}
            </h4>

            <div className="bg-lined-paper-pink rounded-2xl p-5 border border-[#F5B4C9] text-[#24324A] font-handwriting text-2xl leading-relaxed shadow-inner">
              {activeLetter.content}
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveLetter(null)}
                className="px-4 py-2 bg-[#24324A] hover:bg-[#1A2538] text-white rounded-xl text-xs font-sans font-medium cursor-pointer transition-colors"
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
