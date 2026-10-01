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

      // Launch romantic pastel heart confetti
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F43F5E', '#FDA4AF', '#FCD34D', '#F472B6', '#FEE2E2'],
      });

      // Auto start music gently if not playing yet
      if (!isPlayingMusic) {
        lofiPlayer.start(0);
        toggleMusic();
      }

      setTimeout(() => {
        setShowLetter(true);
      }, 550);
    }
  };

  const handleEnterWebsite = () => {
    playPopSound();
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#E11D48', '#FB7185', '#FBBF24', '#F472B6'],
    });
    onEnter();
  };

  return (
    <div className="relative min-h-screen w-full bg-notebook-grid flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden select-none">
      {/* Ambient decorative floating doodles */}
      <div className="absolute top-8 left-8 sm:top-14 sm:left-16 pointer-events-none opacity-60">
        <HeartDoodle className="w-8 h-8 text-rose-300 transform -rotate-12 animate-pulse" />
      </div>
      <div className="absolute top-12 right-10 sm:top-16 sm:right-24 pointer-events-none opacity-60">
        <StarDoodle className="w-7 h-7 text-amber-300 transform rotate-12" />
      </div>
      <div className="absolute bottom-16 left-12 sm:bottom-20 sm:left-24 pointer-events-none opacity-40">
        <SparkleDoodle className="w-6 h-6 text-rose-300" />
      </div>
      <div className="absolute bottom-12 right-12 sm:bottom-16 sm:right-20 pointer-events-none opacity-50">
        <HeartDoodle className="w-7 h-7 text-rose-400 transform rotate-45" />
      </div>

      {/* Top micro controls */}
      <header className="absolute top-4 left-4 right-4 flex items-center justify-between max-w-4xl mx-auto z-20">
        <div className="flex items-center gap-2 text-stone-600 text-xs sm:text-sm font-handwriting">
          <span className="inline-block w-2 h-2 rounded-full bg-rose-400 animate-ping" />
          <span>Special Express Delivery · Confidential</span>
        </div>

        <button
          type="button"
          onClick={toggleMusic}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-stone-200/80 shadow-sm text-xs text-stone-700 hover:bg-white hover:border-rose-300 transition-colors"
          title="Toggle romantic background music"
        >
          {isPlayingMusic ? (
            <>
              <Music className="w-3.5 h-3.5 text-rose-500 animate-spin" style={{ animationDuration: '4s' }} />
              <span className="font-casual text-xs">Lo-fi Playing</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-stone-400" />
              <span className="font-casual text-xs">Play Music</span>
            </>
          )}
        </button>
      </header>

      {/* Main Interactive Envelope Container */}
      <main className="relative w-full max-w-lg mx-auto z-10 flex flex-col items-center">
        {/* Envelope Top Header Tag */}
        <div className="mb-4 text-center">
          <span className="font-casual text-rose-600 text-xs tracking-wider uppercase font-semibold">
            {isUnsealed ? 'Seal Broken with Love' : 'Click the Wax Seal to Open'}
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-stone-800 mt-1">
            A Surprise For My Favorite Person
          </h1>
          <p className="font-handwriting text-lg text-stone-600 mt-0.5">
            handmade with all my love & silly memories ☕️✨
          </p>
        </div>

        {/* Vintage Postal Envelope Card */}
        <div className="relative w-full bg-[#FAF5EB] rounded-2xl border-2 border-[#E5DAC6] shadow-[0_12px_36px_rgba(140,115,85,0.12)] p-6 sm:p-8 overflow-hidden transition-all duration-500">
          {/* Air Mail Strip Top & Bottom Border Pattern */}
          <div
            className="absolute top-0 left-0 right-0 h-2 opacity-75"
            style={{
              background: 'repeating-linear-gradient(45deg, #EF4444, #EF4444 14px, #FAF5EB 14px, #FAF5EB 20px, #3B82F6 20px, #3B82F6 34px, #FAF5EB 34px, #FAF5EB 40px)',
            }}
          />

          {/* Postal Stamps & Postmark Header */}
          <div className="flex items-start justify-between gap-4 mt-2 mb-6">
            {/* Postmark stamp */}
            <div className="border border-stone-300 rounded-full w-20 h-20 p-1 flex flex-col items-center justify-center text-center opacity-70 transform -rotate-6 select-none">
              <span className="text-[8px] font-sans font-semibold tracking-widest uppercase text-stone-500">LOVE POST</span>
              <span className="text-xs font-serif font-bold text-rose-700">OCT 01</span>
              <span className="text-[7px] font-mono text-stone-400">PRIORITY 1004</span>
            </div>

            {/* Postage Stamps */}
            <div className="flex items-center gap-2">
              <PostageStamp label="SWEETHEART" price="100%" />
            </div>
          </div>

          {/* Address label */}
          <div className="bg-white/90 border border-stone-200/90 rounded-xl p-4 sm:p-5 shadow-inner mb-6 relative">
            <div className="absolute -top-3 left-4 px-2 py-0.5 bg-[#FAF5EB] text-[10px] font-mono tracking-wider uppercase text-stone-500 rounded border border-stone-200">
              RECIPIENT & SENDER
            </div>

            <div className="space-y-2 mt-1">
              <div className="flex items-baseline gap-2">
                <span className="font-casual text-xs text-stone-400 w-12">TO:</span>
                <span className="font-handwriting text-xl sm:text-2xl font-bold text-stone-800 border-b border-dashed border-rose-300 flex-1 pb-0.5">
                  {boyfriendName || 'My Favorite Boy'}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-casual text-xs text-stone-400 w-12">FROM:</span>
                <span className="font-handwriting text-lg sm:text-xl text-rose-700 border-b border-dashed border-stone-200 flex-1 pb-0.5">
                  {senderName || 'Your Girl'} 💕
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-casual text-xs text-stone-400 w-12">NOTE:</span>
                <span className="font-serif italic text-xs sm:text-sm text-stone-600">
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
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-casual text-xs text-stone-500 animate-bounce">
                    Tap seal to open 👆
                  </span>
                )}
              </div>
              <p className="mt-8 text-xs font-casual text-stone-500 max-w-xs">
                {isUnsealed ? 'Unfolding our story...' : 'This parcel contains our songs, memories, a quiz, and sweet surprises.'}
              </p>
            </div>
          ) : (
            /* Revealed Letter Inside */
            <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm space-y-4 animate-in fade-in zoom-in-95 duration-500">
              <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                <span className="font-casual text-xs text-rose-500 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Envelope Unsealed
                </span>
                <span className="text-[11px] font-mono text-stone-400">Ready for you</span>
              </div>

              <div className="font-serif text-sm text-stone-700 leading-relaxed space-y-2">
                <p>
                  Hey <strong className="font-handwriting text-lg text-rose-700">{boyfriendName || 'Handsome'}</strong>,
                </p>
                <p className="text-xs sm:text-sm text-stone-600">
                  I wanted to build something personal, playful, and nostalgic that belongs just to us.
                  A digital keepsake box of our favorite moments, little jokes, songs that remind me of you, and a few surprises.
                </p>
                <p className="font-handwriting text-lg text-stone-800">
                  Are you ready to step inside our little scrapbook world?
                </p>
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={handleEnterWebsite}
                  className="w-full sm:flex-1 py-3 px-5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-casual text-base font-semibold rounded-xl shadow-md shadow-rose-200 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Step Inside Our World</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsUnsealed(false)}
                  className="w-full sm:w-auto py-2.5 px-4 text-xs font-casual text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                >
                  Re-seal
                </button>
              </div>
            </div>
          )}

          {/* Direct fast-track jump button if user already unsealed previously */}
          <div className="mt-4 pt-3 border-t border-dashed border-stone-200/80 flex items-center justify-between text-xs text-stone-400">
            <span className="font-casual text-[11px]">Special Surprise Edition</span>
            <button
              type="button"
              onClick={handleEnterWebsite}
              className="text-stone-500 hover:text-rose-600 font-casual underline underline-offset-2 transition-colors cursor-pointer"
            >
              Skip directly to scrapbook →
            </button>
          </div>
        </div>

        {/* Floating sweet quote */}
        <p className="mt-6 font-handwriting text-base sm:text-lg text-stone-500 text-center flex items-center justify-center gap-1.5">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-300" />
          <span>"Every love story is beautiful, but ours is my favorite."</span>
        </p>
      </main>
    </div>
  );
};
