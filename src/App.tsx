import React, { useState, useEffect, useRef } from 'react';
import { 
  Sliders, 
  MessageSquare, 
  Sparkles 
} from 'lucide-react';
import type { NotificationContent, AccessibilitySettings, PresetTemplate } from './types/notification';
import { PRESET_TEMPLATES } from './constants/presets';
import { loadStateFromUrl } from './utils/urlSync';
import { exportElementAsPng } from './utils/exportImage';

import { Navbar } from './components/Navbar';
import { NotificationEditor } from './components/controls/NotificationEditor';
import { AccessibilityControls } from './components/controls/AccessibilityControls';
import { PresetsPicker } from './components/controls/PresetsPicker';
import { StudioView } from './components/views/StudioView';
import { MatrixView } from './components/views/MatrixView';
import { SpecsModal } from './components/common/SpecsModal';

export const App: React.FC = () => {
  // Try loading state from URL hash
  const initialLoaded = loadStateFromUrl();

  const [content, setContent] = useState<NotificationContent>(
    initialLoaded?.content || PRESET_TEMPLATES[0].content
  );

  const [settings, setSettings] = useState<AccessibilitySettings>(
    initialLoaded?.settings || {
      platform: 'ios',
      fontScale: 1.0,
      boldText: false,
      highContrast: false,
      reduceTransparency: false,
      theme: 'dark',
      deviceWidth: 393,
      wallpaper: 'ios-dusk',
      presentation: 'lockscreen',
      expanded: true,
    }
  );

  const [currentView, setCurrentView] = useState<'studio' | 'matrix'>('studio');
  const [activeTab, setActiveTab] = useState<'content' | 'accessibility' | 'presets'>('content');
  const [isSpecsOpen, setIsSpecsOpen] = useState<boolean>(false);
  const phoneRef = useRef<HTMLDivElement | null>(null);

  // Sync to URL hash when user modifies content or settings
  useEffect(() => {
    // Only update if window is available
    if (typeof window !== 'undefined') {
      const handlePopState = () => {
        const loaded = loadStateFromUrl();
        if (loaded?.content) setContent(loaded.content);
        if (loaded?.settings) setSettings(loaded.settings);
      };
      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, []);

  const handleSelectPreset = (preset: PresetTemplate) => {
    setContent(preset.content);
    if (preset.recommendedSettings) {
      setSettings((prev) => ({ ...prev, ...preset.recommendedSettings }));
    }
  };

  const handleExportPng = () => {
    if (phoneRef.current) {
      exportElementAsPng(
        phoneRef.current,
        `${content.appName.toLowerCase().replace(/\s+/g, '-')}-preview.png`
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        onViewChange={setCurrentView}
        content={content}
        settings={settings}
        onExportPng={handleExportPng}
        onOpenSpecs={() => setIsSpecsOpen(true)}
      />

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Interactive Control Drawer */}
        <aside className="w-full lg:w-[420px] xl:w-[460px] bg-slate-950 border-r border-slate-800/80 flex flex-col shrink-0">
          {/* Sidebar Navigation Tabs */}
          <div className="flex border-b border-slate-800 bg-slate-900/50 p-1.5 gap-1 select-none">
            <button
              onClick={() => setActiveTab('content')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'content'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <MessageSquare size={14} />
              <span>Content</span>
            </button>

            <button
              onClick={() => setActiveTab('accessibility')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'accessibility'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Sliders size={14} />
              <span>Accessibility</span>
            </button>

            <button
              onClick={() => setActiveTab('presets')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'presets'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Sparkles size={14} />
              <span>Presets</span>
            </button>
          </div>

          {/* Active Tab Panel Content */}
          <div className="flex-1 p-5 overflow-y-auto space-y-6">
            {activeTab === 'content' && (
              <NotificationEditor content={content} onChange={setContent} />
            )}

            {activeTab === 'accessibility' && (
              <AccessibilityControls settings={settings} onChange={setSettings} />
            )}

            {activeTab === 'presets' && (
              <PresetsPicker onSelectPreset={handleSelectPreset} />
            )}
          </div>
        </aside>

        {/* Center / Right Preview Viewport */}
        <main className="flex-1 flex flex-col bg-slate-900/40 overflow-y-auto">
          {currentView === 'studio' ? (
            <StudioView
              content={content}
              settings={settings}
              frameRef={phoneRef}
            />
          ) : (
            <MatrixView content={content} settings={settings} />
          )}
        </main>
      </div>

      {/* Specifications & Tokens Modal */}
      <SpecsModal
        isOpen={isSpecsOpen}
        onClose={() => setIsSpecsOpen(false)}
      />
    </div>
  );
};

export default App;
