import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { playSparkleSound, playHeartChime } from '../utils/audio';
import { WaxSeal, PostageStamp } from './Doodles';
import { Heart, Printer, Sparkles } from 'lucide-react';

interface FinalMessageProps {
  boyfriendName: string;
  senderName: string;
  anniversaryDate: string;
}

export const FinalMessage: React.FC<FinalMessageProps> = ({
  boyfriendName,
  senderName,
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [loveReplied, setLoveReplied] = useState(false);

  const handleReveal = () => {
    setIsRevealed(true);
    playSparkleSound();
    confetti({
      particleCount: 25,
      spread: 55,
      origin: { y: 0.55 },
      colors: ['#FB7185', '#FDA4AF', '#FDE68A'],
      disableForReducedMotion: true,
    });
  };

  const handleSendLoveBack = () => {
    setLoveReplied(true);
    playHeartChime();
    confetti({
      particleCount: 28,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#E11D48', '#FB7185', '#FDA4AF'],
      disableForReducedMotion: true,
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-1">
        <span className="inline-block px-3 py-1 bg-[#FFDDE8] border border-[#F5B4C9] rounded-full font-sans text-xs font-semibold uppercase text-[#24324A] tracking-wider shadow-2xs">
          From My Deepest Heart
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#24324A] font-bold tracking-tight">
          The Final Love Letter 💌
        </h2>
        <p className="font-handwriting text-xl text-[#24324A]/80">
          The words I want you to remember on good days, hard days, and every day in between.
        </p>
      </div>

      {!isRevealed ? (
        /* Sealed Parchment Letter */
        <div className="bg-white rounded-3xl border border-[#CCE5F8] p-8 sm:p-12 text-center space-y-6 shadow-2xs relative overflow-hidden">
          <div className="flex justify-center">
            <PostageStamp label="TIMELESS" price="∞" color="pink" />
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-2xl font-bold text-[#24324A]">
              A Sealed Letter for {boyfriendName || 'My Love'}
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#24324A]/70 max-w-sm mx-auto">
              This letter was written especially for your eyes only. Tap the wax seal below when you are ready to unfold it.
            </p>
          </div>

          <div className="py-4 flex justify-center">
            <WaxSeal onClick={handleReveal} isOpened={false} />
          </div>

          <button
            type="button"
            onClick={handleReveal}
            className="text-xs font-sans text-rose-600 hover:text-rose-700 font-semibold cursor-pointer underline underline-offset-4 transition-colors"
          >
            Click to unseal & unfold the parchment
          </button>
        </div>
      ) : (
        /* Unfolded Letter Parchment in Fine Stationery Style */
        <div className="relative bg-white rounded-3xl border border-[#F5B4C9] shadow-[0_16px_40px_rgba(36,50,74,0.06)] p-7 sm:p-14 space-y-8 animate-in fade-in duration-500">
          {/* Top washi tape */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-36 h-6 washi-tape-pink transform -rotate-1 rounded-xs flex items-center justify-center">
            <span className="text-[9px] font-mono font-bold text-[#24324A] tracking-widest uppercase">
              CONFIDENTIAL LOVE
            </span>
          </div>

          {/* Letter Header */}
          <div className="flex items-center justify-between border-b border-[#EAF6FF] pb-4">
            <div className="font-serif italic text-xs sm:text-sm text-[#24324A]/60">
              Written with love · For now and forever
            </div>
            <button
              type="button"
              onClick={() => window.print()}
              className="p-1.5 text-[#24324A]/70 hover:text-[#24324A] rounded-xl hover:bg-[#EAF6FF] transition-colors text-xs flex items-center gap-1.5 cursor-pointer print:hidden font-sans font-medium border border-[#CCE5F8]"
              title="Print this letter as a keepsake"
            >
              <Printer className="w-3.5 h-3.5 text-[#24324A]/60" />
              <span className="hidden sm:inline">Print keepsake</span>
            </button>
          </div>

          {/* Salutation */}
          <div className="font-serif text-2xl sm:text-3xl text-[#24324A] font-bold">
            Dearest {boyfriendName || 'My Love'},
          </div>

          {/* Letter Body */}
          <div className="font-serif text-[#24324A] text-base sm:text-lg leading-relaxed space-y-5">
            <p>
              If someone had told me years ago that I would find someone who understands the quietest corners of my mind, makes me laugh until my cheeks hurt, and feels like home the minute he walks into the room, I wouldn't have believed them.
            </p>

            <p>
              Then you came along.
            </p>

            <p>
              Thank you for every cup of coffee you've shared with me, every sleepy conversation, every tight hug when I needed it most, and every small thing you do without even realizing how special it is. You make ordinary days feel like a cozy adventure.
            </p>

            <div className="my-8 p-6 sm:p-8 bg-lined-paper-pink rounded-2xl border border-[#F5B4C9] text-[#24324A] font-handwriting text-2xl sm:text-3xl text-center leading-relaxed font-bold shadow-2xs">
              "No matter where life takes us or what mountains we have to climb, I want you by my side. You are my favorite person, today, tomorrow, and forever."
            </div>

            <p>
              I promise to always celebrate your victories, cheer you up on your hardest days, listen to your ramblings, and love you more and more with every season that passes.
            </p>
          </div>

          {/* Signoff */}
          <div className="pt-6 border-t border-[#EAF6FF] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="font-serif text-xs text-[#24324A]/60 uppercase tracking-widest font-semibold">
                Endlessly & completely yours,
              </div>
              <div className="font-handwriting text-3xl sm:text-4xl text-rose-600 font-bold mt-1">
                {senderName || 'Your Girl'} ♡
              </div>
            </div>

            {/* Interactive "Send Love Back" Button */}
            <div className="print:hidden">
              {!loveReplied ? (
                <button
                  type="button"
                  onClick={handleSendLoveBack}
                  className="px-6 py-3 bg-[#24324A] hover:bg-[#1A2538] active:scale-95 text-white font-sans text-xs sm:text-sm font-semibold rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Heart className="w-4 h-4 fill-rose-400 text-rose-400" />
                  <span>Send a Hug & Kiss Back 💋</span>
                </button>
              ) : (
                <div className="flex items-center gap-2 px-4 py-2.5 bg-[#FFDDE8] border border-[#F5B4C9] text-[#24324A] rounded-xl text-xs font-sans font-medium animate-in zoom-in-95 shadow-2xs">
                  <Sparkles className="w-4 h-4 text-rose-500" />
                  <span>Kisses received! I love you so much! 💖</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
