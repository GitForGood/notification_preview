import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { NotificationContent, AccessibilitySettings } from '../../types/notification';
import { AppIcon } from '../common/AppIcon';

interface AndroidNotificationProps {
  content: NotificationContent;
  settings: AccessibilitySettings;
  isExpandedOverride?: boolean;
}

export const AndroidNotification: React.FC<AndroidNotificationProps> = ({
  content,
  settings,
  isExpandedOverride,
}) => {
  const [internalExpanded, setInternalExpanded] = useState<boolean>(false);
  const isExpanded = isExpandedOverride ?? (settings.expanded || internalExpanded);
  const isDark = settings.theme === 'dark';
  const { fontScale, boldText, highContrast } = settings;

  // Material 3 Typography tokens scaled by fontScale
  const labelSmall = Math.max(10, Math.round(11 * fontScale));
  const bodySmall = Math.max(10, Math.round(12 * fontScale));
  const titleMedium = Math.max(13, Math.round(16 * fontScale));
  const bodyMedium = Math.max(12, Math.round(14 * fontScale));
  const labelLarge = Math.max(12, Math.round(14 * fontScale));

  // M3 Colors
  const surfaceClass = isDark
    ? 'bg-[#211f26] text-[#e6e0e9]'
    : 'bg-[#f7f2fa] text-[#1d1b20]';

  const outlineClass = highContrast
    ? isDark
      ? 'border-2 border-[#938f99]'
      : 'border-2 border-[#79747e]'
    : isDark
      ? 'border border-white/5 shadow-md shadow-black/40'
      : 'border border-black/5 shadow-sm shadow-black/10';

  const secondaryColor = isDark ? 'text-[#cac4d0]' : 'text-[#49454f]';
  const tertiaryColor = isDark ? 'text-[#938f99]' : 'text-[#79747e]';

  const fontWeightTitle = boldText ? 'font-bold' : 'font-medium';
  const fontWeightBody = boldText ? 'font-medium' : 'font-normal';
  const fontWeightBtn = boldText ? 'font-bold' : 'font-medium';

  // Toggle internal expansion when chevron is clicked
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setInternalExpanded(!isExpanded);
  };

  return (
    <div
      style={{
        fontFamily: 'Roboto, "Google Sans", "Segoe UI", sans-serif',
      }}
      className={`relative w-full rounded-[24px] p-4 transition-all duration-200 select-none ${surfaceClass} ${outlineClass}`}
    >
      {/* M3 Header: Icon + App Name + Subtext + Dot + Time + Expand Chevron */}
      <div className="flex items-center justify-between gap-1 mb-2.5">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <AppIcon
            preset={content.appIconPreset}
            customUrl={content.customIconUrl}
            platform="android"
            size={18}
            className="shrink-0"
          />

          <span
            style={{ fontSize: `${labelSmall}px` }}
            className={`font-medium tracking-wide uppercase truncate ${tertiaryColor}`}
          >
            {content.appName}
          </span>

          {content.subtitle && (
            <>
              <span className={`text-[10px] ${tertiaryColor}`}>•</span>
              <span
                style={{ fontSize: `${labelSmall}px` }}
                className={`truncate ${secondaryColor}`}
              >
                {content.subtitle}
              </span>
            </>
          )}

          <span className={`text-[10px] ${tertiaryColor}`}>•</span>
          <span
            style={{ fontSize: `${bodySmall}px` }}
            className={`${tertiaryColor} shrink-0`}
          >
            {content.timestamp}
          </span>
        </div>

        {/* Expand / Collapse Chevron */}
        <button
          onClick={handleToggle}
          aria-label={isExpanded ? 'Collapse' : 'Expand'}
          className={`p-1 -mr-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-transform cursor-pointer ${
            isExpanded ? 'rotate-180' : ''
          }`}
        >
          <ChevronDown size={18} className={tertiaryColor} />
        </button>
      </div>

      {/* Main Body Layout */}
      <div className="flex items-start gap-3">
        {/* Contact Avatar for messaging */}
        {content.category === 'messaging' && content.avatarUrl && (
          <div className="shrink-0 mt-0.5">
            <img
              src={content.avatarUrl}
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover ring-1 ring-black/10 dark:ring-white/10"
            />
          </div>
        )}

        {/* Text Details */}
        <div className="flex-1 min-w-0">
          <div
            style={{
              fontSize: `${titleMedium}px`,
              lineHeight: `${Math.round(titleMedium * 1.35)}px`,
            }}
            className={`${fontWeightTitle} tracking-tight`}
          >
            {content.title}
          </div>

          <div
            style={{
              fontSize: `${bodyMedium}px`,
              lineHeight: `${Math.round(bodyMedium * 1.4)}px`,
            }}
            className={`${fontWeightBody} ${secondaryColor} mt-1 ${
              !isExpanded ? 'line-clamp-1' : ''
            }`}
          >
            {content.body}
          </div>

          {/* M3 Linear Progress Bar */}
          {content.category === 'progress' && (
            <div className="mt-3">
              <div className="w-full bg-slate-300 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#6750a4] dark:bg-[#d0bcff] h-full rounded-full transition-all duration-300"
                  style={{ width: `${content.progress || 60}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Trailing Thumbnail (Visible when collapsed or small thumbnail mode) */}
        {content.mediaType === 'thumbnail' && content.mediaUrl && (
          <div className="shrink-0">
            <img
              src={content.mediaUrl}
              alt="Thumbnail"
              className="w-12 h-12 rounded-xl object-cover ring-1 ring-black/5 dark:ring-white/10"
            />
          </div>
        )}
      </div>

      {/* BigPicture Media when expanded */}
      {isExpanded && content.mediaType === 'bigPicture' && content.mediaUrl && (
        <div className="mt-3.5 overflow-hidden rounded-[16px]">
          <img
            src={content.mediaUrl}
            alt="Big picture attachment"
            className="w-full h-44 object-cover"
          />
        </div>
      )}

      {/* M3 Action Buttons (Visible when expanded or always for high-priority) */}
      {content.actions.length > 0 && isExpanded && (
        <div className="mt-3 pt-2 flex flex-wrap items-center gap-2">
          {content.actions.map((action, idx) => (
            <button
              key={action.id || idx}
              style={{
                fontSize: `${labelLarge}px`,
              }}
              className={`px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${fontWeightBtn} ${
                action.style === 'destructive'
                  ? 'bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20'
                  : action.style === 'tonal'
                    ? isDark
                      ? 'bg-[#4a4458] text-[#e8def8] hover:bg-[#524b61]'
                      : 'bg-[#e8def8] text-[#1d192b] hover:bg-[#ded1f3]'
                    : isDark
                      ? 'text-[#d0bcff] hover:bg-white/5 active:bg-white/10'
                      : 'text-[#6750a4] hover:bg-black/5 active:bg-black/10'
              }`}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
