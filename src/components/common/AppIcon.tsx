import React from 'react';
import type { Platform } from '../../types/notification';
import { APP_ICON_PRESETS } from '../../constants/appIcons';

interface AppIconProps {
  preset: string;
  customUrl?: string;
  platform: Platform;
  size?: number; // size in px, e.g. 20, 24, 38
  className?: string;
}

export const AppIcon: React.FC<AppIconProps> = ({
  preset,
  customUrl,
  platform,
  size = 24,
  className = '',
}) => {
  if (customUrl) {
    return (
      <img
        src={customUrl}
        alt="App icon"
        style={{ width: `${size}px`, height: `${size}px` }}
        className={`object-cover ${
          platform === 'ios' ? 'rounded-[22%]' : 'rounded-full'
        } ${className}`}
      />
    );
  }

  const presetData = APP_ICON_PRESETS.find(p => p.id === preset) || APP_ICON_PRESETS[APP_ICON_PRESETS.length - 1];
  const IconComponent = presetData.icon;
  const iconPixelSize = Math.max(12, Math.round(size * 0.58));

  if (platform === 'android') {
    return (
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: presetData.bg,
        }}
        className={`flex items-center justify-center rounded-full text-white shadow-xs ${className}`}
      >
        <IconComponent size={iconPixelSize} strokeWidth={2.4} />
      </div>
    );
  }

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: presetData.bg,
        borderRadius: `${size * 0.22}px`,
      }}
      className={`flex items-center justify-center text-white shadow-xs ${className}`}
    >
      <IconComponent size={iconPixelSize} strokeWidth={2.4} />
    </div>
  );
};
