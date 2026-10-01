import React, { useState } from 'react';
import { SongTrack } from '../types/scrapbook';
import { lofiPlayer, playCassetteClick, playPopSound } from '../utils/audio';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music2, Heart, Plus } from 'lucide-react';

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

  const currentTrack = tracks[currentTrackIndex] || tracks[0];

  const handleTogglePlay = () => {
    playCassetteClick();
    if (isPlaying) {
      lofiPlayer.stop();
      setIsPlaying(false);
    } else {
      lofiPlayer.start(currentTrack.lofiMelodyKey || currentTrackIndex);
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    playCassetteClick();
    const nextIndex = (currentTrackIndex + 1) % tracks.length;
    setCurrentTrackIndex(nextIndex);
    if (isPlaying) {
      lofiPlayer.start(tracks[nextIndex].lofiMelodyKey || nextIndex);
    }
  };

  const handlePrev = () => {
    playCassetteClick();
    const prevIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrackIndex(prevIndex);
    if (isPlaying) {
      lofiPlayer.start(tracks[prevIndex].lofiMelodyKey || prevIndex);
    }
  };

  const handleSelectTrack = (index: number) => {
    playCassetteClick();
    setCurrentTrackIndex(index);
    if (isPlaying) {
      lofiPlayer.start(tracks[index].lofiMelodyKey || index);
    } else {
      lofiPlayer.start(tracks[index].lofiMelodyKey || index);
      setIsPlaying(true);
    }
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
      note: newNote.trim() || 'A song chosen just for you.',
    };

    if (onAddCustomTrack) {
      onAddCustomTrack(created);
    }
    setNewTitle('');
    setNewArtist('');
    setNewNote('');
    setIsAddingSong(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-1">
        <span className="font-casual text-xs font-semibold uppercase text-rose-600 tracking-wider">
          Analog Love Mixtape
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-stone-800">
          Our Special Cassette Tape 📼
        </h2>
        <p className="font-handwriting text-lg text-stone-600">
          Songs that remind me of your smile, late night drives, and quiet moments together.
        </p>
      </div>

      {/* Retro Cassette Deck Component */}
      <div className="relative bg-[#2A2624] rounded-3xl p-6 sm:p-10 shadow-2xl border-4 border-[#3D3734] max-w-2xl mx-auto overflow-hidden">
        {/* Cassette Shell Screws */}
        <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-stone-500 shadow-xs" />
        <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-stone-500 shadow-xs" />
        <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-stone-500 shadow-xs" />
        <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-stone-500 shadow-xs" />

        {/* Vintage Label on Cassette */}
        <div className="bg-[#FFFDF8] rounded-xl border border-stone-300 p-4 sm:p-5 relative shadow-inner">
          <div className="flex items-center justify-between text-[11px] font-mono text-stone-400 border-b border-stone-200 pb-1 mb-2">
            <span>SIDE A · HI-FI STEREO</span>
            <span>CHROME TAPE 90</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-lg sm:text-xl text-stone-900 line-clamp-1">
                {currentTrack.title}
              </h3>
              <p className="font-casual text-xs text-rose-600 font-semibold">
                {currentTrack.artist}
              </p>
            </div>
            <div className="text-right">
              <span className="inline-block px-2 py-0.5 bg-rose-100 text-rose-700 rounded text-[10px] font-mono">
                {currentTrack.duration}
              </span>
            </div>
          </div>

          {/* Tape window with spinning reels */}
          <div className="mt-4 bg-[#1C1816] rounded-lg p-3 sm:p-4 border-2 border-stone-600 flex items-center justify-around relative">
            {/* Center magnetic tape bridge */}
            <div className="absolute inset-x-12 top-1/2 h-4 -translate-y-1/2 bg-[#3b2a23] opacity-60 pointer-events-none" />

            {/* Left Spool */}
            <div className="relative flex items-center justify-center">
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-stone-400/80 bg-stone-800 flex items-center justify-center ${
                  isPlaying ? 'animate-spin' : ''
                }`}
                style={{ animationDuration: '3s', animationTimingFunction: 'linear' }}
              >
                <div className="w-6 h-6 rounded-full bg-stone-300 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-stone-900" />
                </div>
                {/* Spokes */}
                <div className="absolute w-12 h-1 bg-stone-500/70" />
                <div className="absolute h-12 w-1 bg-stone-500/70" />
              </div>
            </div>

            {/* Center Tape Window Cutout */}
            <div className="flex flex-col items-center justify-center z-10 bg-black/40 px-3 py-1 rounded">
              <span className="text-[10px] font-mono text-stone-400">
                {isPlaying ? '▶ TAPE ROLLING' : '❚❚ PAUSED'}
              </span>
              <span className="font-handwriting text-sm text-rose-300">
                For {boyfriendName || 'You'} ♡
              </span>
            </div>

            {/* Right Spool */}
            <div className="relative flex items-center justify-center">
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-stone-400/80 bg-stone-800 flex items-center justify-center ${
                  isPlaying ? 'animate-spin' : ''
                }`}
                style={{ animationDuration: '3s', animationTimingFunction: 'linear' }}
              >
                <div className="w-6 h-6 rounded-full bg-stone-300 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-stone-900" />
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
            className="w-12 h-10 rounded-lg bg-stone-700 hover:bg-stone-600 active:scale-95 text-stone-200 flex items-center justify-center shadow-md transition-all cursor-pointer"
            title="Previous track"
          >
            <SkipBack className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={handleTogglePlay}
            className="w-16 h-12 rounded-xl bg-rose-600 hover:bg-rose-500 active:scale-95 text-white flex items-center justify-center shadow-lg shadow-rose-900/40 transition-all cursor-pointer"
            title={isPlaying ? 'Pause' : 'Play tape'}
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 translate-x-0.5" />}
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="w-12 h-10 rounded-lg bg-stone-700 hover:bg-stone-600 active:scale-95 text-stone-200 flex items-center justify-center shadow-md transition-all cursor-pointer"
            title="Next track"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        {/* Playing Status Kicker */}
        <div className="mt-4 text-center">
          <p className="text-xs font-mono text-stone-400">
            {isPlaying
              ? 'Synthesized acoustic lo-fi vibes active · Real analog warmth'
              : 'Press Play to start our soundtrack'}
          </p>
        </div>
      </div>

      {/* Handwritten Liner Note for Current Song */}
      <div className="max-w-2xl mx-auto bg-lined-paper rounded-2xl border border-[#E2D5BE] p-5 sm:p-6 shadow-xs relative">
        <div className="absolute -top-3 left-6 w-24 h-6 washi-tape-pink transform -rotate-1 rounded-xs flex items-center justify-center">
          <span className="text-[10px] font-mono text-rose-900">LINER NOTES</span>
        </div>

        <div className="mt-1 flex items-start gap-2">
          <Heart className="w-5 h-5 text-rose-500 shrink-0 mt-0.5 fill-rose-100" />
          <div>
            <h4 className="font-casual font-semibold text-sm text-stone-800">
              Why this song belongs to us:
            </h4>
            <p className="font-handwriting text-xl text-stone-800 mt-1">
              "{currentTrack.note}"
            </p>
          </div>
        </div>
      </div>

      {/* Playlist Tracklist */}
      <div className="max-w-2xl mx-auto bg-[#FFFDF9] rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-xl font-bold text-stone-800">
            Mixtape Tracklist
          </h3>
          <button
            type="button"
            onClick={() => setIsAddingSong(!isAddingSong)}
            className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 rounded-lg text-xs font-casual text-stone-700 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Our Song</span>
          </button>
        </div>

        {/* Add custom track form */}
        {isAddingSong && (
          <form
            onSubmit={handleSaveCustomTrack}
            className="mb-4 p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-3 animate-in fade-in"
          >
            <div className="text-xs font-casual font-semibold text-stone-700">
              Add a song that reminds you of him:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Song Title (e.g. Until I Found You)"
                className="px-3 py-2 bg-white rounded-lg border border-stone-300 text-xs font-casual focus:outline-rose-500"
                required
              />
              <input
                type="text"
                value={newArtist}
                onChange={(e) => setNewArtist(e.target.value)}
                placeholder="Artist name"
                className="px-3 py-2 bg-white rounded-lg border border-stone-300 text-xs font-casual focus:outline-rose-500"
              />
            </div>
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Why this song? (e.g. The night we stayed up until 3am)"
              className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300 text-xs font-casual focus:outline-rose-500"
            />
            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsAddingSong(false)}
                className="px-3 py-1.5 text-xs text-stone-500 font-casual cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-casual font-semibold shadow-xs cursor-pointer"
              >
                Save to Tape
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
                className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-rose-50/80 border border-rose-200 text-rose-900 shadow-xs'
                    : 'hover:bg-stone-50 border border-transparent text-stone-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-stone-400 w-5">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h5 className="font-serif font-semibold text-sm">
                      {track.title}
                    </h5>
                    <p className="font-casual text-xs text-stone-500">
                      {track.artist}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {isSelected && isPlaying && (
                    <span className="flex items-center gap-0.5 text-rose-500">
                      <span className="w-1 h-3 bg-rose-500 rounded animate-pulse" />
                      <span className="w-1 h-4 bg-rose-500 rounded animate-pulse delay-75" />
                      <span className="w-1 h-2 bg-rose-500 rounded animate-pulse delay-150" />
                    </span>
                  )}
                  <span className="font-mono text-xs text-stone-400">
                    {track.duration}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
