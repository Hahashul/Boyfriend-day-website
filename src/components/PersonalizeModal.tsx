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
    if (confirm('Reset names and anniversary date back to defaults?')) {
      onResetDefaults();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FFFDF9] rounded-3xl border border-[#E5DAC6] max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-5">
          <div className="flex items-center gap-2">
            <span className="text-xl">✏️</span>
            <div>
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Personalize This Gift
              </h3>
              <p className="font-casual text-xs text-stone-500">
                Change your names, nicknames, and anniversary date
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center text-sm font-semibold cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-casual font-semibold text-stone-700 mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-rose-500" />
              <span>Boyfriend's Name or Primary Nickname</span>
            </label>
            <input
              type="text"
              value={formData.boyfriendName}
              onChange={(e) => setFormData({ ...formData, boyfriendName: e.target.value })}
              placeholder="e.g. Lucas, Alex, or My Love"
              className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-stone-300 text-sm font-casual focus:outline-rose-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-casual font-semibold text-stone-700 mb-1 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>Your Name (The Sender)</span>
            </label>
            <input
              type="text"
              value={formData.senderName}
              onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
              placeholder="e.g. Parina, Sarah, or Your Bunny"
              className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-stone-300 text-sm font-casual focus:outline-rose-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-casual font-semibold text-stone-700 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Cute Nickname (Optional)</span>
            </label>
            <input
              type="text"
              value={formData.specialNickname}
              onChange={(e) => setFormData({ ...formData, specialNickname: e.target.value })}
              placeholder="e.g. Handsome, Cutie, Bubu"
              className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-stone-300 text-sm font-casual focus:outline-rose-500"
            />
          </div>

          <div>
            <label className="block text-xs font-casual font-semibold text-stone-700 mb-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-rose-500" />
              <span>Anniversary Date (For the live counter)</span>
            </label>
            <input
              type="date"
              value={formData.anniversaryDate}
              onChange={(e) => setFormData({ ...formData, anniversaryDate: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-stone-300 text-sm font-casual focus:outline-rose-500"
              required
            />
            <span className="text-[11px] font-casual text-stone-500 mt-1 block">
              The counter on the welcome screen calculates days together from this date.
            </span>
          </div>

          <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-casual text-stone-400 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset to default</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-casual text-stone-500 hover:text-stone-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-casual text-xs font-semibold rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
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
