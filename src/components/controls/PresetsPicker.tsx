import React from 'react';
import { Sparkles } from 'lucide-react';
import type { PresetTemplate } from '../../types/notification';
import { PRESET_TEMPLATES } from '../../constants/presets';

interface PresetsPickerProps {
  onSelectPreset: (preset: PresetTemplate) => void;
}

export const PresetsPicker: React.FC<PresetsPickerProps> = ({ onSelectPreset }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
        <Sparkles size={14} className="text-amber-400" />
        Sample Notification Presets
      </div>

      <div className="grid grid-cols-1 gap-2">
        {PRESET_TEMPLATES.map((preset) => (
          <button
            key={preset.id}
            onClick={() => onSelectPreset(preset)}
            className="w-full text-left p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/60 hover:bg-slate-800/80 transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-200 group-hover:text-indigo-300">
                {preset.name}
              </span>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                {preset.category}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
              {preset.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};
