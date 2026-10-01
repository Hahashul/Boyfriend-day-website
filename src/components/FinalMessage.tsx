import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { playSparkleSound, playHeartChime, playPopSound } from '../utils/audio';
import { WaxSeal, HeartDoodle, PostageStamp } from './Doodles';
import { Heart, Printer, Sparkles, Send } from 'lucide-react';

interface FinalMessageProps {
  boyfriendName: string;
  senderName: string;
  anniversaryDate: string;
}

export const FinalMessage: React.FC<FinalMessageProps> = ({
  boyfriendName,
  senderName,
  anniversaryDate,
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [loveReplied, setLoveReplied] = useState(false);

  const handleReveal = () => {
    setIsRevealed(true);
    playSparkleSound();
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#F43F5E', '#FDA4AF', '#FCD34D'],
    });
  };

  const handleSendLoveBack = () => {
    setLoveReplied(true);
    playHeartChime();
    confetti({
      particleCount: 70,
      spread: 90,
      origin: { y: 0.7 },
      colors: ['#E11D48', '#FB7185', '#F472B6', '#FDA4AF'],
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="font-casual text-xs font-semibold uppercase text-rose-600 tracking-wider">
          From My Deepest Heart
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-stone-800">
          The Final Love Letter 💌
        </h2>
        <p className="font-handwriting text-lg text-stone-600">
          The words I want you to remember on good days, hard days, and every day in between.
        </p>
      </div>

      {!isRevealed ? (
        /* Sealed Parchment Letter */
        <div className="bg-[#FFFDF7] rounded-3xl border-2 border-dashed border-[#D9CDBB] p-8 sm:p-12 text-center space-y-6 shadow-sm relative overflow-hidden">
          <div className="flex justify-center">
            <PostageStamp label="TIMELESS" price="∞" />
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-2xl font-bold text-stone-800">
              A Sealed Letter for {boyfriendName || 'My Love'}
            </h3>
            <p className="font-casual text-xs text-stone-500 max-w-sm mx-auto">
              This letter was written especially for your eyes only. Tap the seal below when you are ready to read it.
            </p>
          </div>

          <div className="py-4 flex justify-center">
            <WaxSeal onClick={handleReveal} isOpened={false} />
          </div>

          <button
            type="button"
            onClick={handleReveal}
            className="text-xs font-casual text-rose-600 hover:text-rose-700 font-semibold cursor-pointer underline underline-offset-4"
          >
            Click to unseal & unfold the parchment
          </button>
        </div>
      ) : (
        /* Unfolded Letter Parchment */
        <div className="relative bg-[#FFFDF7] rounded-3xl border border-[#E0D4C0] shadow-md p-6 sm:p-12 space-y-6 animate-in fade-in duration-500">
          {/* Top washi tape */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 washi-tape-pink transform -rotate-1 rounded-xs flex items-center justify-center">
            <span className="text-[9px] font-mono text-rose-900 tracking-widest">
              CONFIDENTIAL LOVE
            </span>
          </div>

          {/* Letter Header */}
          <div className="flex items-center justify-between border-b border-stone-200/80 pb-4">
            <div className="font-serif italic text-xs text-stone-500">
              Written with love · For now and forever
            </div>
            <button
              type="button"
              onClick={() => window.print()}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors text-xs flex items-center gap-1 cursor-pointer print:hidden"
              title="Print this letter as a keepsake"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-casual">Print keepsake</span>
            </button>
          </div>

          {/* Salutation */}
          <div className="font-serif text-xl sm:text-2xl text-stone-900 font-bold">
            Dearest {boyfriendName || 'My Love'},
          </div>

          {/* Letter Body in Warm Editorial Serif & Handwriting highlights */}
          <div className="font-serif text-stone-700 text-base sm:text-lg leading-relaxed space-y-4">
            <p>
              If someone had told me years ago that I would find someone who understands the quietest corners of my mind, makes me laugh until my cheeks hurt, and feels like home the minute he walks into the room, I wouldn't have believed them.
            </p>

            <p>
              Then you came along.
            </p>

            <p>
              Thank you for every cup of coffee you've shared with me, every sleepy conversation, every tight hug when I needed it most, and every small thing you do without even realizing how special it is. You make ordinary days feel like a cozy adventure.
            </p>

            <div className="my-6 p-5 bg-lined-paper rounded-2xl border border-stone-200 text-stone-800 font-handwriting text-2xl sm:text-3xl text-center leading-relaxed">
              "No matter where life takes us or what mountains we have to climb, I want you by my side. You are my favorite person, today, tomorrow, and forever."
            </div>

            <p>
              I promise to always celebrate your victories, cheer you up on your hardest days, listen to your ramblings, and love you more and more with every season that passes.
            </p>
          </div>

          {/* Signoff */}
          <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="font-serif text-xs text-stone-400 uppercase tracking-widest">
                Endlessly & completely yours,
              </div>
              <div className="font-handwriting text-3xl sm:text-4xl text-rose-700 font-bold mt-1">
                {senderName || 'Your Girl'} ♡
              </div>
            </div>

            {/* Interactive "Send Love Back" Button */}
            <div className="print:hidden">
              {!loveReplied ? (
                <button
                  type="button"
                  onClick={handleSendLoveBack}
                  className="px-5 py-3 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-casual text-sm font-semibold rounded-2xl shadow-sm flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Send a Hug & Kiss Back 💋</span>
                </button>
              ) : (
                <div className="flex items-center gap-2 px-4 py-2.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-xs font-casual font-semibold animate-in zoom-in-95">
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
