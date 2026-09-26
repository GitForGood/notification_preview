import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import type { NotificationContent, AccessibilitySettings, Platform } from '../../types/notification';
import { IOSNotification } from '../preview/IOSNotification';
import { AndroidNotification } from '../preview/AndroidNotification';
import { WALLPAPERS } from '../../constants/presets';

interface MatrixViewProps {
  content: NotificationContent;
  settings: AccessibilitySettings;
}

interface MatrixItem {
  id: string;
  title: string;
  badge: string;
  platform: Platform;
  fontScale: number;
  boldText: boolean;
  highContrast: boolean;
  reduceTransparency: boolean;
  theme: 'light' | 'dark';
  expanded: boolean;
  wallpaper: string;
}

export const MatrixView: React.FC<MatrixViewProps> = ({ content, settings }) => {
  // Filters
  const [platformFilter, setPlatformFilter] = useState<'all' | 'ios' | 'android'>('all');
  const [scaleFilter, setScaleFilter] = useState<'all' | 'default' | 'ax'>('all');
  const [stateFilter, setStateFilter] = useState<'all' | 'collapsed' | 'expanded'>('all');
  const [themeFilter, setThemeFilter] = useState<'all' | 'dark' | 'light'>('all');

  // Matrix Combinations
  const matrixItems: MatrixItem[] = [
    {
      id: 'ios-std-dark',
      title: 'iOS Standard (Default)',
      badge: 'iOS 18 • 100% • Collapsed',
      platform: 'ios',
      fontScale: 1.0,
      boldText: false,
      highContrast: false,
      reduceTransparency: false,
      theme: 'dark',
      expanded: false,
      wallpaper: 'ios-dusk',
    },
    {
      id: 'ios-std-expanded-dark',
      title: 'iOS Standard (Expanded)',
      badge: 'iOS 18 • 100% • Expanded',
      platform: 'ios',
      fontScale: 1.0,
      boldText: false,
      highContrast: false,
      reduceTransparency: false,
      theme: 'dark',
      expanded: true,
      wallpaper: 'ios-dusk',
    },
    {
      id: 'ios-ax3-large',
      title: 'iOS Accessibility (AX3)',
      badge: 'iOS 18 • 220% Scale • Bold',
      platform: 'ios',
      fontScale: 2.2,
      boldText: true,
      highContrast: false,
      reduceTransparency: false,
      theme: 'dark',
      expanded: true,
      wallpaper: 'ios-dusk',
    },
    {
      id: 'ios-reduced-transparency-light',
      title: 'iOS Light + Solid Backing',
      badge: 'iOS 18 • Reduce Transparency',
      platform: 'ios',
      fontScale: 1.0,
      boldText: false,
      highContrast: true,
      reduceTransparency: true,
      theme: 'light',
      expanded: true,
      wallpaper: 'sunset-blush',
    },
    {
      id: 'android-m3-std-collapsed',
      title: 'Android M3 (Collapsed 1-line)',
      badge: 'M3 • 100% Scale • Collapsed',
      platform: 'android',
      fontScale: 1.0,
      boldText: false,
      highContrast: false,
      reduceTransparency: false,
      theme: 'dark',
      expanded: false,
      wallpaper: 'android-ocean',
    },
    {
      id: 'android-m3-std-expanded',
      title: 'Android M3 (Expanded)',
      badge: 'M3 • 100% Scale • Expanded',
      platform: 'android',
      fontScale: 1.0,
      boldText: false,
      highContrast: false,
      reduceTransparency: false,
      theme: 'dark',
      expanded: true,
      wallpaper: 'android-ocean',
    },
    {
      id: 'android-m3-max-scale',
      title: 'Android 14+ Non-linear Max',
      badge: 'M3 • 200% Scale • Expanded',
      platform: 'android',
      fontScale: 2.0,
      boldText: true,
      highContrast: false,
      reduceTransparency: false,
      theme: 'dark',
      expanded: true,
      wallpaper: 'android-ocean',
    },
    {
      id: 'android-m3-light-contrast',
      title: 'Android M3 Light (High Contrast)',
      badge: 'M3 Light • High Contrast',
      platform: 'android',
      fontScale: 1.15,
      boldText: false,
      highContrast: true,
      reduceTransparency: false,
      theme: 'light',
      expanded: true,
      wallpaper: 'minimal-light',
    },
  ];

  // Filter application
  const filteredItems = matrixItems.filter((item) => {
    if (platformFilter !== 'all' && item.platform !== platformFilter) return false;
    if (scaleFilter === 'default' && item.fontScale > 1.15) return false;
    if (scaleFilter === 'ax' && item.fontScale <= 1.15) return false;
    if (stateFilter === 'collapsed' && item.expanded) return false;
    if (stateFilter === 'expanded' && !item.expanded) return false;
    if (themeFilter !== 'all' && item.theme !== themeFilter) return false;
    return true;
  });

  return (
    <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-6">
      {/* Filter and Overview Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-indigo-400" />
            <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              Multi-Device Accessibility Matrix
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-mono font-medium">
              Showing {filteredItems.length} of {matrixItems.length} views
            </span>
          </div>

          <div className="text-xs text-slate-400">
            Compare layout breaking points, line clamps, and button reflow side-by-side.
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-slate-800/80 text-xs">
          {/* Platform Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-medium">Platform:</span>
            <div className="inline-flex rounded-lg bg-slate-950 p-0.5 border border-slate-800">
              {(['all', 'ios', 'android'] as const).map((opt) => (
                <button
                  key={opt}
                  onClick={() => setPlatformFilter(opt)}
                  className={`px-2.5 py-1 rounded-md capitalize transition-all cursor-pointer ${
                    platformFilter === opt
                      ? 'bg-indigo-600 text-white font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {opt === 'all' ? 'All' : opt === 'ios' ? 'iOS' : 'Android'}
                </button>
              ))}
            </div>
          </div>

          {/* Scale Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-medium">Scale:</span>
            <div className="inline-flex rounded-lg bg-slate-950 p-0.5 border border-slate-800">
              {[
                { id: 'all', label: 'All' },
                { id: 'default', label: 'Standard (100%)' },
                { id: 'ax', label: 'Accessibility (160%+)' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setScaleFilter(opt.id as any)}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                    scaleFilter === opt.id
                      ? 'bg-indigo-600 text-white font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* State Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-medium">State:</span>
            <div className="inline-flex rounded-lg bg-slate-950 p-0.5 border border-slate-800">
              {(['all', 'collapsed', 'expanded'] as const).map((opt) => (
                <button
                  key={opt}
                  onClick={() => setStateFilter(opt)}
                  className={`px-2.5 py-1 rounded-md capitalize transition-all cursor-pointer ${
                    stateFilter === opt
                      ? 'bg-indigo-600 text-white font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-medium">Theme:</span>
            <div className="inline-flex rounded-lg bg-slate-950 p-0.5 border border-slate-800">
              {(['all', 'dark', 'light'] as const).map((opt) => (
                <button
                  key={opt}
                  onClick={() => setThemeFilter(opt)}
                  className={`px-2.5 py-1 rounded-md capitalize transition-all cursor-pointer ${
                    themeFilter === opt
                      ? 'bg-indigo-600 text-white font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredItems.map((item) => {
          const itemSettings: AccessibilitySettings = {
            ...settings,
            platform: item.platform,
            fontScale: item.fontScale,
            boldText: item.boldText,
            highContrast: item.highContrast,
            reduceTransparency: item.reduceTransparency,
            theme: item.theme,
            expanded: item.expanded,
            wallpaper: item.wallpaper,
          };

          const wpObj = WALLPAPERS.find((w) => w.id === item.wallpaper) || WALLPAPERS[0];

          return (
            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-lg flex flex-col"
            >
              {/* Card Meta Header */}
              <div className="px-5 py-3 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-slate-200">{item.title}</h3>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                    {item.badge}
                  </div>
                </div>
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    item.platform === 'ios'
                      ? 'bg-sky-500/20 text-sky-300'
                      : 'bg-emerald-500/20 text-emerald-300'
                  }`}
                >
                  {item.platform === 'ios' ? 'Apple' : 'Android'}
                </span>
              </div>

              {/* Simulated Device Wallpaper Environment */}
              <div
                style={{ background: wpObj.style }}
                className="p-6 sm:p-8 flex-1 flex items-center justify-center relative overflow-hidden"
              >
                <div className="w-full max-w-[380px]">
                  {item.platform === 'ios' ? (
                    <IOSNotification
                      content={content}
                      settings={itemSettings}
                      isExpandedOverride={item.expanded}
                    />
                  ) : (
                    <AndroidNotification
                      content={content}
                      settings={itemSettings}
                      isExpandedOverride={item.expanded}
                    />
                  )}
                </div>
              </div>

              {/* Key Audit Insights Bar */}
              <div className="px-4 py-2.5 bg-slate-950/90 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
                <span>
                  Font: {Math.round(item.fontScale * 100)}% • {item.theme} mode • {item.expanded ? 'Expanded' : 'Collapsed'}
                </span>
                {item.fontScale >= 1.6 && (
                  <span className="text-amber-400 font-medium">⚠️ Large Type</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
