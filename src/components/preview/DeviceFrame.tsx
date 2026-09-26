import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';
import type { NotificationContent, AccessibilitySettings } from '../../types/notification';
import { WALLPAPERS } from '../../constants/presets';
import { IOSNotification } from './IOSNotification';
import { AndroidNotification } from './AndroidNotification';

interface DeviceFrameProps {
  content: NotificationContent;
  settings: AccessibilitySettings;
  frameRef?: React.RefObject<HTMLDivElement | null>;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  content,
  settings,
  frameRef,
}) => {
  const { platform, deviceWidth, wallpaper, presentation } = settings;
  const currentWallpaper = WALLPAPERS.find(w => w.id === wallpaper) || WALLPAPERS[0];
  const isDarkWallpaper = currentWallpaper.tone === 'dark';

  // Dynamic lockscreen time
  const currentTime = '9:41';
  const currentDate = 'Saturday, September 26';

  return (
    <div className="flex flex-col items-center justify-center py-4">
      {/* Phone chassis */}
      <div
        ref={frameRef}
        style={{
          width: `${deviceWidth}px`,
          minHeight: '680px',
        }}
        className="relative rounded-[48px] p-3.5 bg-slate-900 border-[7px] border-slate-700/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] transition-all duration-300 overflow-hidden flex flex-col"
      >
        {/* Screen Bezel & Wallpaper Background */}
        <div
          style={{
            background: currentWallpaper.style,
          }}
          className="relative flex-1 w-full rounded-[38px] overflow-hidden flex flex-col justify-between"
        >
          {/* Subtle wallpaper gradient overlay for legibility */}
          <div className="absolute inset-0 bg-black/10 pointer-events-none" />

          {/* Top Status Bar & Camera Hardware */}
          <div className="relative z-10 w-full pt-2.5 px-6 flex items-center justify-between text-xs select-none">
            {platform === 'ios' ? (
              <>
                {/* iOS Left Clock */}
                <span className={`font-semibold tracking-tight ${isDarkWallpaper ? 'text-white' : 'text-slate-900'}`}>
                  {currentTime}
                </span>

                {/* Dynamic Island */}
                <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-24 h-6 bg-black rounded-full shadow-inner flex items-center justify-end px-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-950 ring-1 ring-white/10" />
                </div>

                {/* iOS Right Icons */}
                <div className={`flex items-center space-x-1.5 ${isDarkWallpaper ? 'text-white' : 'text-slate-900'}`}>
                  <Signal size={12} strokeWidth={2.4} />
                  <Wifi size={12} strokeWidth={2.4} />
                  <Battery size={15} strokeWidth={2.4} className="rotate-90" />
                </div>
              </>
            ) : (
              <>
                {/* Android Left Clock */}
                <span className={`font-medium ${isDarkWallpaper ? 'text-white' : 'text-slate-900'}`}>
                  10:00
                </span>

                {/* Android Center Camera Punchhole */}
                <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-3.5 h-3.5 bg-black rounded-full ring-1 ring-white/10" />

                {/* Android Right Icons */}
                <div className={`flex items-center space-x-2 ${isDarkWallpaper ? 'text-white' : 'text-slate-900'}`}>
                  <span className="text-[10px] font-semibold">5G</span>
                  <Wifi size={12} strokeWidth={2.4} />
                  <Battery size={13} strokeWidth={2.4} />
                </div>
              </>
            )}
          </div>

          {/* Lock Screen Centered Clock (if Lockscreen mode) */}
          {presentation === 'lockscreen' && (
            <div className="relative z-10 text-center pt-8 pb-4 select-none">
              <div
                className={`text-xs font-medium uppercase tracking-wider ${
                  isDarkWallpaper ? 'text-white/80' : 'text-slate-800/80'
                }`}
              >
                {currentDate}
              </div>
              <div
                style={{
                  fontFamily: platform === 'ios' ? 'system-ui' : 'Roboto',
                }}
                className={`text-6xl font-bold tracking-tight mt-1 ${
                  isDarkWallpaper ? 'text-white' : 'text-slate-900'
                }`}
              >
                {currentTime}
              </div>
            </div>
          )}

          {/* Notification Placement Container */}
          <div
            className={`relative z-10 w-full px-3.5 flex-1 flex flex-col ${
              presentation === 'banner'
                ? 'justify-start pt-2'
                : presentation === 'lockscreen'
                  ? 'justify-center pb-12'
                  : 'justify-start pt-4'
            }`}
          >
            {/* Header label in Lock Screen mode */}
            {presentation === 'lockscreen' && (
              <div className="flex items-center justify-between px-1 mb-2">
                <span
                  className={`text-[11px] font-semibold uppercase tracking-wider ${
                    isDarkWallpaper ? 'text-white/60' : 'text-slate-700/60'
                  }`}
                >
                  Notification Center
                </span>
                <span
                  className={`text-[11px] ${
                    isDarkWallpaper ? 'text-white/60' : 'text-slate-700/60'
                  }`}
                >
                  Tap to open
                </span>
              </div>
            )}

            {/* Notification Card Component */}
            {platform === 'ios' ? (
              <IOSNotification content={content} settings={settings} />
            ) : (
              <AndroidNotification content={content} settings={settings} />
            )}
          </div>

          {/* Bottom Home Indicator / Navigation Bar */}
          <div className="relative z-10 pb-2.5 pt-4 flex justify-center items-center">
            {platform === 'ios' ? (
              <div
                className={`w-32 h-1 rounded-full ${
                  isDarkWallpaper ? 'bg-white/70' : 'bg-black/60'
                }`}
              />
            ) : (
              <div
                className={`w-20 h-1 rounded-full ${
                  isDarkWallpaper ? 'bg-white/60' : 'bg-black/50'
                }`}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
