import React, { useState } from 'react';
import { ScrapbookSettings } from '../types/scrapbook';
import { playPopSound, playSparkleSound } from '../utils/audio';
import { Heart, Calendar, User, Sparkles, Check, RotateCcw } from 'lucide-react';

interface PersonalizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ScrapbookSettings;
  onSave: (newSettings: ScrapbookSettings) => void;
  onResetDefaults: () => void;
}

export const PersonalizeModal: React.FC<PersonalizeModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSave,
  onResetDefaults,
}) => {
  const [formData, setFormData] = useState<ScrapbookSettings>(settings);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSparkleSound();
    onSave(formData);
    onClose();
  };

  const handleReset = () => {
    playPopSound();
    if (confirm('Reset names and relationship date back to defaults?')) {
      onResetDefaults();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-[#CCE5F8] max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-[#CCE5F8]/60 mb-5">
          <div className="flex items-center gap-2">
            <span className="text-xl">✏️</span>
            <div>
              <h3 className="font-serif text-xl font-bold text-[#24324A]">
                Personalize This Gift
              </h3>
              <p className="font-sans text-xs text-[#24324A]/70">
                Change names, nicknames, and special date
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#EAF6FF] hover:bg-blue-100 text-[#24324A] flex items-center justify-center text-sm font-semibold cursor-pointer transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-sans font-semibold text-[#24324A] mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-blue-500" />
              <span>Boyfriend's Name or Nickname</span>
            </label>
            <input
              type="text"
              value={formData.boyfriendName}
              onChange={(e) => setFormData({ ...formData, boyfriendName: e.target.value })}
              placeholder="e.g. Lucas, Alex, or My Love"
              className="w-full px-3.5 py-2.5 bg-[#EAF6FF]/40 rounded-xl border border-[#CCE5F8] text-xs sm:text-sm font-sans text-[#24324A] focus:outline-blue-500 focus:bg-white"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-sans font-semibold text-[#24324A] mb-1 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>Your Name (The Sender)</span>
            </label>
            <input
              type="text"
              value={formData.senderName}
              onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
              placeholder="e.g. Parina, Sarah, or Your Bunny"
              className="w-full px-3.5 py-2.5 bg-[#EAF6FF]/40 rounded-xl border border-[#CCE5F8] text-xs sm:text-sm font-sans text-[#24324A] focus:outline-blue-500 focus:bg-white"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-sans font-semibold text-[#24324A] mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Cute Nickname (Optional)</span>
            </label>
            <input
              type="text"
              value={formData.specialNickname}
              onChange={(e) => setFormData({ ...formData, specialNickname: e.target.value })}
              placeholder="e.g. Handsome, Cutie, Bubu"
              className="w-full px-3.5 py-2.5 bg-[#EAF6FF]/40 rounded-xl border border-[#CCE5F8] text-xs sm:text-sm font-sans text-[#24324A] focus:outline-blue-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-sans font-semibold text-[#24324A] mb-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-purple-500" />
              <span>Relationship Start Date (For the live counter)</span>
            </label>
            <input
              type="date"
              value={formData.anniversaryDate}
              onChange={(e) => setFormData({ ...formData, anniversaryDate: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#EAF6FF]/40 rounded-xl border border-[#CCE5F8] text-xs sm:text-sm font-sans text-[#24324A] focus:outline-blue-500 focus:bg-white"
              required
            />
            <span className="text-[11px] font-sans text-[#24324A]/60 mt-1 block">
              The counter on the welcome screen calculates days together from this date.
            </span>
          </div>

          <div className="pt-4 border-t border-[#CCE5F8]/60 flex items-center justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-sans font-medium text-[#24324A]/60 hover:text-rose-600 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset to default</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-sans font-medium text-[#24324A]/70 hover:text-[#24324A] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#24324A] hover:bg-[#1A2538] active:scale-95 text-white font-sans text-xs font-semibold rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
