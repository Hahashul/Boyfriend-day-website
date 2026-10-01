import React, { useState, useEffect } from 'react';
import { ScrapbookSettings, PolaroidMemory, SongTrack, QuizQuestion, LoveReason } from './types/scrapbook';
import { lofiPlayer } from './utils/audio';
import { IntroScreen } from './components/IntroScreen';
import { Navbar, NavSection } from './components/Navbar';
import { HomeScreen } from './components/HomeScreen';
import { MusicPlayer } from './components/MusicPlayer';
import { MemoryPolaroids } from './components/MemoryPolaroids';
import { GamesSection } from './components/GamesSection';
import { QuizSection } from './components/QuizSection';
import { FinalMessage } from './components/FinalMessage';
import { PersonalizeModal } from './components/PersonalizeModal';

const DEFAULT_SETTINGS: ScrapbookSettings = {
  boyfriendName: 'My Handsome Boy',
  senderName: 'Your Girl',
  anniversaryDate: '2024-06-15',
  specialNickname: 'Cutie',
  themeColor: '#FAF7F2',
};

const DEFAULT_MEMORIES: PolaroidMemory[] = [
  {
    id: 'mem-1',
    title: 'The Coffee Date',
    date: 'Day 1',
    caption: 'When 20 minutes turned into 4 hours',
    noteOnBack:
      'I remember you ordered a latte and got foam on your nose. I knew right then and there that I wanted to spend every single morning with you.',
    doodleType: 'coffee',
    rotation: -2,
  },
  {
    id: 'mem-2',
    title: 'Holding Hands',
    date: 'Autumn Breeze',
    caption: 'My hand found its favorite home',
    noteOnBack:
      'We were walking in the cold and you gently slid your hand into my coat pocket to hold mine. My heart was racing so fast!',
    doodleType: 'hands',
    rotation: 2.5,
  },
  {
    id: 'mem-3',
    title: 'Stargazing Night',
    date: 'Midnight Magic',
    caption: 'Talking about everything & nothing under the sky',
    noteOnBack:
      'The sky was full of stars, but honestly, I spent most of the time just looking at your face while you talked passionately about your dreams.',
    doodleType: 'stargazing',
    rotation: -1.5,
  },
  {
    id: 'mem-4',
    title: 'Movie Marathon',
    date: 'Rainy Sunday',
    caption: 'Popcorn fights and warm blankets',
    noteOnBack:
      'We never actually finished the movie because we paused it to argue about the silliest plot hole for two hours straight.',
    doodleType: 'cinema',
    rotation: 3,
  },
  {
    id: 'mem-5',
    title: 'Lazy Mornings',
    date: 'Weekend Bliss',
    caption: 'Just two sleepyheads refusing to get up',
    noteOnBack:
      'Waking up and seeing your messy morning hair is literally the sweetest part of my week. Never change.',
    doodleType: 'cozy',
    rotation: -2.8,
  },
  {
    id: 'mem-6',
    title: 'Golden Hour Walk',
    date: 'Summer Sunset',
    caption: 'The sun was setting, but you were glowing',
    noteOnBack:
      'You turned around to laugh at something silly I said, and the sunlight caught your eyes. A core memory forever.',
    doodleType: 'sunset',
    rotation: 1.8,
  },
];

const DEFAULT_TRACKS: SongTrack[] = [
  {
    id: 'track-1',
    title: 'Our First Dance (Lofi Melody)',
    artist: 'Vintage Acoustic',
    duration: '3:15',
    lofiMelodyKey: 0,
    note: 'The gentle song that was playing when we had our very first slow dance together.',
  },
  {
    id: 'track-2',
    title: 'Midnight Conversations',
    artist: 'Dreamy Chords',
    duration: '2:48',
    lofiMelodyKey: 1,
    note: 'For the nights we stayed awake until 3 AM talking about life, dreams, and our future.',
  },
  {
    id: 'track-3',
    title: 'Stargazing With You',
    artist: 'Night Sky Serenade',
    duration: '3:30',
    lofiMelodyKey: 2,
    note: 'A soft reminder that no matter how chaotic the world gets, you are my peaceful place.',
  },
];

const DEFAULT_REASONS: LoveReason[] = [
  { id: '1', text: 'The way your eyes crinkle whenever you laugh really hard at a silly joke.', color: '#FBCFE8' },
  { id: '2', text: 'How you always make sure I walk on the safe side of the sidewalk.', color: '#BBF7D0' },
  { id: '3', text: 'Your warm tight hugs after a long, exhausting day.', color: '#BAE6FD' },
  { id: '4', text: 'The sweet forehead kisses you give me when you think I am asleep.', color: '#FED7AA' },
  { id: '5', text: 'How patient and kind you are with me when I get indecisive or overwhelmed.', color: '#E9D5FF' },
  { id: '6', text: 'The goofy dance moves you do in the kitchen when making toast.', color: '#FEF08A' },
  { id: '7', text: 'That you believe in my dreams even more than I believe in myself sometimes.', color: '#FCE7F3' },
  { id: '8', text: 'How safe, protected, and cherished I feel whenever you are near.', color: '#CCFBF1' },
];

const DEFAULT_QUIZ: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Where did we share our very first unforgettable moment together?',
    options: ['At a cozy quiet coffee shop', 'Under the starlight on a chilly walk', 'During a spontaneous late night drive', 'While laughing over spilled drinks'],
    correctIndex: 0,
    explanation: 'That warm afternoon when we ordered coffee and talked until the sun set!',
  },
  {
    id: 'q2',
    question: 'Who is the one guilty of stealing the blankets in the middle of the night?',
    options: ['Definitely you!', 'Me (guilty as charged!)', 'The invisible bed monster', 'Both of us equally in a tug of war'],
    correctIndex: 1,
    explanation: 'Okay fine, I admit it! I like rolling up like a cozy burrito!',
  },
  {
    id: 'q3',
    question: 'What is my absolute favorite thing to do with you on a rainy weekend?',
    options: ['Go to a loud bustling party', 'Cuddle on the couch, watch movies & eat snacks', 'Go hiking in the cold rain', 'Fold laundry for 6 hours'],
    correctIndex: 1,
    explanation: 'Cuddling under a warm blanket with popcorn is paradise with you.',
  },
  {
    id: 'q4',
    question: 'How much do I love you on a scale from 1 to 10?',
    options: ['A solid 10', '100 out of 10', 'Infinity and beyond with all the galaxies in between', 'More than all the french fries in the world'],
    correctIndex: 2,
    explanation: 'There is no number high enough to measure how much you mean to me!',
  },
];

export default function App() {
  // Navigation & Screen states
  const [inScrapbook, setInScrapbook] = useState(false);
  const [currentSection, setCurrentSection] = useState<NavSection>('home');
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);

  // Settings & Content with LocalStorage persistence
  const [settings, setSettings] = useState<ScrapbookSettings>(() => {
    try {
      const saved = localStorage.getItem('bf_gift_settings');
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [memories, setMemories] = useState<PolaroidMemory[]>(() => {
    try {
      const saved = localStorage.getItem('bf_gift_memories');
      return saved ? JSON.parse(saved) : DEFAULT_MEMORIES;
    } catch {
      return DEFAULT_MEMORIES;
    }
  });

  const [tracks, setTracks] = useState<SongTrack[]>(() => {
    try {
      const saved = localStorage.getItem('bf_gift_tracks');
      return saved ? JSON.parse(saved) : DEFAULT_TRACKS;
    } catch {
      return DEFAULT_TRACKS;
    }
  });

  // Save to localStorage whenever modified
  useEffect(() => {
    try {
      localStorage.setItem('bf_gift_settings', JSON.stringify(settings));
    } catch (e) {
      console.debug('Failed to save settings', e);
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem('bf_gift_memories', JSON.stringify(memories));
    } catch (e) {
      console.debug('Failed to save memories', e);
    }
  }, [memories]);

  useEffect(() => {
    try {
      localStorage.setItem('bf_gift_tracks', JSON.stringify(tracks));
    } catch (e) {
      console.debug('Failed to save tracks', e);
    }
  }, [tracks]);

  // Audio Toggle
  const toggleMusic = () => {
    if (isPlayingMusic) {
      lofiPlayer.stop();
      setIsPlayingMusic(false);
    } else {
      lofiPlayer.start(0);
      setIsPlayingMusic(true);
    }
  };

  // Add polaroid memory
  const handleAddMemory = (newMemory: PolaroidMemory) => {
    setMemories((prev) => [newMemory, ...prev]);
  };

  const handleDeleteMemory = (id: string) => {
    setMemories((prev) => prev.filter((m) => m.id !== id));
  };

  // Add custom track
  const handleAddTrack = (newTrack: SongTrack) => {
    setTracks((prev) => [...prev, newTrack]);
  };

  const handleResetDefaults = () => {
    setSettings(DEFAULT_SETTINGS);
    setMemories(DEFAULT_MEMORIES);
    setTracks(DEFAULT_TRACKS);
    try {
      localStorage.removeItem('bf_gift_settings');
      localStorage.removeItem('bf_gift_memories');
      localStorage.removeItem('bf_gift_tracks');
    } catch (e) {
      console.debug('Error clearing storage', e);
    }
  };

  // First screen: The tactile Intro Screen
  if (!inScrapbook) {
    return (
      <IntroScreen
        onEnter={() => setInScrapbook(true)}
        boyfriendName={settings.boyfriendName}
        senderName={settings.senderName}
        isPlayingMusic={isPlayingMusic}
        toggleMusic={toggleMusic}
      />
    );
  }

  // Inside the website scrapbook
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#3D352E] flex flex-col font-sans selection:bg-rose-100 selection:text-rose-900">
      {/* Scrapbook Navigation Bar */}
      <Navbar
        currentSection={currentSection}
        onSelectSection={(sec) => setCurrentSection(sec)}
        isPlayingMusic={isPlayingMusic}
        toggleMusic={toggleMusic}
        onOpenCustomize={() => setIsCustomizeOpen(true)}
        onReturnToIntro={() => setInScrapbook(false)}
        boyfriendName={settings.boyfriendName}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {currentSection === 'home' && (
          <HomeScreen
            boyfriendName={settings.boyfriendName}
            senderName={settings.senderName}
            anniversaryDate={settings.anniversaryDate}
            specialNickname={settings.specialNickname}
            onNavigate={(sec) => setCurrentSection(sec)}
          />
        )}

        {currentSection === 'music' && (
          <MusicPlayer
            tracks={tracks}
            onAddCustomTrack={handleAddTrack}
            boyfriendName={settings.boyfriendName}
          />
        )}

        {currentSection === 'memories' && (
          <MemoryPolaroids
            memories={memories}
            onAddMemory={handleAddMemory}
            onDeleteMemory={handleDeleteMemory}
            boyfriendName={settings.boyfriendName}
          />
        )}

        {currentSection === 'games' && (
          <GamesSection
            reasons={DEFAULT_REASONS}
            boyfriendName={settings.boyfriendName}
            senderName={settings.senderName}
          />
        )}

        {currentSection === 'quiz' && (
          <QuizSection
            questions={DEFAULT_QUIZ}
            boyfriendName={settings.boyfriendName}
            senderName={settings.senderName}
          />
        )}

        {currentSection === 'letter' && (
          <FinalMessage
            boyfriendName={settings.boyfriendName}
            senderName={settings.senderName}
            anniversaryDate={settings.anniversaryDate}
          />
        )}
      </main>

      {/* Sweet Scrapbook Footer */}
      <footer className="border-t border-[#E8DFC8] bg-[#FAF7F2] py-8 px-4 text-center">
        <div className="max-w-md mx-auto space-y-2">
          <p className="font-handwriting text-xl text-stone-700">
            Handcrafted with infinite love, hugs & kisses for {settings.boyfriendName || 'You'} ♡
          </p>
          <div className="flex items-center justify-center gap-3 text-xs text-stone-400 font-casual">
            <span>Special Surprise Gift</span>
            <span>·</span>
            <button
              type="button"
              onClick={() => setInScrapbook(false)}
              className="hover:text-rose-600 underline cursor-pointer"
            >
              Envelope View
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => setIsCustomizeOpen(true)}
              className="hover:text-rose-600 underline cursor-pointer"
            >
              Edit Names & Date
            </button>
          </div>
        </div>
      </footer>

      {/* Personalization Modal */}
      <PersonalizeModal
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        settings={settings}
        onSave={(newSettings) => setSettings(newSettings)}
        onResetDefaults={handleResetDefaults}
      />
    </div>
  );
}
