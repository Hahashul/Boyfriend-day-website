import React from 'react';
import { Music, VolumeX } from 'lucide-react';
import { playPopSound } from '../utils/audio';
import { NAV, THEME_SONG } from './Content';

export type NavSection = 'home' | 'memories' | 'music' | 'quiz' | 'letter';

// Backwards compatibility alias
export type NavChapter = NavSection | 'our-firsts' | 'how-we-started' | 'timeline' | 'very-abhi' | 'our-places' | 'games' | 'final-letter';

interface NavbarProps {
  currentSection: NavSection;
  onSelectSection: (section: NavSection) => void;
  isPlayingMusic: boolean;
  toggleMusic: () => void;
  onReturnToIntro: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSection,
  onSelectSection,
  isPlayingMusic,
  toggleMusic,
  onReturnToIntro,
}) => {
  const sections: { id: NavSection; label: string; icon: string; color: string }[] = [
    { id: 'home', ...NAV.home, color: 'bg-[#FFE66D]' },
    { id: 'memories', ...NAV.memories, color: 'bg-[#FF9FC4]' },
    { id: 'music', ...NAV.music, color: 'bg-[#C9B5FF]' },
    { id: 'quiz', ...NAV.quiz, color: 'bg-[#FFE66D]' },
    { id: 'letter', ...NAV.letter, color: 'bg-[#FF8F70]' },
  ];

  const handleSectionClick = (id: NavSection) => {
    playPopSound();
    onSelectSection(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#93D5FD] shadow-2xs">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Brand / Title */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onReturnToIntro}
            className="flex items-center gap-1.5 text-[#20304A] hover:text-blue-600 transition-colors group cursor-pointer"
            title="Return to envelope intro"
          >
            <span className="font-serif text-base sm:text-lg font-bold tracking-tight">
              {NAV.brand}
            </span>
            <span className="text-sm group-hover:scale-125 transition-transform">💌</span>
          </button>
        </div>

        {/* Navigation Tabs - Draft 1 Sections */}
        <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-1 scrollbar-none max-w-xl">
          {sections.map((item) => {
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSectionClick(item.id)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-sans whitespace-nowrap transition-all cursor-pointer border ${
                  isActive
                    ? `${item.color} text-[#20304A] border-[#20304A]/40 shadow-xs font-bold -translate-y-0.5`
                    : 'text-[#20304A]/75 hover:text-[#20304A] hover:bg-[#BFE8FF]/40 border-transparent font-medium'
                }`}
              >
                <span>{item.icon}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right actions: Music & Personalize */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={toggleMusic}
            className={`px-3 py-1.5 rounded-xl border text-xs transition-colors flex items-center gap-1.5 cursor-pointer ${
              isPlayingMusic
                ? 'bg-[#FF9FC4] text-[#20304A] border-[#FF80B2] shadow-2xs font-semibold'
                : 'bg-white text-[#20304A]/75 border-[#93D5FD] hover:bg-[#BFE8FF]/40'
            }`}
            title={isPlayingMusic ? THEME_SONG.pauseTitle : THEME_SONG.playTitle}
          >
            {isPlayingMusic ? (
              <Music className="w-3.5 h-3.5 text-[#20304A] animate-spin" style={{ animationDuration: '4s' }} />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-stone-400" />
            )}
            <span className="hidden sm:inline font-sans text-xs font-semibold">
              {isPlayingMusic ? THEME_SONG.playingLabel : THEME_SONG.playLabel}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};