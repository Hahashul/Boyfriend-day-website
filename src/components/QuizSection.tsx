import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { QuizQuestion } from '../types/scrapbook';
import { playPopSound, playSparkleSound } from '../utils/audio';
import { CheckCircle, XCircle, RotateCcw, Award, Sparkles } from 'lucide-react';

interface QuizSectionProps {
  questions: QuizQuestion[];
  boyfriendName: string;
  senderName: string;
}

export const QuizSection: React.FC<QuizSectionProps> = ({
  questions,
  boyfriendName,
  senderName,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = questions[currentIndex] || questions[0];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.correctIndex;
    if (isCorrect) {
      playSparkleSound();
      setScore((prev) => prev + 1);
    } else {
      playPopSound();
    }
  };

  const handleNextQuestion = () => {
    playPopSound();
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
      playSparkleSound();
      confetti({
        particleCount: 30,
        spread: 55,
        origin: { y: 0.6 },
        colors: ['#FB7185', '#FDE68A', '#DDD6FE'],
        disableForReducedMotion: true,
      });
    }
  };

  const handleRestart = () => {
    playPopSound();
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-1">
        <span className="inline-block px-3 py-1 bg-[#E9DEFF] border border-[#D0BDFF] rounded-full font-sans text-xs font-semibold uppercase text-[#24324A] tracking-wider shadow-2xs">
          Boyfriend Exam
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#24324A] font-bold tracking-tight">
          How Well Do You Know Us? 📝
        </h2>
        <p className="font-handwriting text-xl text-[#24324A]/80">
          Let's see if you can score 100% on our favorite memories and inside jokes!
        </p>
      </div>

      {!isCompleted ? (
        /* Active Quiz Card */
        <div className="bg-white rounded-3xl border border-[#CCE5F8] p-6 sm:p-8 shadow-2xs relative">
          {/* Progress bar */}
          <div className="flex items-center justify-between text-xs font-sans font-medium text-[#24324A]/70 mb-3">
            <span>
              Question {currentIndex + 1} of {questions.length}
            </span>
            <span className="font-mono text-rose-600 font-semibold">
              Score: {score}/{questions.length}
            </span>
          </div>

          <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden mb-6 border border-[#CCE5F8]/60">
            <div
              className="h-full bg-rose-500 rounded-full transition-all duration-300"
              style={{
                width: `${((currentIndex + (isAnswered ? 1 : 0)) / questions.length) * 100}%`,
              }}
            />
          </div>

          {/* Question Text */}
          <h3 className="font-serif text-xl sm:text-2xl text-[#24324A] font-bold leading-relaxed mb-6">
            {currentQ.question}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let buttonStyle = 'bg-[#EAF6FF]/40 border border-[#CCE5F8] text-[#24324A] hover:border-blue-400 hover:bg-[#EAF6FF] shadow-2xs';
              if (isAnswered) {
                if (isCorrect) {
                  buttonStyle = 'bg-[#DDF7E8] border border-[#A7E9C1] text-[#24324A] font-semibold shadow-2xs';
                } else if (isSelected && !isCorrect) {
                  buttonStyle = 'bg-[#FFDDE8] border border-[#F5B4C9] text-[#24324A] font-semibold shadow-2xs';
                } else {
                  buttonStyle = 'opacity-40 border border-stone-200 text-stone-400 bg-stone-50';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-2xl transition-all flex items-center justify-between cursor-pointer ${buttonStyle}`}
                >
                  <span className="font-sans text-sm font-medium">{option}</span>
                  {isAnswered && (
                    <div>
                      {isCorrect && <CheckCircle className="w-5 h-5 text-emerald-600" />}
                      {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-500" />}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation note when answered */}
          {isAnswered && (
            <div className="mt-6 p-4 bg-lined-paper-yellow rounded-2xl border border-[#F2DE79] animate-in fade-in shadow-2xs">
              <div className="flex items-center gap-1.5 text-xs font-sans font-semibold text-[#24324A]">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>The Story Behind This:</span>
              </div>
              <p className="font-handwriting text-2xl text-[#24324A] font-bold mt-1">
                "{currentQ.explanation}"
              </p>
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={handleNextQuestion}
                className="px-6 py-2.5 bg-[#24324A] hover:bg-[#1A2538] active:scale-95 text-white font-sans text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
              >
                {currentIndex + 1 < questions.length ? 'Next Question →' : 'See My Final Result ✨'}
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Complete Screen */
        <div className="bg-white rounded-3xl border border-[#CCE5F8] p-8 text-center space-y-6 shadow-2xs">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#FFF4B8] border border-[#F2DE79] flex items-center justify-center text-2xl shadow-2xs">
            🏆
          </div>

          <div className="space-y-1">
            <span className="font-sans text-xs uppercase text-rose-600 font-semibold tracking-wider">
              Quiz Completed
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#24324A]">
              {score === questions.length
                ? 'Perfect 100%! You are my true soulmate! 💖'
                : score >= questions.length / 2
                ? 'Great job, handsome! You know me so well! 🥰'
                : 'Still my favorite person ever (even with a few silly mistakes)! 😂'}
            </h3>
            <p className="font-serif text-[#24324A]/80 text-base sm:text-lg">
              You scored <strong className="text-rose-600 font-bold">{score}</strong> out of{' '}
              <strong className="text-[#24324A] font-bold">{questions.length}</strong>!
            </p>
          </div>

          <div className="max-w-md mx-auto bg-lined-paper-pink rounded-2xl border border-[#F5B4C9] p-5 text-left shadow-2xs">
            <div className="flex items-center gap-2 text-rose-600 font-sans text-xs font-semibold mb-1">
              <Award className="w-4 h-4" />
              <span>Official Girlfriend Verdict</span>
            </div>
            <p className="font-handwriting text-2xl text-[#24324A] font-bold leading-relaxed">
              "Whatever your score is, you have 100% of my heart forever and ever. Now come claim your reward hugs!"
            </p>
          </div>

          <div className="pt-2 flex justify-center">
            <button
              type="button"
              onClick={handleRestart}
              className="px-5 py-2.5 bg-[#24324A] hover:bg-[#1A2538] active:scale-95 text-white rounded-xl text-xs sm:text-sm font-sans font-medium flex items-center gap-2 transition-colors cursor-pointer shadow-2xs"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Try Quiz Again</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
