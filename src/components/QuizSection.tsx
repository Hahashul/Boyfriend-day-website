import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { QuizQuestion } from '../types/scrapbook';
import { playPopSound, playSparkleSound } from '../utils/audio';
import { CheckCircle, XCircle, RotateCcw, Trophy, Award, Heart, Sparkles } from 'lucide-react';

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
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#F43F5E', '#FBBF24', '#34D399', '#60A5FA'],
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
      <div className="text-center space-y-2">
        <span className="font-casual text-xs font-semibold uppercase text-rose-600 tracking-wider">
          Boyfriend Exam
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-stone-800">
          How Well Do You Know Us? 📝
        </h2>
        <p className="font-handwriting text-lg text-stone-600">
          Let's see if you can score 100% on our favorite memories and inside jokes!
        </p>
      </div>

      {!isCompleted ? (
        /* Active Quiz Card */
        <div className="bg-[#FFFDF9] rounded-3xl border border-[#E8DFC8] p-6 sm:p-8 shadow-xs relative">
          {/* Progress bar */}
          <div className="flex items-center justify-between text-xs font-casual text-stone-500 mb-3">
            <span>
              Question {currentIndex + 1} of {questions.length}
            </span>
            <span className="font-mono text-rose-600 font-semibold">
              Score: {score}/{questions.length}
            </span>
          </div>

          <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden mb-6">
            <div
              className="h-full bg-rose-500 rounded-full transition-all duration-300"
              style={{
                width: `${((currentIndex + (isAnswered ? 1 : 0)) / questions.length) * 100}%`,
              }}
            />
          </div>

          {/* Question Text */}
          <h3 className="font-serif text-xl sm:text-2xl text-stone-900 font-semibold leading-relaxed mb-6">
            {currentQ.question}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let buttonStyle = 'bg-stone-50/80 border-stone-200 text-stone-700 hover:bg-stone-100 hover:border-stone-300';
              if (isAnswered) {
                if (isCorrect) {
                  buttonStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold';
                } else if (isSelected && !isCorrect) {
                  buttonStyle = 'bg-rose-50 border-rose-400 text-rose-900';
                } else {
                  buttonStyle = 'opacity-40 border-stone-200 text-stone-400';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${buttonStyle}`}
                >
                  <span className="font-casual text-sm sm:text-base">{option}</span>
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
            <div className="mt-6 p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl animate-in fade-in">
              <div className="flex items-center gap-1.5 text-xs font-casual font-semibold text-amber-800">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Story Behind This:</span>
              </div>
              <p className="font-handwriting text-xl text-stone-800 mt-1">
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
                className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-casual text-sm font-semibold rounded-xl shadow-xs transition-transform active:scale-95 cursor-pointer"
              >
                {currentIndex + 1 < questions.length ? 'Next Question →' : 'See My Final Result ✨'}
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Complete Screen */
        <div className="bg-[#FFFDF9] rounded-3xl border border-[#E8DFC8] p-8 text-center space-y-6 shadow-sm">
          <div className="w-20 h-20 mx-auto rounded-full bg-rose-100 flex items-center justify-center text-3xl">
            🏆
          </div>

          <div className="space-y-1">
            <span className="font-casual text-xs uppercase text-rose-600 font-semibold tracking-wider">
              Quiz Completed
            </span>
            <h3 className="font-serif text-3xl font-bold text-stone-800">
              {score === questions.length
                ? 'Perfect 100%! You are my true soulmate! 💖'
                : score >= questions.length / 2
                ? 'Great job, handsome! You know me so well! 🥰'
                : 'Still my favorite person ever (even with a few silly mistakes)! 😂'}
            </h3>
            <p className="font-serif text-stone-600 text-lg">
              You scored <strong className="text-rose-600">{score}</strong> out of{' '}
              <strong>{questions.length}</strong>!
            </p>
          </div>

          <div className="max-w-md mx-auto bg-lined-paper rounded-2xl border border-stone-200 p-5 text-left">
            <div className="flex items-center gap-2 text-rose-700 font-casual text-xs font-semibold mb-1">
              <Award className="w-4 h-4" />
              <span>Official Girlfriend Verdict</span>
            </div>
            <p className="font-handwriting text-2xl text-stone-900 leading-relaxed">
              "Whatever your score is, you have 100% of my heart forever and ever. Now come claim your reward hugs!"
            </p>
          </div>

          <div className="pt-2 flex justify-center">
            <button
              type="button"
              onClick={handleRestart}
              className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-100 rounded-xl text-xs sm:text-sm font-casual flex items-center gap-2 transition-colors cursor-pointer"
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
