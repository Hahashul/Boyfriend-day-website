import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { playPopSound, playSparkleSound } from '../utils/audio';
import { StarterPackItem } from '../types/scrapbook';
import { Sparkles, Check, Package } from 'lucide-react';

const STARTER_ITEMS: StarterPackItem[] = [
  {
    id: 'hoodie',
    label: 'THE HOODIE™',
    caption: 'First hug. First date. Still the best cuddle spot.',
    context: 'When I stepped outside the hostel gate on our first date and saw you wearing that soft white hoodie, I instantly hugged you. Still my favorite thing to steal and cuddle in.',
    iconType: 'hoodie',
    tag: 'Attire of Choice',
    badgeColor: 'bg-[#FFE66D]/40 border-[#FFE66D]',
  },
  {
    id: 'dog',
    label: 'DOG DETECTOR™',
    caption: 'Will stop everything to pet literally every dog.',
    context: 'Walking anywhere with Abhi means a mandatory 5-minute pause whenever a four-legged friend appears on the sidewalk. Zero exceptions.',
    iconType: 'dog',
    tag: 'Radar Active',
    badgeColor: 'bg-[#9FE8C1]/40 border-[#9FE8C1]',
  },
  {
    id: 'fuel',
    label: 'FUEL™',
    caption: 'Powered by Red Bull, rolls, Nepali songs & questionable decisions.',
    context: 'The exact chemical formula required to keep this boy running at peak energy from 2 PM to 4 AM.',
    iconType: 'redbull',
    tag: 'Daily Intake',
    badgeColor: 'bg-[#FF9FC4]/40 border-[#FF9FC4]',
  },
  {
    id: 'dance',
    label: 'DANCE MODE™',
    caption: 'Because apparently standing still is not an option.',
    context: 'Give this boy any beat and his feet start moving immediately. Watching you dance is honestly one of my absolute favorite things.',
    iconType: 'dance',
    tag: 'Cannot Stand Still',
    badgeColor: 'bg-[#C9B5FF]/40 border-[#C9B5FF]',
  },
  {
    id: 'ragebait',
    label: 'PROFESSIONAL RAGE-BAITER™',
    caption: 'His favourite hobby is annoying Parina and then laughing at her.',
    context: 'Step 1: Say something absurd with a completely straight face. Step 2: Watch Parina get frustrated. Step 3: Burst out laughing because mission accomplished.',
    iconType: 'ragebait',
    tag: 'Signature Trait',
    badgeColor: 'bg-[#FFE66D]/40 border-[#FFE66D]',
  },
  {
    id: 'rolls',
    label: 'ROLLS™',
    caption: 'The fastest way to Abhi\'s heart.',
    context: 'Forget fancy 5-star restaurants. Hand this man hot, spicy, fresh rolls and you have his loyalty for life.',
    iconType: 'rolls',
    tag: 'S-Tier Food',
    badgeColor: 'bg-[#9FE8C1]/40 border-[#9FE8C1]',
  },
  {
    id: 'nepali',
    label: 'NEPALI MUSIC™',
    caption: 'His playlist has entered the chat.',
    context: 'Assamese by birth, but his music soul belongs to dreamy Nepali acoustic guitar chords and melodious love songs.',
    iconType: 'nepali',
    tag: 'Vibe Check',
    badgeColor: 'bg-[#C9B5FF]/40 border-[#C9B5FF]',
  },
  {
    id: 'baby',
    label: 'PARINA\'S BABY™',
    caption: 'Officially claimed. No returns accepted.',
    context: 'Signed, sealed, certified. You are mine and I am yours — for good.',
    iconType: 'baby',
    tag: 'Final Boss Item',
    badgeColor: 'bg-[#FF9FC4]/40 border-[#FF9FC4]',
  },
];

export const StarterPackSection: React.FC = () => {
  const [unboxedIds, setUnboxedIds] = useState<string[]>(['hoodie']);
  const [activeItem, setActiveItem] = useState<StarterPackItem>(STARTER_ITEMS[0]);

  const handleToggleItem = (item: StarterPackItem) => {
    playPopSound();
    setActiveItem(item);
    if (!unboxedIds.includes(item.id)) {
      const next = [...unboxedIds, item.id];
      setUnboxedIds(next);
      if (next.length === STARTER_ITEMS.length) {
        playSparkleSound();
        confetti({
          particleCount: 30,
          spread: 55,
          origin: { y: 0.65 },
          colors: ['#FFE66D', '#9FE8C1', '#FF9FC4', '#C9B5FF', '#BFE8FF'],
          disableForReducedMotion: true,
        });
      }
    }
  };

  const handleUnboxAll = () => {
    playSparkleSound();
    setUnboxedIds(STARTER_ITEMS.map((i) => i.id));
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#FFE66D', '#9FE8C1', '#FF9FC4'],
      disableForReducedMotion: true,
    });
  };

  const getEmojiIcon = (type: StarterPackItem['iconType']) => {
    switch (type) {
      case 'hoodie':
        return '🧥';
      case 'dog':
        return '🐕';
      case 'redbull':
        return '⚡';
      case 'dance':
        return '🕺';
      case 'ragebait':
        return '😏';
      case 'rolls':
        return '🌯';
      case 'nepali':
        return '🎸';
      case 'baby':
        return '🤍';
      default:
        return '📦';
    }
  };

  const allUnboxed = unboxedIds.length === STARTER_ITEMS.length;

  return (
    <section id="starter-pack" className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-1">
        <span className="inline-block px-3 py-1 bg-[#FFE66D] border border-[#FFE66D] rounded-full font-sans text-xs font-bold uppercase text-[#20304A] tracking-wider shadow-2xs">
          Interactive Unboxing
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#20304A] font-bold tracking-tight">
          THE ABHI STARTER PACK
        </h2>
        <p className="font-handwriting text-xl text-[#20304A]/80">
          Some assembly required.
        </p>
      </div>

      {/* Sticky note discovery */}
      <div className="flex justify-center -mb-2">
        <div className="bg-[#FFE66D] border border-[#F2DE79] px-4 py-1.5 rounded-sm shadow-2xs transform -rotate-1 text-xs font-handwriting text-[#20304A] font-bold">
          📌 "he really will stop for every dog."
        </div>
      </div>

      {/* Unboxing Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: 8 Item Selector Cards */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {STARTER_ITEMS.map((item, index) => {
            const isSelected = activeItem.id === item.id;
            const isUnboxed = unboxedIds.includes(item.id);

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleToggleItem(item)}
                className={`relative rounded-2xl p-3.5 sm:p-4 text-left border transition-all duration-200 cursor-pointer flex flex-col justify-between h-36 ${
                  isSelected
                    ? 'bg-white border-[#20304A] shadow-md -translate-y-1 ring-2 ring-[#20304A]/20'
                    : isUnboxed
                    ? 'bg-white/90 border-[#93D5FD] hover:bg-white hover:border-blue-400 shadow-2xs'
                    : 'bg-[#BFE8FF]/40 border-dashed border-[#93D5FD] hover:bg-[#BFE8FF]/70'
                }`}
              >
                {/* Item Number */}
                <div className="flex items-center justify-between w-full">
                  <span className="font-mono text-[10px] text-[#20304A]/60 font-bold">
                    0{index + 1}
                  </span>
                  {isUnboxed ? (
                    <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-bold">
                      <Check className="w-2.5 h-2.5" />
                    </span>
                  ) : (
                    <span className="text-[10px] text-stone-500 font-mono font-bold">TAP</span>
                  )}
                </div>

                {/* Big Emoji / Icon */}
                <div className="text-3xl my-1 text-center">
                  {getEmojiIcon(item.iconType)}
                </div>

                {/* Title */}
                <div>
                  <h4 className="font-serif font-bold text-xs text-[#20304A] leading-tight line-clamp-1">
                    {item.label}
                  </h4>
                  <p className="text-[10px] font-sans text-[#20304A]/70 line-clamp-1 mt-0.5 font-medium">
                    {item.tag}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: The Inspector Card */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-[#93D5FD] p-6 sm:p-7 shadow-[0_8px_30px_rgba(32,48,74,0.06)] relative overflow-hidden flex flex-col justify-between min-h-[300px]">
          {/* Washi tape */}
          <div className="absolute -top-3 right-8 w-28 h-6 washi-tape-pink transform rotate-2 rounded-xs flex items-center justify-center">
            <span className="text-[9px] font-mono font-bold text-[#20304A] tracking-wider uppercase">
              ITEM INSPECTOR
            </span>
          </div>

          <div className="space-y-4 mt-2">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-sans font-bold border ${activeItem.badgeColor} text-[#20304A]`}>
                {activeItem.tag}
              </span>
              <span className="text-xs font-mono text-[#20304A]/60">Official Spec</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-4xl p-2 bg-[#BFE8FF]/40 rounded-2xl border border-[#93D5FD]">
                {getEmojiIcon(activeItem.iconType)}
              </span>
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#20304A]">
                  {activeItem.label}
                </h3>
                <p className="font-sans text-xs text-[#20304A]/80 font-bold">
                  "{activeItem.caption}"
                </p>
              </div>
            </div>

            {/* Context Box */}
            <div className="bg-[#FFFDF0] rounded-2xl border border-[#FFE66D] p-4 text-[#20304A] text-xs sm:text-sm font-serif leading-relaxed shadow-2xs">
              <span className="font-sans text-[10px] uppercase font-bold tracking-widest text-[#20304A]/70 block mb-1">
                Context & Story
              </span>
              {activeItem.context}
            </div>
          </div>

          {/* Bottom Action */}
          <div className="mt-6 pt-4 border-t border-[#93D5FD]/60 flex items-center justify-between text-xs text-[#20304A]/80">
            <span>
              Unboxed {unboxedIds.length} of {STARTER_ITEMS.length} items
            </span>
            {!allUnboxed ? (
              <button
                type="button"
                onClick={handleUnboxAll}
                className="font-sans font-bold text-blue-800 hover:underline cursor-pointer flex items-center gap-1"
              >
                <Package className="w-3.5 h-3.5" />
                <span>Open All</span>
              </button>
            ) : (
              <span className="font-handwriting text-base font-bold text-emerald-800 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                100% Assembled!
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Post-unboxing note */}
      {allUnboxed && (
        <div className="bg-[#C9B5FF]/30 border border-[#C9B5FF] rounded-2xl p-4 text-center animate-in fade-in duration-300 shadow-2xs max-w-xl mx-auto">
          <p className="font-handwriting text-2xl text-[#20304A] font-bold">
            "Okay. Now you know what you're dealing with."
          </p>
          <span className="text-xs font-sans text-[#20304A]/80 font-medium">
            Next up: Flip through our favorite memories and tap the polaroids to read secret notes!
          </span>
        </div>
      )}
    </section>
  );
};
