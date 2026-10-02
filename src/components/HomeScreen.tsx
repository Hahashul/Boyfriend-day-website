import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { playPopSound, playSparkleSound } from '../utils/audio';
import { Sparkles, Award, Gift } from 'lucide-react';
import { SurpriseWheel } from './SurpriseWheel';
import { HOME, PARTNER, SENDER, ANNIVERSARY_DATE } from './Content';

export const HomeScreen: React.FC = () => {
  const anniversaryDate = ANNIVERSARY_DATE;
  const { certificate, scratchCard } = HOME;
  // Live duration counter
  const [timeTogether, setTimeTogether] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Scratch card state
  const [isScratched, setIsScratched] = useState(false);

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
        particleCount: 30,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#FFE66D', '#FF9FC4', '#C9B5FF', '#9FE8C1'],
        disableForReducedMotion: true,
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
      {/* ======================================================== */}
      {/* 1. HOME CONTENT                                          */}
      {/* ======================================================== */}

      {/* Relationship Countdown Section */}
      <section className="bg-white/90 rounded-3xl border border-[#9FE8C1] p-6 sm:p-8 text-center relative overflow-hidden shadow-sm">
        <h2 className="font-serif text-2xl sm:text-3xl text-[#20304A] font-bold">
          {HOME.counterTitle}
        </h2>

        {/* 4 Clean Metric Blocks with Numbers as Focus */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto mt-6">
          <div className="bg-[#BFE8FF]/40 rounded-2xl border border-[#93D5FD] p-4 sm:p-5 shadow-2xs">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#20304A] tabular-nums">
              {timeTogether.days}
            </span>
            <div className="text-[11px] font-sans font-bold text-[#20304A]/70 mt-1 uppercase tracking-wider">{HOME.counterLabels.days}</div>
          </div>
          <div className="bg-[#FFE66D]/35 rounded-2xl border border-[#FFE66D] p-4 sm:p-5 shadow-2xs">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#20304A] tabular-nums">
              {timeTogether.hours}
            </span>
            <div className="text-[11px] font-sans font-bold text-[#20304A]/70 mt-1 uppercase tracking-wider">{HOME.counterLabels.hours}</div>
          </div>
          <div className="bg-[#9FE8C1]/35 rounded-2xl border border-[#9FE8C1] p-4 sm:p-5 shadow-2xs">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#20304A] tabular-nums">
              {timeTogether.minutes}
            </span>
            <div className="text-[11px] font-sans font-bold text-[#20304A]/70 mt-1 uppercase tracking-wider">{HOME.counterLabels.minutes}</div>
          </div>
          <div className="bg-[#FF9FC4]/35 rounded-2xl border border-[#FF9FC4] p-4 sm:p-5 shadow-2xs">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-rose-600 tabular-nums">
              {timeTogether.seconds}
            </span>
            <div className="text-[11px] font-sans font-bold text-[#20304A]/70 mt-1 uppercase tracking-wider">{HOME.counterLabels.seconds}</div>
          </div>
        </div>

        <p className="font-handwriting text-2xl text-[#20304A] font-bold mt-4">
          {HOME.counterFooter}
        </p>
      </section>

      {/* 2-Column Keepsake Cards: Official Best Boyfriend Certificate & Secret Scratch Card */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch w-full">
        {/* 1. Official Best Boyfriend Certificate */}
        <div className="bg-white rounded-3xl border border-dashed border-[#FFE66D] p-6 sm:p-7 relative shadow-sm flex flex-col justify-between h-full">
          <div className="absolute -top-3 right-8 w-32 h-6 washi-tape-yellow transform rotate-1 rounded-xs flex items-center justify-center">
            <span className="text-[9px] font-mono font-bold text-[#20304A]">{certificate.tape}</span>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#20304A]/60 uppercase">{certificate.number}</span>
              <Award className="w-5 h-5 text-amber-500" />
            </div>

            <h3 className="font-serif text-xl sm:text-2xl text-[#20304A] mt-3 font-bold">
              {certificate.title}
            </h3>

            <p className="font-sans text-xs text-[#20304A]/80 mt-1">
              {certificate.presentedTo} <strong className="text-[#20304A] font-bold">{PARTNER.fullName}</strong>
            </p>

            <div className="mt-4 space-y-2.5 border-t border-b border-[#FFE66D]/60 py-3.5 text-xs sm:text-sm font-serif text-[#20304A]">
              {certificate.perks.map((perk, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✓</span>
                  <span>{perk}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-2 flex items-center justify-between text-xs text-[#20304A]/80 font-handwriting text-base">
            <span>{certificate.signedWith}</span>
            <span className="font-bold text-[#20304A] text-xl border-b-2 border-[#FF9FC4] pb-0.5">
              {SENDER.name}
            </span>
          </div>
        </div>

        {/* 2. Secret Scratch Card */}
        <div id="scratch-card" className="bg-white rounded-3xl border border-[#C9B5FF] p-6 sm:p-7 relative shadow-sm flex flex-col justify-between h-full">
          <div className="absolute -top-3 left-8 w-32 h-6 washi-tape-lavender transform -rotate-1 rounded-xs flex items-center justify-center">
            <span className="text-[9px] font-mono font-bold text-[#20304A]">{scratchCard.tape}</span>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#20304A]/60 uppercase">{scratchCard.kicker}</span>
              <Gift className="w-5 h-5 text-purple-500" />
            </div>

            <h3 className="font-serif text-xl sm:text-2xl text-[#20304A] mt-3 font-bold">
              {scratchCard.title}
            </h3>
            <p className="font-sans text-xs text-[#20304A]/80 mt-1">
              {scratchCard.hint}
            </p>

            {/* The Scratch Area */}
            <div className="mt-4 relative">
              <div className="w-full min-h-[140px] rounded-2xl p-4 bg-[#FF9FC4]/25 border-2 border-dashed border-[#FF9FC4] flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-mono text-[#20304A] uppercase tracking-widest font-bold mb-1">
                  {scratchCard.youWon}
                </span>
                <p className="font-serif text-xl sm:text-2xl text-[#20304A] font-extrabold my-1">
                  {scratchCard.prize}
                </p>
                <div className="font-handwriting text-lg sm:text-xl text-[#20304A] font-bold leading-snug mt-1">
                  {scratchCard.prizeLines.map((line, i) => (
                    <React.Fragment key={i}>
                      {i > 0 && <br />}
                      {line}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Scratch Cover in Warm Foil Texture */}
              {!isScratched && (
                <button
                  type="button"
                  onClick={handleScratch}
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-stone-200 via-stone-100 to-stone-300 hover:from-stone-100 hover:to-stone-200 cursor-pointer shadow-inner flex flex-col items-center justify-center transition-all p-4 text-center group border border-stone-300"
                >
                  <Sparkles className="w-5 h-5 text-stone-600 group-hover:scale-110 transition-transform mb-1" />
                  <span className="font-sans text-xs font-bold text-[#20304A]">
                    {scratchCard.coverCta}
                  </span>
                  <span className="text-[10px] font-mono text-stone-600 mt-0.5">
                    {scratchCard.coverSub}
                  </span>
                </button>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-[#20304A]/70 font-sans">
            <span>{isScratched ? scratchCard.statusUnlocked : scratchCard.statusLocked}</span>
            {isScratched && (
              <button
                type="button"
                onClick={() => setIsScratched(false)}
                className="text-[#20304A] hover:underline font-sans cursor-pointer text-xs font-semibold"
              >
                {scratchCard.hideAgain}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. SURPRISE WHEEL                                        */}
      {/* ======================================================== */}
      <div id="surprise-wheel" className="max-w-2xl mx-auto w-full">
        <SurpriseWheel />
      </div>
    </div>
  );
};