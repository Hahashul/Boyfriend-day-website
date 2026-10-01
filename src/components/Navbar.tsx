import React from 'react';
import { Music, VolumeX, Settings } from 'lucide-react';
import { playPopSound } from '../utils/audio';

export type NavSection = 'home' | 'music' | 'memories' | 'games' | 'quiz' | 'letter';

interface NavbarProps {
  currentSection: NavSection;
  onSelectSection: (section: NavSection) => void;
  isPlayingMusic: boolean;
  toggleMusic: () => void;
  onOpenCustomize: () => void;
  onReturnToIntro: () => void;
  boyfriendName: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSection,
  onSelectSection,
  isPlayingMusic,
  toggleMusic,
  onOpenCustomize,
  onReturnToIntro,
  boyfriendName,
}) => {
  const navItems: { id: NavSection; label: string; icon: string }[] = [
    { id: 'home', label: 'Our Corner', icon: '🏡' },
    { id: 'music', label: 'Cassette', icon: '🎵' },
    { id: 'memories', label: 'Polaroids', icon: '📸' },
    { id: 'games', label: 'Games', icon: '🎮' },
    { id: 'quiz', label: 'Love Quiz', icon: '📝' },
    { id: 'letter', label: 'Love Letter', icon: '💌' },
  ];

  const handleNavClick = (section: NavSection) => {
    playPopSound();
    onSelectSection(section);
  };

  const tabColors: Record<NavSection, { active: string }> = {
    home: { active: 'bg-[#FFF4B8] text-[#24324A] border-[#EBD668] shadow-2xs -translate-y-0.5 font-semibold' },
    music: { active: 'bg-[#E9DEFF] text-[#24324A] border-[#CFB7FF] shadow-2xs -translate-y-0.5 font-semibold' },
    memories: { active: 'bg-[#FFDDE8] text-[#24324A] border-[#F5B4C9] shadow-2xs -translate-y-0.5 font-semibold' },
    games: { active: 'bg-[#DDF7E8] text-[#24324A] border-[#A7E9C1] shadow-2xs -translate-y-0.5 font-semibold' },
    quiz: { active: 'bg-[#FFF4B8] text-[#24324A] border-[#EBD668] shadow-2xs -translate-y-0.5 font-semibold' },
    letter: { active: 'bg-[#FFDDE8] text-[#24324A] border-[#F5B4C9] shadow-2xs -translate-y-0.5 font-semibold' },
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#CCE5F8] shadow-2xs">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Brand / Title */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onReturnToIntro}
            className="flex items-center gap-1.5 text-[#24324A] hover:text-blue-600 transition-colors group cursor-pointer"
            title="Return to envelope intro"
          >
            <span className="font-serif text-lg sm:text-xl font-bold tracking-tight">
              For {boyfriendName || 'You'}
            </span>
            <span className="text-base group-hover:scale-125 transition-transform">💌</span>
          </button>
        </div>

        {/* Navigation Tabs - Pastel Color-Coded Chips */}
        <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-1 scrollbar-none">
          {navItems.map((item) => {
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-sans whitespace-nowrap transition-all cursor-pointer border ${
                  isActive
                    ? tabColors[item.id].active
                    : 'text-[#24324A]/70 hover:text-[#24324A] hover:bg-[#EAF6FF] border-transparent font-medium'
                }`}
              >
                <span>{item.icon}</span>
                <span className="hidden xs:inline">{item.label}</span>
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
                ? 'bg-[#FFDDE8] text-[#24324A] border-[#F5B4C9] shadow-2xs font-semibold'
                : 'bg-white text-[#24324A]/70 border-[#CCE5F8] hover:bg-[#EAF6FF]'
            }`}
            title={isPlayingMusic ? 'Mute gentle lo-fi' : 'Play gentle lo-fi'}
          >
            {isPlayingMusic ? (
              <Music className="w-3.5 h-3.5 text-rose-500 animate-spin" style={{ animationDuration: '4s' }} />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-stone-400" />
            )}
            <span className="hidden md:inline font-sans text-xs">
              {isPlayingMusic ? 'Lo-Fi On' : 'Music Off'}
            </span>
          </button>

          <button
            type="button"
            onClick={onOpenCustomize}
            className="px-3.5 py-1.5 rounded-xl bg-[#24324A] hover:bg-[#1A2538] active:scale-95 text-white text-xs font-sans font-medium flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
            title="Personalize names, dates & content"
          >
            <Settings className="w-3.5 h-3.5 text-blue-200" />
            <span className="hidden sm:inline">Personalize</span>
          </button>
        </div>
      </div>
    </header>
  );
};
