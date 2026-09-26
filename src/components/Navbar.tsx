import React, { useState } from 'react';
import { 
  BellRing, 
  Smartphone, 
  Grid, 
  Share2, 
  Download, 
  BookOpen, 
  Check 
} from 'lucide-react';
import { serializeStateToUrl } from '../utils/urlSync';
import type { NotificationContent, AccessibilitySettings } from '../types/notification';

interface NavbarProps {
  currentView: 'studio' | 'matrix';
  onViewChange: (view: 'studio' | 'matrix') => void;
  content: NotificationContent;
  settings: AccessibilitySettings;
  onExportPng: () => void;
  onOpenSpecs: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onViewChange,
  content,
  settings,
  onExportPng,
  onOpenSpecs,
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const url = serializeStateToUrl({ content, settings });
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40 px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Brand / Title */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <BellRing size={17} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-tight text-white">
                Notification Previewer
              </span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded-sm bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold">
                iOS & M3
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Accessibility & device visualizer for GitHub Pages
            </p>
          </div>
        </div>

        {/* Center: View Switcher */}
        <div className="flex items-center p-0.5 rounded-xl bg-slate-900 border border-slate-800">
          <button
            onClick={() => onViewChange('studio')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              currentView === 'studio'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone size={14} />
            <span className="hidden sm:inline">Studio</span>
          </button>
          <button
            onClick={() => onViewChange('matrix')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              currentView === 'matrix'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Grid size={14} />
            <span className="hidden sm:inline">Comparison Matrix</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Design Specs Modal Button */}
          <button
            onClick={onOpenSpecs}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-medium transition-all cursor-pointer"
            title="Design specifications and type tokens"
          >
            <BookOpen size={14} className="text-indigo-400" />
            <span className="hidden md:inline">M3 & Apple Specs</span>
          </button>

          {/* Share Link Button */}
          <button
            onClick={handleShare}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
            title="Copy shareable link with current configuration"
          >
            {copied ? <Check size={14} /> : <Share2 size={14} />}
            <span className="hidden sm:inline">{copied ? 'Link Copied!' : 'Share'}</span>
          </button>

          {/* Export PNG */}
          {currentView === 'studio' && (
            <button
              onClick={onExportPng}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
              title="Download high-resolution image"
            >
              <Download size={14} />
              <span className="hidden sm:inline">Export PNG</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
