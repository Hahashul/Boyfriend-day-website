import React, { useState, useEffect } from 'react';
import { ScrapbookSettings, PolaroidMemory, SongTrack } from './types/scrapbook';
import { lofiPlayer, playPopSound } from './utils/audio';
import { IntroScreen } from './components/IntroScreen';
import { Navbar, NavSection } from './components/Navbar';
import { HomeScreen } from './components/HomeScreen';
import { StarterPackSection } from './components/StarterPackSection';
import { MemoryPolaroids } from './components/MemoryPolaroids';
import { MusicPlayer } from './components/MusicPlayer';
import { GamesSection } from './components/GamesSection';
import { FinalMessage } from './components/FinalMessage';
import { PersonalizeModal } from './components/PersonalizeModal';
import { Heart, ChevronRight } from 'lucide-react';

const DEFAULT_SETTINGS: ScrapbookSettings = {
  boyfriendName: 'Abhinab P Kashyap',
  senderName: 'Parina',
  anniversaryDate: '2024-10-20',
  specialNickname: 'Abhi',
  themeColor: '#BFE8FF',
};

const DEFAULT_MEMORIES: PolaroidMemory[] = [
  {
    id: 'mem-1',
    title: 'The White Hoodie Hug',
    date: '20 Oct 2024',
    caption: 'First hug outside the hostel gate',
    noteOnBack:
      'I stepped outside the gate and saw you waiting in that soft white hoodie. The warmest, safest hug in the world. Still my favorite place to be.',
    doodleType: 'cozy',
    rotation: -2,
  },
  {
    id: 'mem-2',
    title: 'Señorita Salsa at the Club',
    date: 'The Origin Night',
    caption: 'Akshita dragged me, and you were there',
    noteOnBack:
      'You making sure us girls were safe from drunk strangers, dancing salsa with me to Señorita, and sitting on the cold balcony stairs talking for hours.',
    doodleType: 'cinema',
    rotation: 2.2,
  },
  {
    id: 'mem-3',
    title: 'McDonald\'s First Date',
    date: '20 Oct 2024',
    caption: 'Auto ride & McSpicy side-by-side',
    noteOnBack:
      'Sitting side-by-side in the auto when you held out your hand and gave me butterflies. Later sitting together at McDonald\'s — our official first date memory.',
    doodleType: 'hands',
    rotation: -1.6,
  },
  {
    id: 'mem-4',
    title: 'Sculpture Park Afternoons',
    date: 'Early Days',
    caption: 'Quiet strolls & endless laughter',
    noteOnBack:
      'Walking leisurely around the sculptures, sitting on the grass, sharing snacks, and learning every single detail about your childhood and dreams.',
    doodleType: 'sunset',
    rotation: 1.5,
  },
  {
    id: 'mem-5',
    title: 'Puri Beach & Ocean Waves',
    date: 'Puri Trip',
    caption: 'Golden sand & crashing waves',
    noteOnBack:
      'Taking dozens of sweet pictures by the tide and having the time of our lives watching the waves crash at sunset.',
    doodleType: 'hands',
    rotation: 2.5,
  },
  {
    id: 'mem-6',
    title: 'Playful Ocean "Drowning"',
    date: 'Puri Trip',
    caption: 'Lifting me into the waves',
    noteOnBack:
      'You lifting me into the crashing waves and pretending to "drown" me while I screamed and laughed at the top of my lungs. Unforgettable.',
    doodleType: 'hands',
    rotation: -1.8,
  },
  {
    id: 'mem-7',
    title: 'Darjeeling Mall Road Walk',
    date: 'Darjeeling',
    caption: 'Holding your bicep in the freezing air',
    noteOnBack:
      'You styling my outfits against the cold, kneeling on the cobblestones to tie my shoelaces every single time, and a stranger saying "God bless u both."',
    doodleType: 'coffee',
    rotation: -2.4,
  },
  {
    id: 'mem-8',
    title: 'Holi in Darjeeling',
    date: 'Holi 2026',
    caption: 'Colors, mountain fog & cold breeze',
    noteOnBack:
      'Celebrating with colors in the chilly mountain air, bundled up together, throwing colors and laughing until our stomachs hurt.',
    doodleType: 'coffee',
    rotation: 2.1,
  },
  {
    id: 'mem-9',
    title: 'Overnight Bus to Kolkata',
    date: 'Heading Home',
    caption: 'Sleeping on each other’s laps',
    noteOnBack:
      'Exhausted from the mountain chill and travels, sharing earphones and resting on each other’s laps all through the dark winding night roads.',
    doodleType: 'cozy',
    rotation: 1.6,
  },
  {
    id: 'mem-10',
    title: 'Euphoria Birthday & Kiss Tee',
    date: 'Abhi’s Birthday',
    caption: 'All-black party & customized kisses',
    noteOnBack:
      'Surprising you with the white T-shirt stamped with dozens of my lipstick kisses. Your big genuine smile was worth everything.',
    doodleType: 'stargazing',
    rotation: 1.8,
  },
  {
    id: 'mem-11',
    title: 'Pink Barbie & Stanley',
    date: 'Sweet Gifts',
    caption: 'Keychains, Stanley & pink sleeping mask',
    noteOnBack:
      'Barbie keychain for my room key, pink Stanley cup, and pink sleeping eye mask. He knows his pink-aesthetic girl well.',
    doodleType: 'stargazing',
    rotation: -1.5,
  },
  {
    id: 'mem-12',
    title: 'Saree & McDonald\'s Replay',
    date: '1st Anniversary / Diwali',
    caption: 'Wearing the exact 20 Oct 2024 top',
    noteOnBack:
      'Draped a saree for Diwali lunch with our friends, then snuck away to McDonald\'s in my first-date top to recreate our very first date together.',
    doodleType: 'sunset',
    rotation: -1.2,
  },
];

const DEFAULT_TRACKS: SongTrack[] = [
  {
    id: 'track-1',
    title: 'her',
    artist: 'JVKE',
    duration: '2:56',
    lofiMelodyKey: 0,
    note: 'The first song he dedicated to me.',
  },
  {
    id: 'track-2',
    title: 'Laakhau Hajarau',
    artist: 'Yabesh Thapa',
    duration: '3:45',
    lofiMelodyKey: 1,
    note: 'He explained the Nepali lyrics to me because I didn’t understand them. Then we slow-danced to it.',
  },
  {
    id: 'track-3',
    title: 'Señorita',
    artist: 'Camila Cabello & Shawn Mendes',
    duration: '3:11',
    lofiMelodyKey: 2,
    note: 'Our first dance together.',
  },
  {
    id: 'track-4',
    title: 'Dildara',
    artist: 'Shafqat Amanat Ali',
    duration: '4:11',
    lofiMelodyKey: 0,
    note: '',
  },
  {
    id: 'track-5',
    title: 'Itni Si Baat Hai — Female Part',
    artist: 'Antara Mitra & Arijit Singh',
    duration: '3:15',
    lofiMelodyKey: 1,
    note: '',
  },
  {
    id: 'track-6',
    title: 'Mai Rang Sharbaton Ka — starting part',
    artist: 'Atif Aslam & Chinmayi Sripaada',
    duration: '2:40',
    lofiMelodyKey: 2,
    note: '',
  },
  {
    id: 'track-7',
    title: 'Tera Rasta Chhodun Na',
    artist: 'Amitabh Bhattacharya & Anusha Mani',
    duration: '4:14',
    lofiMelodyKey: 0,
    note: '',
  },
  {
    id: 'track-8',
    title: 'Tum Se Hi',
    artist: 'Mohit Chauhan',
    duration: '5:23',
    lofiMelodyKey: 1,
    note: '',
  },
  {
    id: 'track-9',
    title: 'Ishq Sufiana',
    artist: 'Kamal Khan',
    duration: '5:27',
    lofiMelodyKey: 2,
    note: '',
  },
];

export default function App() {
  const [inScrapbook, setInScrapbook] = useState(false);
  const [currentSection, setCurrentSection] = useState<NavSection>('home');
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);

  // Settings & Content persistence
  const [settings, setSettings] = useState<ScrapbookSettings>(() => {
    try {
      const saved = localStorage.getItem('bf_gift_settings_v4');
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [memories, setMemories] = useState<PolaroidMemory[]>(() => {
    try {
      const saved = localStorage.getItem('bf_gift_memories_v4');
      return saved ? JSON.parse(saved) : DEFAULT_MEMORIES;
    } catch {
      return DEFAULT_MEMORIES;
    }
  });

  const [tracks, setTracks] = useState<SongTrack[]>(() => {
    try {
      const saved = localStorage.getItem('bf_gift_tracks_v4');
      return saved ? JSON.parse(saved) : DEFAULT_TRACKS;
    } catch {
      return DEFAULT_TRACKS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('bf_gift_settings_v4', JSON.stringify(settings));
    } catch (e) {
      console.debug('Failed to save settings', e);
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem('bf_gift_memories_v4', JSON.stringify(memories));
    } catch (e) {
      console.debug('Failed to save memories', e);
    }
  }, [memories]);

  useEffect(() => {
    try {
      localStorage.setItem('bf_gift_tracks_v4', JSON.stringify(tracks));
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

  const handleAddMemory = (newMemory: PolaroidMemory) => {
    setMemories((prev) => [newMemory, ...prev]);
  };

  const handleDeleteMemory = (id: string) => {
    setMemories((prev) => prev.filter((m) => m.id !== id));
  };

  const handleAddTrack = (newTrack: SongTrack) => {
    setTracks((prev) => [...prev, newTrack]);
  };

  const handleResetDefaults = () => {
    setSettings(DEFAULT_SETTINGS);
    setMemories(DEFAULT_MEMORIES);
    setTracks(DEFAULT_TRACKS);
    try {
      localStorage.removeItem('bf_gift_settings_v4');
      localStorage.removeItem('bf_gift_memories_v4');
      localStorage.removeItem('bf_gift_tracks_v4');
    } catch (e) {
      console.debug('Error clearing storage', e);
    }
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
        boyfriendName={settings.boyfriendName}
        senderName={settings.senderName}
        isPlayingMusic={isPlayingMusic}
        toggleMusic={toggleMusic}
      />
    );
  }

  // Next section map for smooth one-click progression
  const nextSectionMap: Record<NavSection, { next: NavSection; label: string; icon: string }> = {
    'home': { next: 'starter-pack', label: 'Unbox The Abhi Starter Pack', icon: '📦' },
    'starter-pack': { next: 'memories', label: 'View Our Photo Polaroids', icon: '📸' },
    'memories': { next: 'music', label: 'Listen to Our Mixtape', icon: '📼' },
    'music': { next: 'quiz', label: 'Play Little Games & Quiz', icon: '🎮' },
    'quiz': { next: 'letter', label: 'Read Your Love Letter', icon: '💌' },
    'letter': { next: 'home', label: 'Back to Home Keepsakes', icon: '🏠' },
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
        onOpenCustomize={() => setIsCustomizeOpen(true)}
        onReturnToIntro={() => setInScrapbook(false)}
        boyfriendName={settings.boyfriendName}
      />

      {/* Main Content Area - Preserving Draft-1 Section Pages */}
      <main className="flex-1 pb-12 animate-in fade-in duration-200">
        {currentSection === 'home' && (
          <HomeScreen
            boyfriendName={settings.boyfriendName}
            senderName={settings.senderName}
            anniversaryDate={settings.anniversaryDate}
            specialNickname={settings.specialNickname}
            onNavigate={(section) => navigateTo(section)}
          />
        )}

        {currentSection === 'starter-pack' && (
          <StarterPackSection />
        )}

        {currentSection === 'memories' && (
          <MemoryPolaroids
            memories={memories}
            onAddMemory={handleAddMemory}
            onDeleteMemory={handleDeleteMemory}
            boyfriendName={settings.boyfriendName}
          />
        )}

        {currentSection === 'music' && (
          <MusicPlayer
            tracks={tracks}
            onAddCustomTrack={handleAddTrack}
            boyfriendName={settings.boyfriendName}
          />
        )}

        {currentSection === 'quiz' && (
          <GamesSection
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
              Happy Boyfriend's Day, Abhi ♡
            </span>
          </div>

          <p className="font-serif text-xs text-[#20304A]/80 font-medium">
            Made with love, rolls, Red Bull & memories by Parina for Abhinab P Kashyap.
          </p>

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
            <span>·</span>
            <button
              type="button"
              onClick={() => setIsCustomizeOpen(true)}
              className="hover:text-[#20304A] underline cursor-pointer"
            >
              Settings ⚙️
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
