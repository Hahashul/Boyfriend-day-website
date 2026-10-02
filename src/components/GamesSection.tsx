import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { playPopSound, playSparkleSound } from '../utils/audio';
import { Sparkles, CheckCircle2, XCircle, RotateCcw, Heart, Award, Gift, Check } from 'lucide-react';

interface GamesSectionProps {
  boyfriendName?: string;
  senderName?: string;
}

export const GamesSection: React.FC<GamesSectionProps> = ({
  boyfriendName = 'Abhinab P Kashyap',
  senderName = 'Parina',
}) => {
  const [activeTab, setActiveTab] = useState<'know-yourself' | 'who-said-it' | 'compatibility' | 'scratch-perks'>('know-yourself');
  const [isScratched, setIsScratched] = useState(false);

  const handleScratch = () => {
    if (!isScratched) {
      setIsScratched(true);
      playSparkleSound();
      confetti({
        particleCount: 28,
        spread: 55,
        origin: { y: 0.65 },
        colors: ['#FFF4B8', '#FFDDE8', '#DDF7E8', '#E9DEFF'],
        disableForReducedMotion: true,
      });
    }
  };

  // GAME 1: How Well Do You Know Yourself?
  const game1Questions = [
    {
      question: 'What will Abhi stop walking for without exception?',
      options: ['A free Ferrari', 'A cute dog on the street', 'A flash sale on shoes', 'A motivational speaker'],
      correct: 1,
      explanation: 'Every single dog must be acknowledged, greeted, and petted. 🐕',
    },
    {
      question: 'What is his designated emergency fuel?',
      options: ['Green tea', 'Warm milk', 'Ice-cold Red Bull', 'Electrolytes'],
      correct: 2,
      explanation: 'Red Bull flows through his veins at all hours. ⚡',
    },
    {
      question: 'What food wins him over 100% of the time?',
      options: ['Avocado salad', 'Fresh hot rolls', 'Plain steamed broccoli', 'Oatmeal'],
      correct: 1,
      explanation: 'Hot rolls are the true key to Abhi\'s heart. 🌯',
    },
    {
      question: 'What happens when Parina gets annoyed with him?',
      options: ['Abhi gets scared', 'Abhi laughs because he successfully rage-baited her', 'He runs away', 'He files an apology report'],
      correct: 1,
      explanation: 'Mission accomplished for the Professional Rage-Baiter! 😏',
    },
  ];
  const [g1Index, setG1Index] = useState(0);
  const [g1Selected, setG1Selected] = useState<number | null>(null);
  const [g1Score, setG1Score] = useState(0);
  const [g1Finished, setG1Finished] = useState(false);

  const handleG1Option = (idx: number) => {
    if (g1Selected !== null) return;
    setG1Selected(idx);
    if (idx === game1Questions[g1Index].correct) {
      playSparkleSound();
      setG1Score((s) => s + 1);
    } else {
      playPopSound();
    }
  };

  const handleG1Next = () => {
    playPopSound();
    if (g1Index + 1 < game1Questions.length) {
      setG1Index((i) => i + 1);
      setG1Selected(null);
    } else {
      setG1Finished(true);
      playSparkleSound();
      confetti({
        particleCount: 25,
        spread: 55,
        origin: { y: 0.65 },
        colors: ['#FFF4B8', '#FFDDE8', '#DDF7E8'],
        disableForReducedMotion: true,
      });
    }
  };

  const handleG1Reset = () => {
    setG1Index(0);
    setG1Selected(null);
    setG1Score(0);
    setG1Finished(false);
  };

  // GAME 2: Who Said It?
  const game2Statements = [
    { text: '"Look at that dog! We have to go pet it right now."', author: 'Abhi', detail: 'Standard Abhi protocol whenever within a 50-meter radius of any dog.' },
    { text: '"Are you really rage-baiting me right now on purpose?!"', author: 'Parina', detail: 'Asked at least twice every single week with 100% exasperation.' },
    { text: '"Let\'s go get rolls and Red Bull."', author: 'Abhi', detail: 'The ultimate late-night dinner recommendation.' },
    { text: '"Where is my pink Stanley cup and sleeping mask?"', author: 'Parina', detail: 'The pink-aesthetic girl daily inventory check.' },
    { text: '"You have zero spatial awareness."', author: 'Parina', detail: 'Fact checked by independent relationship observers.' },
  ];
  const [g2Index, setG2Index] = useState(0);
  const [g2Answer, setG2Answer] = useState<string | null>(null);
  const [g2Score, setG2Score] = useState(0);
  const [g2Finished, setG2Finished] = useState(false);

  const handleG2Guess = (guess: 'Abhi' | 'Parina') => {
    if (g2Answer !== null) return;
    setG2Answer(guess);
    if (guess === game2Statements[g2Index].author) {
      playSparkleSound();
      setG2Score((s) => s + 1);
    } else {
      playPopSound();
    }
  };

  const handleG2Next = () => {
    playPopSound();
    if (g2Index + 1 < game2Statements.length) {
      setG2Index((i) => i + 1);
      setG2Answer(null);
    } else {
      setG2Finished(true);
      playSparkleSound();
      confetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.65 },
        colors: ['#BAE6FD', '#DDF7E8', '#FFDDE8'],
        disableForReducedMotion: true,
      });
    }
  };

  const handleG2Reset = () => {
    setG2Index(0);
    setG2Answer(null);
    setG2Score(0);
    setG2Finished(false);
  };

  // GAME 3: Abhi's Compatibility Test
  const [compatStep, setCompatStep] = useState(0);
  const [compatFinished, setCompatFinished] = useState(false);

  const compatQuestions = [
    { q: 'When Parina gives you side-eye, your immediate response is:', a: ['Apologize profusely', 'Flash the dimple and start dancing'] },
    { q: 'Who gets control over the aux cord in the car?', a: ['Whoever connects first', 'Abhi (playing Nepali songs on repeat)'] },
    { q: 'Can you return Parina or exchange her for a less dramatic girlfriend?', a: ['Technically impossible', 'No returns accepted — officially claimed!'] },
  ];

  const handleCompatSelect = () => {
    playSparkleSound();
    if (compatStep + 1 < compatQuestions.length) {
      setCompatStep((s) => s + 1);
    } else {
      setCompatFinished(true);
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#FFDDE8', '#FFF4B8', '#DDF7E8', '#E9DEFF'],
        disableForReducedMotion: true,
      });
    }
  };

  return (
    <section id="games" className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-14 space-y-8">
      {/* Header */}
      <div className="text-center space-y-1">
        <span className="inline-block px-3 py-1 bg-[#FFF4B8] border border-[#F2DE79] rounded-full font-sans text-xs font-semibold uppercase text-[#24324A] tracking-wider shadow-2xs">
          Quick & Playful
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#24324A] font-bold tracking-tight">
          LITTLE GAMES & INTERACTIONS 🎮
        </h2>
        <p className="font-handwriting text-xl text-[#24324A]/80">
          Three quick mini-challenges to test your memory and relationship reflexes.
        </p>
      </div>

      {/* Game Selector Tabs */}
      <div className="flex items-center justify-center gap-1.5 max-w-xl mx-auto bg-white/80 p-1.5 rounded-2xl border border-[#CCE5F8] shadow-2xs overflow-x-auto">
        {[
          { id: 'know-yourself' as const, label: '1. Know Yourself?' },
          { id: 'who-said-it' as const, label: '2. Who Said It?' },
          { id: 'compatibility' as const, label: '3. Compatibility' },
          { id: 'scratch-perks' as const, label: '4. Scratch Perks 🎟️' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              playPopSound();
              setActiveTab(tab.id);
            }}
            className={`py-2 px-3 rounded-xl text-xs font-sans font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[#24324A] text-white shadow-xs'
                : 'text-[#24324A]/70 hover:text-[#24324A] hover:bg-stone-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* GAME 1 CONTAINER */}
      {activeTab === 'know-yourself' && (
        <div className="bg-white rounded-3xl border border-[#CCE5F8] p-6 sm:p-8 shadow-2xs relative">
          {!g1Finished ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-[#24324A]/60 pb-2 border-b border-[#CCE5F8]/60">
                <span>QUESTION {g1Index + 1} OF {game1Questions.length}</span>
                <span>SCORE: {g1Score}</span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#24324A]">
                {game1Questions[g1Index].question}
              </h3>

              <div className="space-y-2.5 pt-2">
                {game1Questions[g1Index].options.map((opt, idx) => {
                  const isChosen = g1Selected === idx;
                  const isCorrect = idx === game1Questions[g1Index].correct;

                  let style = 'bg-[#EAF6FF]/40 border-[#CCE5F8] text-[#24324A] hover:bg-[#EAF6FF]';
                  if (g1Selected !== null) {
                    if (isCorrect) {
                      style = 'bg-[#DDF7E8] border-[#A7E9C1] text-emerald-950 font-bold';
                    } else if (isChosen) {
                      style = 'bg-[#FFDDE8] border-[#F5B4C9] text-rose-950';
                    } else {
                      style = 'opacity-40 border-stone-200 text-stone-400';
                    }
                  }

                  return (
                    <button
                      key={opt}
                      type="button"
                      disabled={g1Selected !== null}
                      onClick={() => handleG1Option(idx)}
                      className={`w-full p-3.5 rounded-2xl border text-left text-xs sm:text-sm font-sans font-medium transition-all flex items-center justify-between cursor-pointer ${style}`}
                    >
                      <span>{opt}</span>
                      {g1Selected !== null && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                      {g1Selected !== null && isChosen && !isCorrect && <XCircle className="w-4 h-4 text-rose-500" />}
                    </button>
                  );
                })}
              </div>

              {g1Selected !== null && (
                <div className="pt-3 flex items-center justify-between">
                  <span className="font-handwriting text-lg text-[#24324A] font-bold">
                    {game1Questions[g1Index].explanation}
                  </span>
                  <button
                    type="button"
                    onClick={handleG1Next}
                    className="px-5 py-2 bg-[#24324A] hover:bg-[#1A2538] text-white rounded-xl text-xs font-sans font-semibold cursor-pointer shadow-xs"
                  >
                    {g1Index + 1 < game1Questions.length ? 'Next Question →' : 'See Score ✨'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#FFF4B8] border border-[#F2DE79] flex items-center justify-center text-2xl">
                🏆
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#24324A]">
                You scored {g1Score} / {game1Questions.length}!
              </h3>
              <p className="font-handwriting text-xl text-[#24324A]/80 max-w-sm mx-auto">
                {g1Score === 4 ? '100% accurate! You truly know your own brand.' : 'A few silly slips, but still 100% Abhi.'}
              </p>
              <button
                type="button"
                onClick={handleG1Reset}
                className="px-4 py-2 bg-[#24324A] text-white rounded-xl text-xs font-sans font-medium inline-flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Play Again</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* GAME 2 CONTAINER */}
      {activeTab === 'who-said-it' && (
        <div className="bg-white rounded-3xl border border-[#CCE5F8] p-6 sm:p-8 shadow-2xs relative">
          {!g2Finished ? (
            <div className="space-y-5">
              <div className="flex items-center justify-between text-xs font-mono text-[#24324A]/60 pb-2 border-b border-[#CCE5F8]/60">
                <span>ROUND {g2Index + 1} OF {game2Statements.length}</span>
                <span>SCORE: {g2Score}</span>
              </div>

              <div className="bg-[#FFFDF0] rounded-2xl border border-[#F2DE79] p-6 text-center shadow-inner">
                <span className="text-[10px] font-mono text-amber-700 uppercase font-bold tracking-widest block mb-2">
                  WHO UTTERED THIS?
                </span>
                <p className="font-serif text-xl sm:text-2xl text-[#24324A] font-bold">
                  {game2Statements[g2Index].text}
                </p>
              </div>

              {g2Answer === null ? (
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => handleG2Guess('Abhi')}
                    className="p-4 rounded-2xl border border-[#CCE5F8] bg-[#EAF6FF] hover:bg-blue-100 font-serif font-bold text-[#24324A] text-base cursor-pointer shadow-2xs transition-colors"
                  >
                    Abhi 🙋‍♂️
                  </button>
                  <button
                    type="button"
                    onClick={() => handleG2Guess('Parina')}
                    className="p-4 rounded-2xl border border-[#F5B4C9] bg-[#FFDDE8] hover:bg-pink-100 font-serif font-bold text-[#24324A] text-base cursor-pointer shadow-2xs transition-colors"
                  >
                    Parina 🙋‍♀️
                  </button>
                </div>
              ) : (
                <div className="space-y-4 text-center">
                  <div className={`p-4 rounded-2xl border text-sm font-sans font-semibold ${
                    g2Answer === game2Statements[g2Index].author
                      ? 'bg-[#DDF7E8] border-[#A7E9C1] text-emerald-950'
                      : 'bg-[#FFDDE8] border-[#F5B4C9] text-rose-950'
                  }`}>
                    {g2Answer === game2Statements[g2Index].author ? 'Correct!' : 'Nope!'} Said by{' '}
                    <strong>{game2Statements[g2Index].author}</strong>.
                    <span className="block text-xs font-normal text-[#24324A]/80 mt-1">
                      {game2Statements[g2Index].detail}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleG2Next}
                    className="px-6 py-2.5 bg-[#24324A] text-white rounded-xl text-xs font-sans font-semibold cursor-pointer shadow-xs"
                  >
                    {g2Index + 1 < game2Statements.length ? 'Next Quote →' : 'See Results ✨'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#E9DEFF] border border-[#D0BDFF] flex items-center justify-center text-2xl">
                💬
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#24324A]">
                You scored {g2Score} / {game2Statements.length}!
              </h3>
              <p className="font-handwriting text-xl text-[#24324A]/80 max-w-sm mx-auto">
                No one knows who speaks what better than you two.
              </p>
              <button
                type="button"
                onClick={handleG2Reset}
                className="px-4 py-2 bg-[#24324A] text-white rounded-xl text-xs font-sans font-medium inline-flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Try Again</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* GAME 3 CONTAINER: Abhi's Compatibility Test */}
      {activeTab === 'compatibility' && (
        <div className="bg-white rounded-3xl border border-[#CCE5F8] p-6 sm:p-8 shadow-2xs relative">
          {!compatFinished ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-[#24324A]/60 pb-2 border-b border-[#CCE5F8]/60">
                <span>QUESTION {compatStep + 1} OF {compatQuestions.length}</span>
                <span>SYSTEM: AUTOMATIC</span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#24324A]">
                {compatQuestions[compatStep].q}
              </h3>

              <div className="space-y-2.5 pt-2">
                {compatQuestions[compatStep].a.map((ans) => (
                  <button
                    key={ans}
                    type="button"
                    onClick={handleCompatSelect}
                    className="w-full p-4 rounded-2xl border border-[#CCE5F8] bg-[#EAF6FF]/40 hover:bg-[#EAF6FF] text-left text-xs sm:text-sm font-sans font-semibold text-[#24324A] transition-all cursor-pointer shadow-2xs"
                  >
                    {ans}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-6 space-y-4 animate-in fade-in">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-[#FFDDE8] border border-[#F5B4C9] flex items-center justify-center text-3xl shadow-xs">
                💖
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                  FINAL CERTIFIED VERDICT
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#24324A] pt-2">
                  Congratulations. You are still Parina's Baby.
                </h3>
                <p className="font-handwriting text-2xl text-[#24324A]/80 pt-1">
                  100% match. No refunds or replacements permitted under warranty. ♡
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setCompatStep(0);
                  setCompatFinished(false);
                }}
                className="px-4 py-2 bg-[#24324A] text-white rounded-xl text-xs font-sans font-medium inline-flex items-center gap-1.5 cursor-pointer mt-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Re-verify Compatibility</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* GAME 4 CONTAINER: Scratch Card & Official Certificate */}
      {activeTab === 'scratch-perks' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Scratch Ticket */}
            <div className="bg-white rounded-3xl border border-[#D0BDFF] p-6 sm:p-7 relative shadow-2xs flex flex-col justify-between">
              <div className="absolute -top-3 left-8 w-32 h-6 washi-tape-lavender transform -rotate-1 rounded-xs flex items-center justify-center">
                <span className="text-[9px] font-mono font-bold text-[#24324A] tracking-wider">SPECIAL PERK</span>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#24324A]/60 uppercase font-semibold">BOYFRIEND'S DAY COUPON</span>
                  <Gift className="w-5 h-5 text-purple-500" />
                </div>

                <h3 className="font-serif text-xl sm:text-2xl text-[#24324A] mt-3 font-bold">
                  Secret Scratch Ticket
                </h3>
                <p className="font-sans text-xs text-[#24324A]/70 mt-1">
                  Scratch below to reveal a certified relationship perk!
                </p>

                {/* The Scratch Area */}
                <div className="mt-5 relative">
                  <div className="w-full min-h-[130px] rounded-2xl p-5 bg-[#FFDDE8]/60 border border-[#F5B4C9] flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] font-sans text-rose-700 uppercase tracking-widest font-bold">
                      OFFICIAL PERK UNLOCKED
                    </span>
                    <p className="font-handwriting text-2xl text-[#24324A] font-bold mt-1">
                      "Valid for: 1 emergency spicy roll delivery, unlimited forehead kisses & immunity from 1 dramatic argument!"
                    </p>
                    <span className="text-[10px] font-mono text-[#24324A]/70 mt-1">
                      (No expiration date · Redeemable immediately)
                    </span>
                  </div>

                  {!isScratched && (
                    <button
                      type="button"
                      onClick={handleScratch}
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-stone-200 via-stone-100 to-stone-300 hover:from-stone-100 hover:to-stone-200 cursor-pointer shadow-inner flex flex-col items-center justify-center transition-all p-4 text-center group border border-stone-200"
                    >
                      <Sparkles className="w-6 h-6 text-stone-600 group-hover:scale-110 transition-transform mb-1" />
                      <span className="font-sans text-xs font-bold text-[#24324A]">
                        Tap to Scratch Silver Foil 🎟️
                      </span>
                      <span className="text-[10px] font-mono text-stone-500 mt-0.5">
                        Click to unveil hidden coupon
                      </span>
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-[#24324A]/60 font-sans">
                <span>{isScratched ? 'Coupon Unlocked ✨' : 'Secret Mystery'}</span>
                {isScratched && (
                  <button
                    type="button"
                    onClick={() => setIsScratched(false)}
                    className="text-[#24324A] hover:underline font-sans cursor-pointer text-xs font-semibold"
                  >
                    Hide & scratch again
                  </button>
                )}
              </div>
            </div>

            {/* Official Certificate of Best Boyfriend */}
            <div className="bg-[#FFFDF7] rounded-3xl border-2 border-[#F2DE79] p-6 sm:p-7 relative shadow-2xs flex flex-col justify-between">
              <div className="absolute -top-3 right-8 w-28 h-6 washi-tape-pink transform rotate-2 rounded-xs flex items-center justify-center">
                <span className="text-[9px] font-mono font-bold text-[#24324A] tracking-wider">CERTIFICATE</span>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-amber-800 uppercase font-semibold">HONORARY CITATION</span>
                  <Award className="w-5 h-5 text-amber-500" />
                </div>

                <h3 className="font-serif text-xl sm:text-2xl text-[#24324A] mt-2 font-bold">
                  Certificate of Best Boyfriend
                </h3>
                <p className="font-sans text-xs text-[#24324A]/70 mt-0.5">
                  Officially conferred to <strong className="text-[#24324A]">{boyfriendName}</strong>.
                </p>

                <div className="mt-4 space-y-2 text-xs font-sans text-[#24324A]/80 border-t border-b border-[#F2DE79]/60 py-3">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Certified master of shoelace tying & outfit coordination</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Excellence in impromptu club salsa dancing to Señorita</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Permanent immunity from being traded or returned</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-2 flex items-center justify-between text-xs text-[#24324A]/70 font-handwriting">
                <span>Signed with endless love,</span>
                <span className="font-bold text-[#24324A] text-xl border-b border-[#F5B4C9] pb-0.5">
                  {senderName} ♡
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

