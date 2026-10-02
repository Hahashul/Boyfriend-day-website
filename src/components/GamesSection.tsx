import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { playPopSound, playSparkleSound } from '../utils/audio';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';

interface GamesSectionProps {
  boyfriendName?: string;
  senderName?: string;
}

export const GamesSection: React.FC<GamesSectionProps> = () => {
  // ONLY two allowed game sections:
  // 1. Trivia & Memories
  // 2. Who Said It?
  const [activeTab, setActiveTab] = useState<'trivia' | 'who-said-it'>('trivia');

  // ========================================================
  // SECTION 1: TRIVIA & MEMORIES
  // Exactly 5 personalized questions
  // ========================================================
  const triviaQuestions = [
    {
      question: 'How many fights in Darjeeling?',
      options: ['0', '1', '10', '50'],
      correct: 3,
      explanation: '50 fights! A Darjeeling record, but made up with hugs and laughter every single time. 😂❤️',
    },
    {
      question: 'What song did we first dance to?',
      options: ['Señorita', 'Tum Se Hi', 'Dildara', 'Laakhau Hajarau'],
      correct: 0,
      explanation: 'Señorita! First dance together salsa on the club dance floor. 💃🕺',
    },
    {
      question: 'What’s Parina’s biggest turn-off?',
      options: ['Being late', 'Loud chewing', 'Burping', 'Sweating'],
      correct: 0,
      explanation: 'Being late! Punctuality is non-negotiable for your girl! ⏰😤',
    },
    {
      question: 'What’s Parina’s favourite ice cream flavour?',
      options: ['Choco Chips', 'Cookies & Cream', 'Mint Chocolate', 'All of the above'],
      correct: 3,
      explanation: 'All of the above! Why choose just one when you can love them all? 🍨🍫',
    },
    {
      question: 'When will Abhinab stop smoking?',
      options: ['Right now', 'Tonight', 'Tomorrow', 'Never'],
      correct: 0,
      explanation: 'Right now! Official girlfriend orders. No excuses, boyfriend! 🚭🤍',
    },
  ];

  const [tIndex, setTIndex] = useState(0);
  const [tSelected, setTSelected] = useState<number | null>(null);
  const [tScore, setTScore] = useState(0);
  const [tFinished, setTFinished] = useState(false);

  const handleTriviaOption = (idx: number) => {
    if (tSelected !== null) return;
    setTSelected(idx);
    if (idx === triviaQuestions[tIndex].correct) {
      playSparkleSound();
      setTScore((s) => s + 1);
    } else {
      playPopSound();
    }
  };

  const handleTriviaNext = () => {
    playPopSound();
    if (tIndex + 1 < triviaQuestions.length) {
      setTIndex((i) => i + 1);
      setTSelected(null);
    } else {
      setTFinished(true);
      playSparkleSound();
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#FFE66D', '#FF9FC4', '#9FE8C1', '#C9B5FF'],
        disableForReducedMotion: true,
      });
    }
  };

  const handleTriviaReset = () => {
    setTIndex(0);
    setTSelected(null);
    setTScore(0);
    setTFinished(false);
  };

  // ========================================================
  // SECTION 2: WHO SAID IT?
  // Personalized quotes, lines, habits, and things realistically said
  // ========================================================
  const whoSaidItQuotes = [
    {
      text: '"Look at that dog! Stop right now, we have to go pet it."',
      author: 'Abhi',
      detail: 'Non-negotiable protocol whenever any four-legged creature appears within a 50-meter radius. 🐶',
    },
    {
      text: '"Are you literally rage-baiting me right now on purpose?!"',
      author: 'Parina',
      detail: 'Asked at least twice every single week while Abhi stands there grinning with his dimple. 😤',
    },
    {
      text: '"Let\'s get hot rolls, an ice-cold Red Bull, and blast some Nepali songs."',
      author: 'Abhi',
      detail: 'The undisputed culinary and musical holy grail for Abhi at any hour of the night. 🌯⚡',
    },
    {
      text: '"Where is my pink Stanley cup and my pink sleeping mask?!"',
      author: 'Parina',
      detail: 'Daily pink-aesthetic inventory audit. He knows his girl well. 🎀',
    },
    {
      text: '"Don\'t worry about those drunk guys, stay behind me."',
      author: 'Abhi',
      detail: 'The protective gentleman on the night they first met at the club. 🛡️',
    },
    {
      text: '"I\'m stealing your hoodie, your fries, and all your warmth."',
      author: 'Parina',
      detail: 'Girlfriend tax is 100% legally binding and non-refundable. 🍟',
    },
  ];

  const [wIndex, setWIndex] = useState(0);
  const [wAnswer, setWAnswer] = useState<string | null>(null);
  const [wScore, setWScore] = useState(0);
  const [wFinished, setWFinished] = useState(false);

  const handleWGuess = (guess: 'Abhi' | 'Parina') => {
    if (wAnswer !== null) return;
    setWAnswer(guess);
    if (guess === whoSaidItQuotes[wIndex].author) {
      playSparkleSound();
      setWScore((s) => s + 1);
    } else {
      playPopSound();
    }
  };

  const handleWNext = () => {
    playPopSound();
    if (wIndex + 1 < whoSaidItQuotes.length) {
      setWIndex((i) => i + 1);
      setWAnswer(null);
    } else {
      setWFinished(true);
      playSparkleSound();
      confetti({
        particleCount: 30,
        spread: 55,
        origin: { y: 0.65 },
        colors: ['#BFE8FF', '#9FE8C1', '#FF9FC4', '#FFE66D'],
        disableForReducedMotion: true,
      });
    }
  };

  const handleWReset = () => {
    setWIndex(0);
    setWAnswer(null);
    setWScore(0);
    setWFinished(false);
  };

  return (
    <section id="games" className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-14 space-y-8">
      {/* Header */}
      <div className="text-center space-y-1">
        <span className="inline-block px-3 py-1 bg-[#FFE66D] border border-[#F2DE79] rounded-full font-sans text-xs font-semibold uppercase text-[#20304A] tracking-wider shadow-2xs">
          Quick & Playful
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#20304A] font-bold tracking-tight">
          LITTLE GAMES & INTERACTIONS 🎮
        </h2>
        <p className="font-handwriting text-xl text-[#20304A]/80">
          Two fun mini-games to test your memory and how well you know each other.
        </p>
      </div>

      {/* Game Selector Tabs - ONLY 2 TABS */}
      <div className="flex items-center justify-center gap-2 max-w-md mx-auto bg-white/80 p-1.5 rounded-2xl border border-[#93D5FD] shadow-2xs">
        {[
          { id: 'trivia' as const, label: '1. Trivia & Memories' },
          { id: 'who-said-it' as const, label: '2. Who Said It?' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              playPopSound();
              setActiveTab(tab.id);
            }}
            className={`flex-1 py-2 px-4 rounded-xl text-xs sm:text-sm font-sans font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[#20304A] text-white shadow-xs'
                : 'text-[#20304A]/70 hover:text-[#20304A] hover:bg-stone-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ======================================================== */}
      {/* SECTION 1: TRIVIA & MEMORIES                             */}
      {/* ======================================================== */}
      {activeTab === 'trivia' && (
        <div className="bg-white rounded-3xl border border-[#93D5FD] p-6 sm:p-8 shadow-2xs relative">
          {!tFinished ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-[#20304A]/60 pb-2 border-b border-[#BFE8FF]">
                <span>QUESTION {tIndex + 1} OF {triviaQuestions.length}</span>
                <span>SCORE: {tScore}</span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#20304A]">
                {triviaQuestions[tIndex].question}
              </h3>

              <div className="space-y-2.5 pt-2">
                {triviaQuestions[tIndex].options.map((opt, idx) => {
                  const isChosen = tSelected === idx;
                  const isCorrect = idx === triviaQuestions[tIndex].correct;

                  let style = 'bg-[#BFE8FF]/20 border-[#93D5FD] text-[#20304A] hover:bg-[#BFE8FF]/40';
                  if (tSelected !== null) {
                    if (isCorrect) {
                      style = 'bg-[#9FE8C1]/50 border-emerald-400 text-emerald-950 font-bold';
                    } else if (isChosen) {
                      style = 'bg-[#FF9FC4]/40 border-rose-400 text-rose-950';
                    } else {
                      style = 'opacity-40 border-stone-200 text-stone-400';
                    }
                  }

                  return (
                    <button
                      key={opt}
                      type="button"
                      disabled={tSelected !== null}
                      onClick={() => handleTriviaOption(idx)}
                      className={`w-full p-3.5 rounded-2xl border text-left text-xs sm:text-sm font-sans font-medium transition-all flex items-center justify-between cursor-pointer ${style}`}
                    >
                      <span>{opt}</span>
                      {tSelected !== null && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                      {tSelected !== null && isChosen && !isCorrect && <XCircle className="w-4 h-4 text-rose-500" />}
                    </button>
                  );
                })}
              </div>

              {tSelected !== null && (
                <div className="pt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={handleTriviaNext}
                    className="px-5 py-2 bg-[#20304A] hover:bg-[#152033] text-white rounded-xl text-xs font-sans font-semibold cursor-pointer shadow-xs transition-colors"
                  >
                    {tIndex + 1 < triviaQuestions.length ? 'Next Question →' : 'See Score ✨'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#FFE66D] border border-[#F2DE79] flex items-center justify-center text-2xl shadow-2xs">
                🏆
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#20304A]">
                You scored {tScore} / {triviaQuestions.length}!
              </h3>
              <p className="font-handwriting text-xl text-[#20304A]/80 max-w-sm mx-auto font-bold">
                {tScore === triviaQuestions.length
                  ? 'Perfect memory! You know every single chapter by heart.'
                  : 'A couple silly slips, but still 100% certified Abhi!'}
              </p>
              <button
                type="button"
                onClick={handleTriviaReset}
                className="px-4 py-2 bg-[#20304A] text-white rounded-xl text-xs font-sans font-medium inline-flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Play Again</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* SECTION 2: WHO SAID IT?                                  */}
      {/* ======================================================== */}
      {activeTab === 'who-said-it' && (
        <div className="bg-white rounded-3xl border border-[#93D5FD] p-6 sm:p-8 shadow-2xs relative">
          {!wFinished ? (
            <div className="space-y-5">
              <div className="flex items-center justify-between text-xs font-mono text-[#20304A]/60 pb-2 border-b border-[#BFE8FF]">
                <span>ROUND {wIndex + 1} OF {whoSaidItQuotes.length}</span>
                <span>SCORE: {wScore}</span>
              </div>

              <div className="bg-[#FFFDF0] rounded-2xl border border-[#FFE66D] p-6 text-center shadow-inner">
                <span className="text-[10px] font-mono text-amber-700 uppercase font-bold tracking-widest block mb-2">
                  WHO UTTERED THIS?
                </span>
                <p className="font-serif text-xl sm:text-2xl text-[#20304A] font-bold">
                  {whoSaidItQuotes[wIndex].text}
                </p>
              </div>

              {wAnswer === null ? (
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => handleWGuess('Abhi')}
                    className="p-4 rounded-2xl border border-[#93D5FD] bg-[#BFE8FF]/50 hover:bg-[#BFE8FF] font-serif font-bold text-[#20304A] text-base cursor-pointer shadow-2xs transition-colors"
                  >
                    Abhi 🙋‍♂️
                  </button>
                  <button
                    type="button"
                    onClick={() => handleWGuess('Parina')}
                    className="p-4 rounded-2xl border border-[#FF9FC4] bg-[#FF9FC4]/30 hover:bg-[#FF9FC4]/50 font-serif font-bold text-[#20304A] text-base cursor-pointer shadow-2xs transition-colors"
                  >
                    Parina 🙋‍♀️
                  </button>
                </div>
              ) : (
                <div className="space-y-4 text-center">
                  <div
                    className={`p-4 rounded-2xl border text-sm font-sans font-semibold ${
                      wAnswer === whoSaidItQuotes[wIndex].author
                        ? 'bg-[#9FE8C1]/40 border-emerald-400 text-emerald-950'
                        : 'bg-[#FF9FC4]/40 border-rose-400 text-rose-950'
                    }`}
                  >
                    {wAnswer === whoSaidItQuotes[wIndex].author ? 'Correct!' : 'Nope!'} Said by{' '}
                    <strong>{whoSaidItQuotes[wIndex].author}</strong>.
                    <span className="block text-xs font-normal text-[#20304A]/80 mt-1">
                      {whoSaidItQuotes[wIndex].detail}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleWNext}
                    className="px-6 py-2.5 bg-[#20304A] text-white rounded-xl text-xs font-sans font-semibold cursor-pointer shadow-xs"
                  >
                    {wIndex + 1 < whoSaidItQuotes.length ? 'Next Quote →' : 'See Results ✨'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#C9B5FF]/50 border border-[#C9B5FF] flex items-center justify-center text-2xl shadow-2xs">
                💬
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#20304A]">
                You scored {wScore} / {whoSaidItQuotes.length}!
              </h3>
              <p className="font-handwriting text-xl text-[#20304A]/80 max-w-sm mx-auto font-bold">
                No one knows who says what better than you two.
              </p>
              <button
                type="button"
                onClick={handleWReset}
                className="px-4 py-2 bg-[#20304A] text-white rounded-xl text-xs font-sans font-medium inline-flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Try Again</span>
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
