import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { PostageStamp, StarDoodle, SparkleDoodle } from './Doodles';
import { playSparkleSound, playPopSound, lofiPlayer } from '../utils/audio';
import { Music, VolumeX, Sparkles, ArrowRight, Loader2 } from 'lucide-react';

interface IntroScreenProps {
  onEnter: () => void;
  boyfriendName: string;
  senderName: string;
  isPlayingMusic: boolean;
  toggleMusic: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({
  onEnter,
  isPlayingMusic,
  toggleMusic,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingMessages = [
    'Loading 2 years of memories…',
    'Locating the famous white hoodie…',
    'Petting every stray dog along the way…',
    'Ordering hot chicken rolls & cold Red Bull…',
    'Queuing up Nepali songs on the cassette…',
    'Almost ready for you, Abhi…'
  ];

  const handleStartExperience = () => {
    playSparkleSound();
    setIsLoading(true);

    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#FFE66D', '#9FE8C1', '#FF9FC4', '#C9B5FF', '#BFE8FF'],
      disableForReducedMotion: true,
    });

    if (!isPlayingMusic) {
      lofiPlayer.start(0);
      toggleMusic();
    }

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < loadingMessages.length) {
        setLoadingStep(step);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          playPopSound();
          onEnter();
        }, 400);
      }
    }, 450);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#BFE8FF] bg-scrapbook-canvas flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden select-none">
      {/* Background doodle accents */}
      <div className="absolute top-10 left-10 sm:top-16 sm:left-20 pointer-events-none opacity-80">
        <SparkleDoodle className="w-9 h-9 text-[#FFE66D] transform -rotate-12" />
      </div>
      <div className="absolute top-20 right-12 sm:top-24 sm:right-28 pointer-events-none opacity-80">
        <StarDoodle className="w-9 h-9 text-[#FF9FC4] transform rotate-6" />
      </div>
      <div className="absolute bottom-14 right-10 sm:bottom-20 sm:right-24 pointer-events-none opacity-85">
        <SparkleDoodle className="w-10 h-10 text-[#C9B5FF] transform rotate-12" />
      </div>
      <div className="absolute bottom-16 left-12 sm:bottom-24 sm:left-24 pointer-events-none opacity-85">
        <StarDoodle className="w-8 h-8 text-[#9FE8C1] transform -rotate-45" />
      </div>

      {/* Top Header Controls */}
      <header className="absolute top-5 left-4 right-4 flex items-center justify-between max-w-4xl mx-auto z-20">
        <div className="flex items-center gap-2 px-3.5 py-1.5 bg-white/95 backdrop-blur-xs rounded-full border border-[#93D5FD] text-[#20304A] text-xs font-handwriting shadow-2xs font-bold">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
          <span>Boyfriend's Day Special Edition · 20 October 2024</span>
        </div>

        <button
          type="button"
          onClick={toggleMusic}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#93D5FD] shadow-2xs text-xs text-[#20304A] hover:bg-white hover:border-blue-400 transition-colors cursor-pointer"
          title="Toggle soundtrack"
        >
          {isPlayingMusic ? (
            <>
              <Music className="w-3.5 h-3.5 text-blue-700 animate-spin" style={{ animationDuration: '4s' }} />
              <span className="font-sans text-xs font-bold text-[#20304A]">Playing Mixtape</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-stone-400" />
              <span className="font-sans text-xs font-semibold text-[#20304A]/80">Play Music</span>
            </>
          )}
        </button>
      </header>

      {/* Main Landing / Loading Card */}
      <main className="relative w-full max-w-lg mx-auto z-10 flex flex-col items-center mt-8 sm:mt-4">
        {!isLoading ? (
          <div className="w-full bg-white rounded-3xl border border-[#93D5FD] shadow-[0_16px_40px_rgba(32,48,74,0.12)] p-6 sm:p-9 relative overflow-hidden transition-all duration-500">
            {/* Washi tape on top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-40 h-6 washi-tape-yellow transform -rotate-1 rounded-xs flex items-center justify-center">
              <span className="text-[10px] font-mono font-bold text-[#20304A] tracking-wider uppercase">
                OCTOBER 20, 2024
              </span>
            </div>

            {/* Header stamp */}
            <div className="flex items-start justify-between gap-4 mt-2 mb-4">
              <div className="border border-[#93D5FD] bg-[#BFE8FF]/40 rounded-2xl px-3 py-2 flex flex-col items-start select-none shadow-2xs">
                <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-[#20304A]/70">DESTINATION</span>
                <span className="text-xs font-serif font-bold text-[#20304A]">Abhinab P Kashyap</span>
                <span className="text-[8px] font-mono text-[#20304A]/60 font-bold">FROM: PARINA</span>
              </div>

              <div className="flex items-center gap-2">
                <PostageStamp label="BOYFRIEND" price="NO. 1" color="sky" />
                <div className="hidden xs:block">
                  <PostageStamp label="CERTIFIED" price="100%" color="yellow" />
                </div>
              </div>
            </div>

            {/* Core Titles */}
            <div className="text-center my-6 space-y-2">
              <div className="inline-block px-3 py-1 bg-[#9FE8C1] border border-[#9FE8C1] rounded-full font-sans text-xs font-bold text-[#20304A] uppercase tracking-wider mb-1">
                A Surprise For You
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#20304A] tracking-tight">
                Happy Boyfriend's Day, Abhi
              </h1>

              <p className="font-handwriting text-2xl text-[#20304A]/90 mt-2 font-bold">
                "Because you deserve more than just a text."
              </p>
            </div>

            {/* Letter snippet / preview */}
            <div className="bg-[#FFFDF0] rounded-2xl border border-[#FFE66D] p-4 text-center my-5 shadow-2xs">
              <p className="font-serif text-xs sm:text-sm text-[#20304A]/90 leading-relaxed italic">
                From that first night at the club to cold Darjeeling mornings, McDonald's McSpicy dates, and endless inside jokes... here is our story so far.
              </p>
              <div className="mt-2 text-[12px] font-handwriting text-[#20304A] font-bold text-right pr-2">
                — made with love by Parina
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleStartExperience}
                className="w-full py-3.5 px-6 bg-[#20304A] hover:bg-[#152033] active:scale-95 text-white font-sans text-sm sm:text-base font-bold rounded-2xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
                <span>Open Your Surprise</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Small note */}
            <p className="mt-4 text-center text-[11px] font-sans text-[#20304A]/70 font-medium">
              Turn your sound up for the full nostalgic mixtape experience 🎧
            </p>
          </div>
        ) : (
          /* Playful loading screen */
          <div className="w-full bg-white rounded-3xl border border-[#93D5FD] shadow-[0_16px_40px_rgba(32,48,74,0.12)] p-8 sm:p-10 text-center space-y-6 animate-in fade-in duration-300">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#BFE8FF]/50 border border-[#93D5FD] flex items-center justify-center text-3xl shadow-2xs relative">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin absolute" />
              <span className="relative">✨</span>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-bold text-[#20304A]">
                {loadingMessages[loadingStep]}
              </h3>
              <p className="font-handwriting text-lg text-[#20304A]/80 font-bold">
                Unboxing two whole years of our memories...
              </p>
            </div>

            {/* Progress indicator bar */}
            <div className="w-full h-2.5 bg-[#BFE8FF]/60 rounded-full overflow-hidden border border-[#93D5FD]">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-[#FFE66D] to-[#FF9FC4] rounded-full transition-all duration-300"
                style={{
                  width: `${((loadingStep + 1) / loadingMessages.length) * 100}%`,
                }}
              />
            </div>

            <p className="text-[11px] font-mono text-[#20304A]/60 uppercase tracking-widest font-semibold">
              Please wait while Parina's scrapbook unfolds...
            </p>
          </div>
        )}

        <p className="mt-5 font-handwriting text-lg text-[#20304A]/80 text-center font-bold">
          for my favourite human · no returns accepted
        </p>
      </main>
    </div>
  );
};
