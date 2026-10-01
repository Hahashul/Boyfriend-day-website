import React from 'react';
import { Music, VolumeX, Settings, Heart, Mail } from 'lucide-react';
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

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DFC8]">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2">
        {/* Brand / Title */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onReturnToIntro}
            className="flex items-center gap-1.5 text-stone-800 hover:text-rose-600 transition-colors group cursor-pointer"
            title="Return to envelope intro"
          >
            <span className="font-serif text-lg sm:text-xl font-bold tracking-tight">
              For {boyfriendName || 'You'}
            </span>
            <span className="text-base group-hover:scale-125 transition-transform">💌</span>
          </button>
        </div>

        {/* Navigation Tabs - Scrapbook Tab Ribbon */}
        <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-1 scrollbar-none">
          {navItems.map((item) => {
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-casual whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-rose-50 text-rose-800 font-semibold shadow-xs border border-rose-200/80 -translate-y-0.5'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/70'
                }`}
              >
                <span>{item.icon}</span>
                <span className="hidden xs:inline">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right actions: Music & Customize */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={toggleMusic}
            className={`p-2 rounded-lg border text-xs transition-colors flex items-center gap-1.5 cursor-pointer ${
              isPlayingMusic
                ? 'bg-rose-50 text-rose-700 border-rose-200'
                : 'bg-white/80 text-stone-500 border-stone-200 hover:text-stone-800'
            }`}
            title={isPlayingMusic ? 'Mute romantic lo-fi' : 'Play romantic lo-fi'}
          >
            {isPlayingMusic ? (
              <Music className="w-4 h-4 text-rose-500 animate-spin" style={{ animationDuration: '4s' }} />
            ) : (
              <VolumeX className="w-4 h-4 text-stone-400" />
            )}
            <span className="hidden md:inline font-casual text-xs">
              {isPlayingMusic ? 'Lo-Fi On' : 'Music Off'}
            </span>
          </button>

          <button
            type="button"
            onClick={onOpenCustomize}
            className="px-2.5 py-1.5 rounded-lg bg-stone-900 text-stone-100 hover:bg-stone-800 text-xs font-casual flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Customize names, dates & content"
          >
            <Settings className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Customize</span>
          </button>
        </div>
      </div>
    </header>
  );
};
