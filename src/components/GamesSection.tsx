import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { playPopSound, playSparkleSound } from '../utils/audio';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { GAMES, PARTNER, SENDER } from './Content';

type Author = 'partner' | 'sender';

export const GamesSection: React.FC = () => {
  // ONLY two allowed game sections:
  // 1. Trivia & Memories
  // 2. Who Said It?
  const [activeTab, setActiveTab] = useState<'trivia' | 'who-said-it'>('trivia');

  // Trivia & Memories (questions live in GAMES.trivia)
  const triviaQuestions = GAMES.trivia;

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

  // Who Said It? (quotes live in GAMES.whoSaidIt)
  const whoSaidItQuotes = GAMES.whoSaidIt;
  const nameOf = (a: Author) => (a === 'partner' ? PARTNER.nickname : SENDER.name);

  const [wIndex, setWIndex] = useState(0);
  const [wAnswer, setWAnswer] = useState<Author | null>(null);
  const [wScore, setWScore] = useState(0);
  const [wFinished, setWFinished] = useState(false);

  const handleWGuess = (guess: Author) => {
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
          {GAMES.badge}
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#20304A] font-bold tracking-tight">
          {GAMES.title}
        </h2>
        <p className="font-handwriting text-xl text-[#20304A]/80">
          {GAMES.subtitle}
        </p>
      </div>

      {/* Game Selector Tabs - ONLY 2 TABS */}
      <div className="flex items-center justify-center gap-2 max-w-md mx-auto bg-white/80 p-1.5 rounded-2xl border border-[#93D5FD] shadow-2xs">
        {[
          { id: 'trivia' as const, label: GAMES.tabTrivia },
          { id: 'who-said-it' as const, label: GAMES.tabWhoSaidIt },
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
                    {tIndex + 1 < triviaQuestions.length ? GAMES.triviaNext : GAMES.triviaSeeScore}
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
                  ? GAMES.triviaPerfect
                  : GAMES.triviaImperfect}
              </p>
              <button
                type="button"
                onClick={handleTriviaReset}
                className="px-4 py-2 bg-[#20304A] text-white rounded-xl text-xs font-sans font-medium inline-flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{GAMES.playAgain}</span>
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
                  {GAMES.whoSaidItPrompt}
                </span>
                <p className="font-serif text-xl sm:text-2xl text-[#20304A] font-bold">
                  {whoSaidItQuotes[wIndex].text}
                </p>
              </div>

              {wAnswer === null ? (
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => handleWGuess('partner')}
                    className="p-4 rounded-2xl border border-[#93D5FD] bg-[#BFE8FF]/50 hover:bg-[#BFE8FF] font-serif font-bold text-[#20304A] text-base cursor-pointer shadow-2xs transition-colors"
                  >
                    {GAMES.partnerButton}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleWGuess('sender')}
                    className="p-4 rounded-2xl border border-[#FF9FC4] bg-[#FF9FC4]/30 hover:bg-[#FF9FC4]/50 font-serif font-bold text-[#20304A] text-base cursor-pointer shadow-2xs transition-colors"
                  >
                    {GAMES.senderButton}
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
                    {wAnswer === whoSaidItQuotes[wIndex].author ? GAMES.whoSaidItCorrect : GAMES.whoSaidItWrong} {GAMES.whoSaidItSaidBy}{' '}
                    <strong>{nameOf(whoSaidItQuotes[wIndex].author)}</strong>.
                    <span className="block text-xs font-normal text-[#20304A]/80 mt-1">
                      {whoSaidItQuotes[wIndex].detail}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleWNext}
                    className="px-6 py-2.5 bg-[#20304A] text-white rounded-xl text-xs font-sans font-semibold cursor-pointer shadow-xs"
                  >
                    {wIndex + 1 < whoSaidItQuotes.length ? GAMES.whoSaidItNext : GAMES.whoSaidItSeeResults}
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
                {GAMES.whoSaidItFinal}
              </p>
              <button
                type="button"
                onClick={handleWReset}
                className="px-4 py-2 bg-[#20304A] text-white rounded-xl text-xs font-sans font-medium inline-flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{GAMES.tryAgain}</span>
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};