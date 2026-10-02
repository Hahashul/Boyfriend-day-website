import React, { useState, useEffect } from 'react';
import { PolaroidMemory, SongTrack } from './types/scrapbook';
import { lofiPlayer, playPopSound } from './utils/audio';
import { IntroScreen } from './components/IntroScreen';
import { Navbar, NavSection } from './components/Navbar';
import { HomeScreen } from './components/HomeScreen';
import { MemoryPolaroids } from './components/MemoryPolaroids';
import { MusicPlayer } from './components/MusicPlayer';
import { GamesSection } from './components/GamesSection';
import { FinalMessage } from './components/FinalMessage';
import { Heart, ChevronRight } from 'lucide-react';
import {
  STORAGE_VERSION,
  MEMORIES as DEFAULT_MEMORIES,
  TRACKS as DEFAULT_TRACKS,
  THEME_SONG,
  NEXT_BUTTONS,
  FOOTER,
} from './components/Content';

const KEYS = {
  memories: `bf_gift_memories_${STORAGE_VERSION}`,
  tracks: `bf_gift_tracks_${STORAGE_VERSION}`,
};

export default function App() {
  const [inScrapbook, setInScrapbook] = useState(false);
  const [currentSection, setCurrentSection] = useState<NavSection>('home');
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  // Names and dates are fixed per copy of the site: edit them in Content.tsx

  const [memories, setMemories] = useState<PolaroidMemory[]>(() => {
    try {
      const saved = localStorage.getItem(KEYS.memories);
      return saved ? JSON.parse(saved) : DEFAULT_MEMORIES;
    } catch {
      return DEFAULT_MEMORIES;
    }
  });

  const [tracks, setTracks] = useState<SongTrack[]>(() => {
    try {
      const saved = localStorage.getItem(KEYS.tracks);
      return saved ? JSON.parse(saved) : DEFAULT_TRACKS;
    } catch {
      return DEFAULT_TRACKS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(KEYS.memories, JSON.stringify(memories));
    } catch (e) {
      console.debug('Failed to save memories', e);
    }
  }, [memories]);

  useEffect(() => {
    try {
      localStorage.setItem(KEYS.tracks, JSON.stringify(tracks));
    } catch (e) {
      console.debug('Failed to save tracks', e);
    }
  }, [tracks]);

  // Keep isPlayingMusic synced with the global audio engine
  useEffect(() => {
    const unsubscribe = lofiPlayer.subscribe((playing) => {
      setIsPlayingMusic(playing);
    });
    return unsubscribe;
  }, []);

  // Audio Toggle for "her" — JVKE
  const toggleMusic = () => {
    if (isPlayingMusic) {
      lofiPlayer.pause();
      setIsPlayingMusic(false);
    } else {
      lofiPlayer.start(THEME_SONG.url).then((started) => {
        setIsPlayingMusic(started);
      });
    }
  };

  const handleAddMemory = (newMemory: PolaroidMemory) => {
    setMemories((prev) => [newMemory, ...prev]);
  };

  const handleDeleteMemory = (id: string) => {
    setMemories((prev) => prev.filter((m) => m.id !== id));
  };

  const handleAddTrack = (newTrack: SongTrack) => {
    setTracks((prev) => [...prev, newTrack]);
  };

  const navigateTo = (section: NavSection) => {
    playPopSound();
    setCurrentSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If not entered scrapbook yet, show the Intro envelope landing
  if (!inScrapbook) {
    return (
      <IntroScreen
        onEnter={() => setInScrapbook(true)}
        isPlayingMusic={isPlayingMusic}
        toggleMusic={toggleMusic}
      />
    );
  }

  // Next section map for smooth one-click progression
  // Next section map for smooth one-click progression (labels live in Content.tsx)
  const nextSectionMap: Record<NavSection, { next: NavSection; label: string; icon: string }> = {
    home: { next: 'memories', ...NEXT_BUTTONS.home },
    memories: { next: 'music', ...NEXT_BUTTONS.memories },
    music: { next: 'quiz', ...NEXT_BUTTONS.music },
    quiz: { next: 'letter', ...NEXT_BUTTONS.quiz },
    letter: { next: 'home', ...NEXT_BUTTONS.letter },
  };

  const currentNext = nextSectionMap[currentSection];

  return (
    <div className="min-h-screen bg-[#BFE8FF] bg-scrapbook-canvas text-[#20304A] font-sans selection:bg-[#FF9FC4] selection:text-[#20304A] flex flex-col justify-between">
      {/* Draft-1 Navigation Header */}
      <Navbar
        currentSection={currentSection}
        onSelectSection={(sec) => navigateTo(sec)}
        isPlayingMusic={isPlayingMusic}
        toggleMusic={toggleMusic}
        onReturnToIntro={() => setInScrapbook(false)}
      />

      {/* Main Content Area - Preserving Draft-1 Section Pages */}
      <main className="flex-1 pb-12 animate-in fade-in duration-200">
        {currentSection === 'home' && (
          <HomeScreen />
        )}

        {currentSection === 'memories' && (
          <MemoryPolaroids
            memories={memories}
            onAddMemory={handleAddMemory}
            onDeleteMemory={handleDeleteMemory}
          />
        )}

        {currentSection === 'music' && (
          <MusicPlayer
            tracks={tracks}
            onAddCustomTrack={handleAddTrack}
          />
        )}

        {currentSection === 'quiz' && (
          <GamesSection />
        )}

        {currentSection === 'letter' && (
          <FinalMessage />
        )}

        {/* Playful Scrapbook Section Transition Button */}
        <div className="max-w-md mx-auto px-4 mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => navigateTo(currentNext.next)}
            className="w-full py-3 px-5 bg-white/95 hover:bg-white border border-[#93D5FD] hover:border-blue-400 rounded-2xl shadow-sm text-xs sm:text-sm font-sans font-bold text-[#20304A] flex items-center justify-between group transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="text-base">{currentNext.icon}</span>
              <span>Next: {currentNext.label}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </main>

      {/* Scrapbook Footer */}
      <footer className="border-t border-[#93D5FD] bg-white/90 backdrop-blur-xs py-8 px-4 text-center">
        <div className="max-w-md mx-auto space-y-2.5">
          <div className="flex items-center justify-center gap-2 text-rose-500">
            <Heart className="w-4 h-4 fill-rose-500" />
            <span className="font-handwriting text-2xl sm:text-3xl text-[#20304A] font-bold">
              {FOOTER.title}
            </span>
          </div>

          <div className="flex items-center justify-center gap-3 text-xs text-[#20304A]/70 font-sans font-bold pt-1">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-blue-700 underline cursor-pointer"
            >
              Back to Top ↑
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => setInScrapbook(false)}
              className="hover:text-rose-600 underline cursor-pointer"
            >
              Envelope View 💌
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}