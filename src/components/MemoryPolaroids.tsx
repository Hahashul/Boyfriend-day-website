import React, { useState } from 'react';
import { PolaroidMemory } from '../types/scrapbook';
import { SketchDoodleArt } from './Doodles';
import { playPopSound, playSparkleSound } from '../utils/audio';
import { Plus, RotateCw, Heart, Sparkles, Image as ImageIcon, Trash2 } from 'lucide-react';

interface MemoryPolaroidsProps {
  memories: PolaroidMemory[];
  onAddMemory: (memory: PolaroidMemory) => void;
  onDeleteMemory: (id: string) => void;
  boyfriendName: string;
}

export const MemoryPolaroids: React.FC<MemoryPolaroidsProps> = ({
  memories,
  onAddMemory,
  onDeleteMemory,
  boyfriendName,
}) => {
  const [flippedIds, setFlippedIds] = useState<Record<string, boolean>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newNoteOnBack, setNewNoteOnBack] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const toggleFlip = (id: string) => {
    playPopSound();
    setFlippedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    playSparkleSound();
    const newMemory: PolaroidMemory = {
      id: `mem-${Date.now()}`,
      title: newTitle.trim(),
      date: newDate.trim() || 'Our Favorite Day',
      caption: newCaption.trim() || 'Unforgettable moment together',
      noteOnBack:
        newNoteOnBack.trim() ||
        'I will never forget how much we laughed that day. You made everything so bright.',
      imageUrl: uploadedImage || undefined,
      doodleType: 'sunset',
      rotation: (Math.random() - 0.5) * 6,
    };

    onAddMemory(newMemory);
    setNewTitle('');
    setNewDate('');
    setNewCaption('');
    setNewNoteOnBack('');
    setUploadedImage(null);
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="font-casual text-xs font-semibold uppercase text-rose-600 tracking-wider">
            Polaroid Scrapbook
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-800">
            Our Favorite Snapshots 📸
          </h2>
          <p className="font-handwriting text-lg text-stone-600 mt-1">
            Tap any polaroid to flip it and read the secret note on the back!
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="self-start sm:self-auto px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs sm:text-sm font-casual shadow-sm flex items-center gap-2 cursor-pointer transition-transform active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add Our Own Photo</span>
        </button>
      </div>

      {/* Notice / Hint banner */}
      <div className="bg-[#FFFDF7] border border-[#E9DFCF] rounded-2xl p-4 flex items-center gap-3 text-xs sm:text-sm text-stone-600">
        <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
        <span>
          <strong>Personalization ready:</strong> These polaroids use handcrafted sketch doodles as placeholders. You can click <strong>"Add Our Own Photo"</strong> to upload real photos of you and {boyfriendName || 'your boyfriend'} anytime!
        </span>
      </div>

      {/* Polaroids Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
        {memories.map((item, index) => {
          const isFlipped = !!flippedIds[item.id];
          const washiStyles = [
            'washi-tape-pink',
            'washi-tape-yellow',
            'washi-tape-sage',
          ];
          const washiClass = washiStyles[index % washiStyles.length];

          return (
            <div
              key={item.id}
              className="relative flex flex-col items-center select-none"
              style={{
                transform: `rotate(${item.rotation || 0}deg)`,
              }}
            >
              {/* Washi tape on top */}
              <div
                className={`absolute -top-3.5 z-20 w-24 h-6 ${washiClass} transform -rotate-1 rounded-xs flex items-center justify-center opacity-90`}
              >
                <span className="text-[8px] font-mono text-stone-600/70 tracking-widest">
                  MEMORIES
                </span>
              </div>

              {/* Delete button (quiet hover) */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteMemory(item.id);
                }}
                className="absolute top-2 right-2 z-30 p-1.5 rounded-full bg-white/80 hover:bg-rose-100 text-stone-400 hover:text-rose-600 text-xs shadow-xs transition-colors cursor-pointer"
                title="Remove this polaroid"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>

              {/* The Polaroid Card (Flip container) */}
              <div
                onClick={() => toggleFlip(item.id)}
                className="w-full max-w-[320px] bg-white rounded-xl p-4 pb-6 polaroid-card cursor-pointer border border-stone-200/80 transition-all duration-300"
              >
                {!isFlipped ? (
                  /* FRONT OF POLAROID */
                  <div className="space-y-3">
                    <div className="w-full aspect-square bg-[#F7F4EE] rounded-lg overflow-hidden border border-stone-200/60 relative">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <SketchDoodleArt type={item.doodleType} />
                      )}

                      <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/40 backdrop-blur-xs rounded text-[10px] text-white font-mono">
                        {item.date}
                      </div>
                    </div>

                    <div className="text-center pt-2">
                      <h4 className="font-handwriting text-2xl text-stone-900 font-bold">
                        {item.title}
                      </h4>
                      <p className="font-casual text-xs text-stone-500 mt-0.5">
                        {item.caption}
                      </p>
                    </div>

                    <div className="flex items-center justify-center gap-1 text-[11px] font-casual text-rose-500 pt-1">
                      <RotateCw className="w-3 h-3" />
                      <span>Tap to flip & read back</span>
                    </div>
                  </div>
                ) : (
                  /* BACK OF POLAROID (Handwritten note) */
                  <div className="w-full aspect-square bg-lined-paper rounded-lg p-5 border border-stone-200 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-stone-400 pb-2 border-b border-stone-200">
                        <span>HANDWRITTEN NOTE</span>
                        <span>{item.date}</span>
                      </div>
                      <p className="font-handwriting text-xl text-stone-800 mt-4 leading-relaxed">
                        "{item.noteOnBack}"
                      </p>
                    </div>

                    <div className="pt-4 flex items-center justify-between border-t border-stone-200">
                      <span className="font-handwriting text-rose-700 text-lg">
                        Always yours ♡
                      </span>
                      <span className="text-[11px] font-casual text-stone-400">
                        Tap to flip back
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Photo Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFDF9] rounded-3xl border border-[#E2D5BE] max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-4">
              <h3 className="font-serif text-xl font-bold text-stone-800">
                Add Our Memory Polaroid
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateMemory} className="space-y-4">
              {/* Photo file picker */}
              <div>
                <label className="block text-xs font-casual font-semibold text-stone-700 mb-1">
                  Upload Photo (From your device)
                </label>
                <div className="border-2 border-dashed border-stone-300 rounded-2xl p-4 text-center hover:border-rose-400 transition-colors bg-white">
                  {uploadedImage ? (
                    <div className="relative w-36 h-36 mx-auto rounded-xl overflow-hidden border border-stone-200">
                      <img
                        src={uploadedImage}
                        alt="Uploaded preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setUploadedImage(null)}
                        className="absolute top-1 right-1 p-1 bg-black/60 text-white rounded-full text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center justify-center py-2">
                      <ImageIcon className="w-8 h-8 text-stone-400 mb-1" />
                      <span className="text-xs font-casual text-rose-600 font-semibold">
                        Click to select photo
                      </span>
                      <span className="text-[10px] text-stone-400 mt-0.5">
                        JPG, PNG, or WebP
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Title & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-casual font-semibold text-stone-700 mb-1">
                    Title / Moment Name *
                  </label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Our First Road Trip"
                    className="w-full px-3 py-2 bg-white rounded-xl border border-stone-300 text-xs font-casual focus:outline-rose-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-casual font-semibold text-stone-700 mb-1">
                    Date or Season
                  </label>
                  <input
                    type="text"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    placeholder="e.g. Summer 2025"
                    className="w-full px-3 py-2 bg-white rounded-xl border border-stone-300 text-xs font-casual focus:outline-rose-500"
                  />
                </div>
              </div>

              {/* Front Caption */}
              <div>
                <label className="block text-xs font-casual font-semibold text-stone-700 mb-1">
                  Short Caption (Front)
                </label>
                <input
                  type="text"
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  placeholder="e.g. You spilled ice cream and we couldn't stop laughing"
                  className="w-full px-3 py-2 bg-white rounded-xl border border-stone-300 text-xs font-casual focus:outline-rose-500"
                />
              </div>

              {/* Handwritten Note on back */}
              <div>
                <label className="block text-xs font-casual font-semibold text-stone-700 mb-1">
                  Secret Note for the Back (Handwritten style)
                </label>
                <textarea
                  value={newNoteOnBack}
                  onChange={(e) => setNewNoteOnBack(e.target.value)}
                  placeholder="Write a sweet private memory or inside joke here..."
                  rows={3}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-stone-300 text-xs font-casual focus:outline-rose-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-casual text-stone-500 hover:text-stone-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-casual text-xs font-semibold rounded-xl shadow-xs cursor-pointer"
                >
                  Pin to Scrapbook
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
