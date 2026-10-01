import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { WaxSeal, PostageStamp, HeartDoodle, StarDoodle, SparkleDoodle } from './Doodles';
import { playSparkleSound, playPopSound, lofiPlayer } from '../utils/audio';
import { Music, VolumeX, Heart, Sparkles, ArrowRight } from 'lucide-react';

interface IntroScreenProps {
  onEnter: () => void;
  boyfriendName: string;
  senderName: string;
  isPlayingMusic: boolean;
  toggleMusic: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({
  onEnter,
  boyfriendName,
  senderName,
  isPlayingMusic,
  toggleMusic,
}) => {
  const [isUnsealed, setIsUnsealed] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  const handleUnseal = () => {
    if (!isUnsealed) {
      setIsUnsealed(true);
      playSparkleSound();

      // Subtle, controlled celebratory confetti (gentle and tasteful)
      confetti({
        particleCount: 26,
        spread: 55,
        origin: { y: 0.65 },
        colors: ['#FB7185', '#FDA4AF', '#FDE68A', '#DDD6FE'],
        disableForReducedMotion: true,
      });

      // Auto start music gently if not playing yet
      if (!isPlayingMusic) {
        lofiPlayer.start(0);
        toggleMusic();
      }

      setTimeout(() => {
        setShowLetter(true);
      }, 500);
    }
  };

  const handleEnterWebsite = () => {
    playPopSound();
    confetti({
      particleCount: 30,
      spread: 65,
      origin: { y: 0.5 },
      colors: ['#E11D48', '#FB7185', '#FDE68A', '#C4B5FD'],
      disableForReducedMotion: true,
    });
    onEnter();
  };

  return (
    <div className="relative min-h-screen w-full bg-[#EAF6FF] bg-scrapbook-canvas flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden select-none">
      {/* Subtle background ambient pastel accents */}
      <div className="absolute top-10 left-10 sm:top-16 sm:left-20 pointer-events-none opacity-80">
        <HeartDoodle className="w-9 h-9 text-[#FFDDE8] transform -rotate-12" />
      </div>
      <div className="absolute top-20 right-12 sm:top-24 sm:right-28 pointer-events-none opacity-80">
        <SparkleDoodle className="w-8 h-8 text-[#E9DEFF] transform rotate-6" />
      </div>
      <div className="absolute bottom-14 right-10 sm:bottom-20 sm:right-24 pointer-events-none opacity-80">
        <StarDoodle className="w-8 h-8 text-[#FFF4B8] transform rotate-12" />
      </div>
      <div className="absolute bottom-16 left-12 sm:bottom-24 sm:left-24 pointer-events-none opacity-80">
        <HeartDoodle className="w-7 h-7 text-[#DDF7E8] transform rotate-45" />
      </div>

      {/* Top Header Controls */}
      <header className="absolute top-5 left-4 right-4 flex items-center justify-between max-w-4xl mx-auto z-20">
        <div className="flex items-center gap-2 px-3 py-1 bg-white/90 backdrop-blur-xs rounded-full border border-[#CCE5F8] text-[#24324A] text-xs font-handwriting shadow-2xs">
          <span className="inline-block w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span>Priority Express Delivery · For Your Eyes Only</span>
        </div>

        <button
          type="button"
          onClick={toggleMusic}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#CCE5F8] shadow-2xs text-xs text-[#24324A] hover:bg-white hover:border-blue-300 transition-colors cursor-pointer"
          title="Toggle gentle background music"
        >
          {isPlayingMusic ? (
            <>
              <Music className="w-3.5 h-3.5 text-rose-500 animate-spin" style={{ animationDuration: '4s' }} />
              <span className="font-sans text-xs font-semibold text-[#24324A]">Lo-Fi Playing</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-stone-400" />
              <span className="font-sans text-xs font-medium text-[#24324A]/70">Play Soundtrack</span>
            </>
          )}
        </button>
      </header>

      {/* Main Container - Exact Requested Hierarchy */}
      <main className="relative w-full max-w-lg mx-auto z-10 flex flex-col items-center mt-6 sm:mt-2">
        {/* 1. Small romantic label */}
        <div className="mb-2 text-center">
          <span className="inline-block px-3 py-1 bg-[#FFDDE8] border border-[#F5B4C9] rounded-full font-sans text-[#24324A] text-[11px] tracking-wider uppercase font-semibold shadow-2xs">
            {isUnsealed ? 'Seal Broken With Love ✨' : 'Special Surprise Delivery 💌'}
          </span>
        </div>

        {/* 2. Large elegant title */}
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#24324A] text-center tracking-tight">
          For My Favorite Person
        </h1>

        {/* 3. Short handwritten subtitle */}
        <p className="font-handwriting text-xl text-[#24324A]/80 text-center mt-1 mb-6">
          handmade with all my love, laughter & quiet memories ♡
        </p>

        {/* 4. Beautiful tactile envelope / letter interaction */}
        <div className="relative w-full bg-white rounded-3xl border border-[#CCE5F8] shadow-[0_16px_40px_rgba(36,50,74,0.08)] p-6 sm:p-8 overflow-hidden transition-all duration-500">
          {/* Subtle vintage air mail stitching header */}
          <div
            className="absolute top-0 left-0 right-0 h-2 opacity-90"
            style={{
              background: 'repeating-linear-gradient(45deg, #FFB8CF, #FFB8CF 12px, #FFFFFF 12px, #FFFFFF 18px, #93C5FD 18px, #93C5FD 30px, #FFFFFF 30px, #FFFFFF 36px)',
            }}
          />

          {/* Postal Stamps & Postmark Header */}
          <div className="flex items-start justify-between gap-4 mt-2 mb-6">
            {/* Postmark stamp */}
            <div className="border border-[#CCE5F8] bg-[#EAF6FF]/60 rounded-full w-20 h-20 p-1 flex flex-col items-center justify-center text-center opacity-90 transform -rotate-6 select-none shadow-2xs">
              <span className="text-[8px] font-sans font-bold tracking-widest uppercase text-[#24324A]/70">AIR MAIL</span>
              <span className="text-xs font-serif font-bold text-rose-600">SPECIAL</span>
              <span className="text-[7px] font-mono text-[#24324A]/50">NO. 1004</span>
            </div>

            {/* Postage Stamps */}
            <div className="flex items-center gap-2">
              <PostageStamp label="SWEETHEART" price="100%" color="pink" />
              <div className="hidden xs:block">
                <PostageStamp label="CERTIFIED" price="NO. 1" color="yellow" />
              </div>
            </div>
          </div>

          {/* Address label */}
          <div className="bg-[#FFFDF0] border border-[#FCEBB0] rounded-2xl p-4 sm:p-5 shadow-2xs mb-6 relative">
            <div className="absolute -top-3 left-4 px-2.5 py-0.5 bg-white text-[10px] font-mono font-semibold tracking-wider uppercase text-[#24324A] rounded-full border border-[#CCE5F8] shadow-2xs">
              RECIPIENT & SENDER
            </div>

            <div className="space-y-2.5 mt-1">
              <div className="flex items-baseline gap-2">
                <span className="font-sans text-xs font-semibold text-[#24324A]/60 w-12">TO:</span>
                <span className="font-handwriting text-2xl font-bold text-[#24324A] border-b border-dashed border-[#F5B4C9] flex-1 pb-0.5">
                  {boyfriendName || 'My Favorite Boy'}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-sans text-xs font-semibold text-[#24324A]/60 w-12">FROM:</span>
                <span className="font-handwriting text-xl text-[#24324A] font-bold border-b border-dashed border-[#CCE5F8] flex-1 pb-0.5">
                  {senderName || 'Your Girl'} 💕
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-sans text-xs font-semibold text-[#24324A]/50 w-12">NOTE:</span>
                <span className="font-serif italic text-xs sm:text-sm text-[#24324A]/80">
                  "Handle with lots of hugs, smiles, and warm coffee."
                </span>
              </div>
            </div>
          </div>

          {/* Wax Seal Action Area */}
          {!showLetter ? (
            <div className="flex flex-col items-center justify-center py-4 text-center">
              <div className="relative">
                <WaxSeal onClick={handleUnseal} isOpened={isUnsealed} />
                {!isUnsealed && (
                  <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap font-handwriting text-base font-bold text-[#24324A] animate-bounce bg-[#FFF4B8] px-3 py-0.5 rounded-full border border-[#EBD668] shadow-2xs">
                    Tap the seal to open 👆
                  </span>
                )}
              </div>
              <p className="mt-8 text-xs font-sans text-[#24324A]/70 max-w-xs">
                {isUnsealed ? 'Unfolding our story...' : 'Inside you will find our songs, polaroids, a quiz, and sweet surprises.'}
              </p>
            </div>
          ) : (
            /* Revealed Letter Inside */
            <div className="bg-[#FFFDF0] rounded-2xl border border-[#FCEBB0] p-5 sm:p-6 shadow-xs space-y-4 animate-in fade-in zoom-in-95 duration-500">
              <div className="flex items-center justify-between border-b border-amber-200/60 pb-2">
                <span className="font-sans text-xs font-semibold text-[#24324A] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Envelope Unsealed
                </span>
                <span className="text-[11px] font-mono text-[#24324A]/50">Ready for you</span>
              </div>

              <div className="font-serif text-sm text-[#24324A] leading-relaxed space-y-2">
                <p>
                  Hey <strong className="font-handwriting text-xl text-rose-600">{boyfriendName || 'Handsome'}</strong>,
                </p>
                <p className="text-xs sm:text-sm text-[#24324A]/85">
                  I wanted to build something personal, playful, and nostalgic that belongs just to us.
                  A digital keepsake box of our favorite moments, little jokes, songs that remind me of you, and a few surprises.
                </p>
                <p className="font-handwriting text-xl text-[#24324A] font-bold">
                  Are you ready to step inside our little scrapbook world?
                </p>
              </div>

              {/* 5. Clear primary CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={handleEnterWebsite}
                  className="w-full sm:flex-1 py-3 px-6 bg-[#24324A] hover:bg-[#1A2538] active:scale-95 text-white font-sans text-sm font-semibold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Step Inside Our World</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsUnsealed(false)}
                  className="w-full sm:w-auto py-2.5 px-4 text-xs font-sans font-medium text-[#24324A]/70 hover:text-[#24324A] hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                >
                  Re-seal
                </button>
              </div>
            </div>
          )}

          {/* Direct fast-track jump button if already unsealed */}
          <div className="mt-4 pt-3 border-t border-dashed border-[#CCE5F8] flex items-center justify-between text-xs text-[#24324A]/60">
            <span className="font-sans text-[11px]">Special Surprise Edition</span>
            <button
              type="button"
              onClick={handleEnterWebsite}
              className="text-[#24324A] hover:text-blue-600 font-sans font-medium underline underline-offset-2 transition-colors cursor-pointer"
            >
              Skip directly to scrapbook →
            </button>
          </div>
        </div>

        {/* Floating sweet quote */}
        <p className="mt-6 font-handwriting text-lg text-[#24324A]/80 text-center flex items-center justify-center gap-1.5">
          <Heart className="w-4 h-4 text-rose-400 fill-rose-300" />
          <span>"Every love story is beautiful, but ours is my favorite."</span>
        </p>
      </main>
    </div>
  );
};
