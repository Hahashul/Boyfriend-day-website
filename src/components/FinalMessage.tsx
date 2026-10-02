import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { playSparkleSound, playHeartChime } from '../utils/audio';
import { PostageStamp } from './Doodles';
import { Heart, Printer, Sparkles } from 'lucide-react';

interface FinalMessageProps {
  boyfriendName: string;
  senderName: string;
  anniversaryDate: string;
}

export const FinalMessage: React.FC<FinalMessageProps> = ({
  boyfriendName = 'Abhi',
  senderName = 'Parina',
}) => {
  const [loveReplied, setLoveReplied] = useState(false);

  const handleSendLoveBack = () => {
    setLoveReplied(true);
    playHeartChime();
    playSparkleSound();
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#BAE6FD', '#FFDDE8', '#FFF4B8', '#DDF7E8'],
      disableForReducedMotion: true,
    });
  };

  return (
    <section id="final-letter" className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-16 space-y-8">
      {/* Header */}
      <div className="text-center space-y-1">
        <span className="inline-block px-3 py-1 bg-[#FFDDE8] border border-[#F5B4C9] rounded-full font-sans text-xs font-semibold uppercase text-[#24324A] tracking-wider shadow-2xs">
          The Final Chapter
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#24324A] font-bold tracking-tight">
          Okay, One Serious Thing. 💌
        </h2>
        <p className="font-handwriting text-xl text-[#24324A]/80">
          The words I want you to remember today, tomorrow, and every day in between.
        </p>
      </div>

      {/* Unfolded Letter Parchment in Fine Stationery Style */}
      <div className="relative bg-white rounded-3xl border border-[#F5B4C9] shadow-[0_16px_40px_rgba(36,50,74,0.06)] p-7 sm:p-14 space-y-7">
        {/* Top washi tape */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-40 h-6 washi-tape-pink transform -rotate-1 rounded-xs flex items-center justify-center">
          <span className="text-[9px] font-mono font-bold text-[#24324A] tracking-widest uppercase">
            FOR ABHI · FROM PARINA
          </span>
        </div>

        {/* Letter Header */}
        <div className="flex items-center justify-between border-b border-[#EAF6FF] pb-4">
          <div className="flex items-center gap-3">
            <PostageStamp label="TIMELESS" price="∞" color="pink" />
            <div className="font-serif italic text-xs sm:text-sm text-[#24324A]/60">
              Written with all my heart · 20 October 2024 to Forever
            </div>
          </div>

          <button
            type="button"
            onClick={() => window.print()}
            className="p-1.5 text-[#24324A]/70 hover:text-[#24324A] rounded-xl hover:bg-[#EAF6FF] transition-colors text-xs flex items-center gap-1.5 cursor-pointer print:hidden font-sans font-medium border border-[#CCE5F8]"
            title="Print keepsake"
          >
            <Printer className="w-3.5 h-3.5 text-[#24324A]/60" />
            <span className="hidden sm:inline">Print keepsake</span>
          </button>
        </div>

        {/* Salutation */}
        <div className="font-serif text-2xl sm:text-3xl text-[#24324A] font-bold">
          Dearest Abhi,
        </div>

        {/* Letter Body - Real Voice, Meaningful Moments */}
        <div className="font-serif text-[#24324A] text-sm sm:text-base leading-relaxed space-y-4">
          <p>
            When I look back at the past two years, I realize how much you have changed my world in the quietest, most natural ways. You didn’t just become my first boyfriend — you gave me so many of my firsts, and you made the most ordinary, mundane days feel like something worth holding onto.
          </p>

          <p>
            I love sleeping on your shoulder during long rides. I love that I feel completely safe crying in your arms without ever feeling small or silly for doing it. Whenever I’m overwhelmed or anxious, your reassurance instantly brings my smile back. Your loyalty and the way you protect me make me feel cherished in a way I never knew I deserved.
          </p>

          <p>
            Being with you has genuinely made me want to become kinder, softer, and a better person.
          </p>

          <p>
            I know I’m not always easy. I know I sometimes nag you about your past, and I get jealous over stupid little things. I’m sorry for the times when I haven't been able to just let things go, and I appreciate your patience with me more than you probably realize. Thank you for never giving up on me on my difficult days.
          </p>

          <div className="my-6 p-5 sm:p-7 bg-lined-paper-pink rounded-2xl border border-[#F5B4C9] text-[#24324A] font-handwriting text-2xl sm:text-3xl text-center leading-relaxed font-bold shadow-2xs">
            "I love your dancing, your dimple, your stupid rage-baiting, your protective side, and the gentle way you take care of me."
          </div>

          <p>
            Saying "I love you" has always been difficult for me. It’s not something I throw around lightly, which is why it means so much that I can say it to you with complete certainty.
          </p>

          <p>
            Ten years from now, I still want us to be slow dancing in the living room, exploring new mountain towns, sharing rolls, and laughing at the exact same silly inside jokes.
          </p>
        </div>

        {/* Closing Highlight Mandated by User */}
        <div className="pt-6 border-t border-[#EAF6FF] space-y-2">
          <p className="font-serif text-xl sm:text-2xl font-bold text-[#24324A]">
            Moi tumak bhal pao.
          </p>
          <p className="font-sans text-xs sm:text-sm text-[#24324A]/70 font-semibold tracking-wide">
            Happy Boyfriend's Day, baby.
          </p>
          <div className="font-handwriting text-2xl text-rose-600 font-bold pt-2">
            — Forever yours, Parina ♡
          </div>
        </div>

        {/* Interactive Response Button */}
        <div className="pt-4 border-t border-[#CCE5F8]/60 flex items-center justify-between print:hidden">
          <span className="text-xs font-sans text-[#24324A]/60">
            For Abhinab P Kashyap
          </span>

          {!loveReplied ? (
            <button
              type="button"
              onClick={handleSendLoveBack}
              className="px-5 py-2.5 bg-[#24324A] hover:bg-[#1A2538] active:scale-95 text-white font-sans text-xs sm:text-sm font-semibold rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition-all"
            >
              <Heart className="w-4 h-4 fill-rose-400 text-rose-400" />
              <span>Send a Hug & Squeeze Back 🫂</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2 bg-[#DDF7E8] border border-[#A7E9C1] text-[#24324A] rounded-xl text-xs font-sans font-semibold animate-in zoom-in-95 shadow-2xs">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Hug received! You are my favorite boy. 🤍</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

