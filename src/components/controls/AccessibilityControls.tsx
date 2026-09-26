import React from 'react';
import { 
  Sun, 
  Moon, 
  Eye, 
  Smartphone, 
  Palette, 
  Type, 
  Check 
} from 'lucide-react';
import type { AccessibilitySettings } from '../../types/notification';
import { WALLPAPERS } from '../../constants/presets';
import { IOS_DYNAMIC_TYPE_SCALES, ANDROID_FONT_SCALES } from '../../constants/typography';

interface AccessibilityControlsProps {
  settings: AccessibilitySettings;
  onChange: (updated: AccessibilitySettings) => void;
}

export const AccessibilityControls: React.FC<AccessibilityControlsProps> = ({
  settings,
  onChange,
}) => {
  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    onChange({ ...settings, [key]: value });
  };

  const isIOS = settings.platform === 'ios';

  return (
    <div className="space-y-6 text-slate-200">
      {/* Platform & Presentation */}
      <section className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Smartphone size={14} className="text-indigo-400" />
          Platform & View Mode
        </h3>

        {/* Platform Buttons */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-900 border border-slate-800 rounded-xl">
          <button
            onClick={() => updateSetting('platform', 'ios')}
            className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              settings.platform === 'ios'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <span>Apple iOS 17/18</span>
          </button>
          <button
            onClick={() => updateSetting('platform', 'android')}
            className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              settings.platform === 'android'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <span>Android Material 3</span>
          </button>
        </div>

        {/* Presentation Location */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs">
          <button
            onClick={() => updateSetting('presentation', 'lockscreen')}
            className={`py-1.5 px-2 rounded-lg font-medium transition-all ${
              settings.presentation === 'lockscreen'
                ? 'bg-slate-800 text-indigo-400 font-semibold shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Lock Screen
          </button>
          <button
            onClick={() => updateSetting('presentation', 'banner')}
            className={`py-1.5 px-2 rounded-lg font-medium transition-all ${
              settings.presentation === 'banner'
                ? 'bg-slate-800 text-indigo-400 font-semibold shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Banner / Toast
          </button>
          <button
            onClick={() => updateSetting('presentation', 'shade')}
            className={`py-1.5 px-2 rounded-lg font-medium transition-all ${
              settings.presentation === 'shade'
                ? 'bg-slate-800 text-indigo-400 font-semibold shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Shade / List
          </button>
        </div>
      </section>

      {/* Font Scaling & Dynamic Type */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Type size={14} className="text-indigo-400" />
            Dynamic Type & Font Scale
          </h3>
          <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full">
            {Math.round(settings.fontScale * 100)}%
          </span>
        </div>

        {/* Dynamic Type Quick Tiers */}
        <div className="flex flex-wrap gap-1.5">
          {(isIOS ? IOS_DYNAMIC_TYPE_SCALES : ANDROID_FONT_SCALES).map((tier) => {
            const isSelected = Math.abs(settings.fontScale - tier.scale) < 0.04;
            return (
              <button
                key={tier.id}
                onClick={() => updateSetting('fontScale', tier.scale)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                    : tier.isAccessibility
                      ? 'bg-amber-950/30 text-amber-300 border border-amber-800/40 hover:bg-amber-900/40'
                      : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
                }`}
              >
                {tier.name}
              </button>
            );
          })}
        </div>

        {/* Fine Adjustment Slider */}
        <div className="space-y-1 pt-1">
          <input
            type="range"
            min={0.8}
            max={3.0}
            step={0.05}
            value={settings.fontScale}
            onChange={(e) => updateSetting('fontScale', parseFloat(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-500 font-mono">
            <span>80% (Compact)</span>
            <span>100% (Default)</span>
            <span>200% (Android Max)</span>
            <span>300% (iOS AX5)</span>
          </div>
        </div>

        {settings.fontScale >= 1.6 && (
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
            ⚠️ <strong>Accessibility Size Active:</strong> Simulates extreme Dynamic Type (AX1–AX5). Layout elements may wrap or overflow standard single-line constraints.
          </div>
        )}
      </section>

      {/* Accessibility Overrides */}
      <section className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Eye size={14} className="text-indigo-400" />
          Accessibility Overrides
        </h3>

        <div className="space-y-2">
          {/* Bold Text Toggle */}
          <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700">
            <div>
              <div className="text-xs font-medium text-slate-200">Bold Text</div>
              <div className="text-[11px] text-slate-400">
                Increases font weight across headlines and body labels
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.boldText}
              onChange={(e) => updateSetting('boldText', e.target.checked)}
              className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
            />
          </label>

          {/* High Contrast Toggle */}
          <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700">
            <div>
              <div className="text-xs font-medium text-slate-200">High Contrast Mode</div>
              <div className="text-[11px] text-slate-400">
                Enhances border dividers and outlines for visual distinction
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.highContrast}
              onChange={(e) => updateSetting('highContrast', e.target.checked)}
              className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
            />
          </label>

          {/* Reduce Transparency Toggle */}
          <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700">
            <div>
              <div className="text-xs font-medium text-slate-200">Reduce Transparency</div>
              <div className="text-[11px] text-slate-400">
                Replaces translucent frosted glass blur with solid opaque backings
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.reduceTransparency}
              onChange={(e) => updateSetting('reduceTransparency', e.target.checked)}
              className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
            />
          </label>
        </div>
      </section>

      {/* Screen Width & Appearance */}
      <section className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Palette size={14} className="text-indigo-400" />
          Device Dimensions & Theme
        </h3>

        {/* Theme and Expansion */}
        <div className="grid grid-cols-2 gap-2">
          {/* Light / Dark Mode */}
          <div className="p-1 bg-slate-900 border border-slate-800 rounded-xl flex">
            <button
              onClick={() => updateSetting('theme', 'light')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                settings.theme === 'light'
                  ? 'bg-amber-500/20 text-amber-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sun size={13} />
              Light
            </button>
            <button
              onClick={() => updateSetting('theme', 'dark')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                settings.theme === 'dark'
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Moon size={13} />
              Dark
            </button>
          </div>

          {/* Collapsed / Expanded */}
          <div className="p-1 bg-slate-900 border border-slate-800 rounded-xl flex">
            <button
              onClick={() => updateSetting('expanded', false)}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                !settings.expanded
                  ? 'bg-slate-800 text-slate-200 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Collapsed
            </button>
            <button
              onClick={() => updateSetting('expanded', true)}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                settings.expanded
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Expanded
            </button>
          </div>
        </div>

        {/* Screen Width selector */}
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">
            Screen Width Simulation
          </label>
          <div className="grid grid-cols-3 gap-2 text-xs">
            {[
              { width: 360, label: '360px', desc: 'Compact' },
              { width: 393, label: '393px', desc: 'Standard' },
              { width: 430, label: '430px', desc: 'Max / Plus' },
            ].map((device) => (
              <button
                key={device.width}
                onClick={() => updateSetting('deviceWidth', device.width)}
                className={`py-2 px-2 rounded-xl border text-center transition-all ${
                  settings.deviceWidth === device.width
                    ? 'bg-indigo-600/20 border-indigo-500 text-white'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="font-semibold">{device.label}</div>
                <div className="text-[10px] text-slate-500">{device.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Wallpaper Picker */}
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">
            Device Wallpaper
          </label>
          <div className="grid grid-cols-3 gap-2">
            {WALLPAPERS.map((wp) => (
              <button
                key={wp.id}
                onClick={() => updateSetting('wallpaper', wp.id)}
                style={{ background: wp.style }}
                className={`h-10 rounded-xl relative border transition-all cursor-pointer ${
                  settings.wallpaper === wp.id
                    ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-slate-950 border-white/60'
                    : 'border-white/10 hover:opacity-90'
                }`}
                title={wp.name}
              >
                {settings.wallpaper === wp.id && (
                  <div className="absolute inset-0 flex items-center justify-center text-white drop-shadow-md">
                    <Check size={16} strokeWidth={3} />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
