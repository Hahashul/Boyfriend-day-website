import React, { useState, useRef, useEffect } from 'react';
import { SongTrack } from '../types/scrapbook';
import { lofiPlayer, playCassetteClick, playPopSound } from '../utils/audio';
import { Play, Pause, SkipBack, SkipForward, Heart, Plus, Disc, Volume2 } from 'lucide-react';

interface MusicPlayerProps {
  tracks: SongTrack[];
  onAddCustomTrack?: (track: SongTrack) => void;
  boyfriendName: string;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  tracks,
  onAddCustomTrack,
  boyfriendName,
}) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAddingSong, setIsAddingSong] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newArtist, setNewArtist] = useState('');
  const [newNote, setNewNote] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = tracks[currentTrackIndex] || tracks[0];

  useEffect(() => {
    // If the track has a custom URL, configure HTML5 audio
    if (currentTrack?.customAudioUrl) {
      if (!audioRef.current) {
        audioRef.current = new Audio(currentTrack.customAudioUrl);
        audioRef.current.onended = handleNext;
      } else {
        audioRef.current.src = currentTrack.customAudioUrl;
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
  }, [currentTrackIndex, currentTrack]);

  const handleTogglePlay = () => {
    playCassetteClick();
    if (isPlaying) {
      if (audioRef.current && currentTrack.customAudioUrl) {
        audioRef.current.pause();
      }
      lofiPlayer.stop();
      setIsPlaying(false);
    } else {
      if (currentTrack.customAudioUrl && audioRef.current) {
        audioRef.current.play().catch(() => {
          setIsPlaying(false);
        });
        setIsPlaying(true);
      } else if (currentTrack.title.toLowerCase().includes('her')) {
        lofiPlayer.start('/her.mp3').then((started) => {
          setIsPlaying(started);
        });
      } else {
        // No placeholder tune substitution
        setIsPlaying(false);
      }
    }
  };

  const handleNext = () => {
    playCassetteClick();
    const nextIndex = (currentTrackIndex + 1) % tracks.length;
    setCurrentTrackIndex(nextIndex);
    if (isPlaying) {
      setIsPlaying(false);
    }
  };

  const handlePrev = () => {
    playCassetteClick();
    const prevIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrackIndex(prevIndex);
    if (isPlaying) {
      setIsPlaying(false);
    }
  };

  const handleSelectTrack = (index: number) => {
    playCassetteClick();
    setCurrentTrackIndex(index);
    setIsPlaying(false);
  };

  const handleSaveCustomTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    playPopSound();

    const created: SongTrack = {
      id: `track-${Date.now()}`,
      title: newTitle.trim(),
      artist: newArtist.trim() || 'Our Melody',
      duration: '3:20',
      lofiMelodyKey: tracks.length % 3,
      note: newNote.trim() || 'A song chosen just for us.',
      customAudioUrl: newUrl.trim() || undefined,
    };

    if (onAddCustomTrack) {
      onAddCustomTrack(created);
    }
    setNewTitle('');
    setNewArtist('');
    setNewNote('');
    setNewUrl('');
    setIsAddingSong(false);
  };

  return (
    <section id="music" className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-14 space-y-8">
      {/* Header */}
      <div className="text-center space-y-1">
        <span className="inline-block px-3 py-1 bg-[#C9B5FF] border border-[#C9B5FF] rounded-full font-sans text-xs font-bold uppercase text-[#20304A] tracking-wider shadow-2xs">
          Mixtape For Abhi
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#20304A] font-bold tracking-tight">
          THE SOUNDTRACK OF US 📼
        </h2>
        <p className="font-handwriting text-2xl text-[#20304A]/80 font-bold">
          "Every love song somehow became an Abhi song."
        </p>
      </div>

      {/* Authentic Vintage Cassette Deck Component */}
      <div className="relative bg-[#1E293B] rounded-3xl p-6 sm:p-10 shadow-[0_20px_45px_rgba(20,15,30,0.18)] border-4 border-[#334155] max-w-2xl mx-auto overflow-hidden">
        {/* Brass Screws */}
        <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-amber-200/60 shadow-2xs" />
        <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-amber-200/60 shadow-2xs" />
        <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-amber-200/60 shadow-2xs" />
        <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-amber-200/60 shadow-2xs" />

        {/* Vintage Baby Yellow Paper Label */}
        <div className="bg-[#FFF4B8] rounded-2xl border border-[#F2DE79] p-4 sm:p-5 relative shadow-inner">
          <div className="flex items-center justify-between text-[10px] font-mono text-[#24324A]/70 border-b border-[#F2DE79] pb-1 mb-2 font-semibold">
            <span>SIDE A · VINTAGE LO-FI STEREO</span>
            <span>ABHI & PARINA · 90 MIN</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="max-w-[75%]">
              <h3 className="font-serif font-bold text-lg sm:text-xl text-[#24324A] line-clamp-1">
                {currentTrack.title}
              </h3>
              <p className="font-sans text-xs text-[#24324A]/80 font-medium">
                {currentTrack.artist}
              </p>
            </div>
            <div className="text-right">
              <span className="inline-block px-2.5 py-0.5 bg-white text-[#24324A] rounded-full text-[10px] font-mono font-semibold border border-[#F2DE79]">
                {currentTrack.duration}
              </span>
            </div>
          </div>

          {/* Tape window with spinning reels */}
          <div className="mt-4 bg-[#0F172A] rounded-xl p-3 sm:p-4 border-2 border-slate-700 flex items-center justify-around relative">
            {/* Magnetic tape bridge */}
            <div className="absolute inset-x-12 top-1/2 h-4 -translate-y-1/2 bg-[#332520] opacity-80 pointer-events-none" />

            {/* Left Spool */}
            <div className="relative flex items-center justify-center">
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-stone-400 bg-stone-800 flex items-center justify-center ${
                  isPlaying ? 'animate-spin' : ''
                }`}
                style={{ animationDuration: '3s', animationTimingFunction: 'linear' }}
              >
                <div className="w-6 h-6 rounded-full bg-[#EAF6FF] flex items-center justify-center shadow-xs">
                  <div className="w-2 h-2 rounded-full bg-[#24324A]" />
                </div>
                <div className="absolute w-12 h-1 bg-stone-500/70" />
                <div className="absolute h-12 w-1 bg-stone-500/70" />
              </div>
            </div>

            {/* Center Tape Window Cutout */}
            <div className="flex flex-col items-center justify-center z-10 bg-black/60 px-3.5 py-1 rounded-md border border-slate-700 text-center">
              <span className="text-[10px] font-mono font-semibold text-stone-300">
                {isPlaying ? '▶ TAPE PLAYING' : '❚❚ PAUSED'}
              </span>
              <span className="font-handwriting text-base text-[#FFDDE8]">
                For Abhi ♡
              </span>
            </div>

            {/* Right Spool */}
            <div className="relative flex items-center justify-center">
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-stone-400 bg-stone-800 flex items-center justify-center ${
                  isPlaying ? 'animate-spin' : ''
                }`}
                style={{ animationDuration: '3s', animationTimingFunction: 'linear' }}
              >
                <div className="w-6 h-6 rounded-full bg-[#EAF6FF] flex items-center justify-center shadow-xs">
                  <div className="w-2 h-2 rounded-full bg-[#24324A]" />
                </div>
                <div className="absolute w-12 h-1 bg-stone-500/70" />
                <div className="absolute h-12 w-1 bg-stone-500/70" />
              </div>
            </div>
          </div>
        </div>

        {/* Physical Cassette Buttons */}
        <div className="mt-6 flex items-center justify-center gap-4 sm:gap-6">
          <button
            type="button"
            onClick={handlePrev}
            className="w-12 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-stone-200 border border-slate-700 flex items-center justify-center shadow-md transition-all cursor-pointer"
            title="Previous track"
          >
            <SkipBack className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={handleTogglePlay}
            className="w-16 h-12 rounded-2xl bg-[#24324A] hover:bg-[#1A2538] active:scale-95 text-white flex items-center justify-center shadow-lg transition-all cursor-pointer border border-blue-400/30"
            title={isPlaying ? 'Pause' : 'Play tape'}
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 translate-x-0.5" />}
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="w-12 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-stone-200 border border-slate-700 flex items-center justify-center shadow-md transition-all cursor-pointer"
            title="Next track"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        {/* Playing Status Kicker */}
        <div className="mt-4 text-center">
          <p className="text-xs font-mono text-stone-400 flex items-center justify-center gap-1.5">
            <Volume2 className="w-3.5 h-3.5 text-amber-300" />
            <span>
              {isPlaying
                ? 'Acoustic Lo-Fi Synth Harmonic Engine active · Tap any song to listen'
                : 'Click Play to hear our nostalgic soundtrack'}
            </span>
          </p>
        </div>
      </div>

      {/* Handwritten Liner Note for Current Song (only if caption is set) */}
      {currentTrack?.note && (
        <div className="max-w-2xl mx-auto bg-white/95 rounded-2xl border border-[#FFE66D] p-5 sm:p-6 shadow-sm relative">
          <div className="absolute -top-3 left-6 w-28 h-6 washi-tape-pink transform -rotate-1 rounded-xs flex items-center justify-center">
            <span className="text-[10px] font-mono font-bold text-[#20304A] uppercase">LINER NOTES</span>
          </div>

          <div className="mt-1 flex items-start gap-2.5">
            <Heart className="w-5 h-5 text-rose-500 shrink-0 mt-0.5 fill-rose-200" />
            <div>
              <h4 className="font-sans font-bold text-xs text-[#20304A]/70 uppercase tracking-wider">
                Why this song belongs to us:
              </h4>
              <p className="font-handwriting text-2xl text-[#20304A] font-bold mt-1">
                "{currentTrack.note}"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Playlist Tracklist */}
      <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-[#CCE5F8] p-5 sm:p-6 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-xl font-bold text-[#24324A] flex items-center gap-2">
            <Disc className="w-5 h-5 text-blue-500" />
            <span>Our 9 Signature Songs</span>
          </h3>
          <button
            type="button"
            onClick={() => setIsAddingSong(!isAddingSong)}
            className="px-3.5 py-1.5 bg-[#EAF6FF] hover:bg-[#CCE5F8] text-[#24324A] border border-[#CCE5F8] rounded-xl text-xs font-sans font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Track</span>
          </button>
        </div>

        {/* Add custom track form */}
        {isAddingSong && (
          <form
            onSubmit={handleSaveCustomTrack}
            className="mb-4 p-4 bg-[#EAF6FF]/60 border border-[#CCE5F8] rounded-2xl space-y-3 animate-in fade-in"
          >
            <div className="text-xs font-sans font-semibold text-[#24324A]">
              Add another song to our mixtape:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Song Title (e.g. Until I Found You)"
                className="px-3 py-2 bg-white rounded-xl border border-[#CCE5F8] text-xs font-sans text-[#24324A]"
                required
              />
              <input
                type="text"
                value={newArtist}
                onChange={(e) => setNewArtist(e.target.value)}
                placeholder="Artist name"
                className="px-3 py-2 bg-white rounded-xl border border-[#CCE5F8] text-xs font-sans text-[#24324A]"
              />
            </div>
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Why this song? (Your personal liner note)"
              className="w-full px-3 py-2 bg-white rounded-xl border border-[#CCE5F8] text-xs font-sans text-[#24324A]"
            />
            <input
              type="url"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="Audio File URL (optional .mp3 / audio stream link)"
              className="w-full px-3 py-2 bg-white rounded-xl border border-[#CCE5F8] text-xs font-sans text-[#24324A]"
            />
            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsAddingSong(false)}
                className="px-3 py-1.5 text-xs text-[#24324A]/70 font-sans cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-[#24324A] hover:bg-[#1A2538] text-white rounded-xl text-xs font-sans font-semibold shadow-xs cursor-pointer transition-colors"
              >
                Save to Cassette
              </button>
            </div>
          </form>
        )}

        {/* Tracks List */}
        <div className="space-y-2">
          {tracks.map((track, idx) => {
            const isSelected = idx === currentTrackIndex;
            return (
              <button
                key={track.id}
                type="button"
                onClick={() => handleSelectTrack(idx)}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-left transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-[#E9DEFF]/60 border-[#D0BDFF] text-[#24324A] shadow-2xs font-semibold'
                    : 'hover:bg-[#EAF6FF]/60 border-transparent text-[#24324A]/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#24324A]/50 font-semibold w-5">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h5 className="font-serif font-bold text-sm text-[#24324A]">
                      {track.title}
                    </h5>
                    <p className="font-sans text-xs text-[#24324A]/70">
                      {track.artist}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {isSelected && isPlaying && (
                    <span className="flex items-center gap-0.5 text-blue-600">
                      <span className="w-1 h-3 bg-blue-600 rounded animate-pulse" />
                      <span className="w-1 h-4 bg-blue-600 rounded animate-pulse delay-75" />
                      <span className="w-1 h-2 bg-blue-600 rounded animate-pulse delay-150" />
                    </span>
                  )}
                  <span className="font-mono text-xs text-[#24324A]/50">
                    {track.duration}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

