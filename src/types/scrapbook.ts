export interface ScrapbookSettings {
  boyfriendName: string;
  senderName: string;
  anniversaryDate: string; // YYYY-MM-DD
  specialNickname: string;
  themeColor: string;
}

export interface PolaroidMemory {
  id: string;
  title: string;
  date: string;
  caption: string;
  noteOnBack: string;
  imageUrl?: string;
  doodleType: 'sunset' | 'coffee' | 'hands' | 'stargazing' | 'cinema' | 'cozy';
  rotation: number;
}

export interface SongTrack {
  id: string;
  title: string;
  artist: string;
  duration: string;
  lofiMelodyKey: number; // for Web Audio synth synthesizer
  note: string;
  customAudioUrl?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LoveReason {
  id: string;
  text: string;
  color: string;
}
