import React from 'react';
import type { NotificationContent, AccessibilitySettings } from '../../types/notification';
import { AppIcon } from '../common/AppIcon';

interface IOSNotificationProps {
  content: NotificationContent;
  settings: AccessibilitySettings;
  isExpandedOverride?: boolean;
}

export const IOSNotification: React.FC<IOSNotificationProps> = ({
  content,
  settings,
  isExpandedOverride,
}) => {
  const isExpanded = isExpandedOverride ?? settings.expanded;
  const isDark = settings.theme === 'dark';
  const { fontScale, boldText, highContrast, reduceTransparency } = settings;

  // Base typography scales multiplied by fontScale
  const headerSize = Math.max(11, Math.round(13 * fontScale));
  const titleSize = Math.max(13, Math.round(15 * fontScale));
  const subtitleSize = Math.max(12, Math.round(14 * fontScale));
  const bodySize = Math.max(12, Math.round(14.5 * fontScale));
  const actionSize = Math.max(12, Math.round(15 * fontScale));

  // Determine background & borders based on accessibility settings
  let cardBgClass = '';
  if (reduceTransparency) {
    cardBgClass = isDark ? 'bg-[#1c1c1e] text-white' : 'bg-[#f2f2f7] text-[#1c1c1e]';
  } else {
    cardBgClass = isDark
      ? 'bg-[rgba(30,30,32,0.72)] backdrop-blur-2xl text-white'
      : 'bg-[rgba(255,255,255,0.76)] backdrop-blur-2xl text-[#1c1c1e]';
  }

  const borderClass = highContrast
    ? isDark
      ? 'border border-white/40 shadow-xl'
      : 'border border-black/40 shadow-xl'
    : isDark
      ? 'border border-white/10 shadow-lg shadow-black/25'
      : 'border border-black/5 shadow-md shadow-black/5';

  const secondaryTextClass = isDark ? 'text-slate-400' : 'text-slate-600';
  const bodyTextClass = isDark ? 'text-slate-200' : 'text-slate-800';

  const fontWeightTitle = boldText ? 'font-bold' : 'font-semibold';
  const fontWeightBody = boldText ? 'font-medium' : 'font-normal';
  const fontWeightAction = boldText ? 'font-bold' : 'font-semibold';

  // In iOS Dynamic Type Accessibility (AX), buttons stack vertically
  const stackButtons = fontScale >= 1.4 || content.actions.some(a => a.label.length > 14);

  return (
    <div
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", sans-serif',
      }}
      className={`relative w-full rounded-[22px] transition-all duration-200 overflow-hidden select-none ${cardBgClass} ${borderClass}`}
    >
      {/* Main Notification Card Container */}
      <div className="p-3.5 sm:p-4">
        {/* Top Header: App Icon, App Name, Timestamp */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2 min-w-0">
            <AppIcon
              preset={content.appIconPreset}
              customUrl={content.customIconUrl}
              platform="ios"
              size={20}
              className="shrink-0"
            />
            <span
              style={{ fontSize: `${headerSize}px` }}
              className={`font-semibold tracking-tight uppercase truncate ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              {content.appName}
            </span>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <span
              style={{ fontSize: `${headerSize * 0.95}px` }}
              className={`${secondaryTextClass} font-normal`}
            >
              {content.timestamp}
            </span>
            {content.badgeCount && content.badgeCount > 0 && (
              <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[11px] font-bold rounded-full bg-red-500 text-white leading-none">
                {content.badgeCount}
              </span>
            )}
          </div>
        </div>

        {/* Content Body Layout */}
        <div className="flex items-start space-x-3">
          {/* Avatar for Chat Style */}
          {content.category === 'messaging' && content.avatarUrl && (
            <div className="relative shrink-0 mt-0.5">
              <img
                src={content.avatarUrl}
                alt="Sender Avatar"
                className="w-10 h-10 rounded-full object-cover shadow-xs"
              />
              <div className="absolute -bottom-1 -right-1">
                <AppIcon
                  preset={content.appIconPreset}
                  platform="ios"
                  size={14}
                  className="ring-2 ring-white/80 dark:ring-black/80"
                />
              </div>
            </div>
          )}

          {/* Text Content */}
          <div className="flex-1 min-w-0">
            {/* Title */}
            <div
              style={{
                fontSize: `${titleSize}px`,
                lineHeight: `${Math.round(titleSize * 1.3)}px`,
              }}
              className={`${fontWeightTitle} tracking-tight ${
                !isExpanded ? 'line-clamp-2' : ''
              }`}
            >
              {content.title}
            </div>

            {/* Subtitle */}
            {content.subtitle && (
              <div
                style={{
                  fontSize: `${subtitleSize}px`,
                  lineHeight: `${Math.round(subtitleSize * 1.3)}px`,
                }}
                className={`font-medium ${secondaryTextClass} mt-0.5 truncate`}
              >
                {content.subtitle}
              </div>
            )}

            {/* Body Text */}
            <div
              style={{
                fontSize: `${bodySize}px`,
                lineHeight: `${Math.round(bodySize * 1.38)}px`,
              }}
              className={`${fontWeightBody} ${bodyTextClass} mt-1 ${
                !isExpanded ? 'line-clamp-3' : ''
              }`}
            >
              {content.body}
            </div>

            {/* Live Progress Bar (if category is progress) */}
            {content.category === 'progress' && (
              <div className="mt-3">
                <div className="flex justify-between items-center text-xs mb-1 font-medium">
                  <span className={secondaryTextClass}>Status</span>
                  <span className={fontWeightTitle}>{content.progress || 60}%</span>
                </div>
                <div className="w-full bg-slate-300/40 dark:bg-slate-700/60 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-600 dark:bg-indigo-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${content.progress || 60}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Small Trailing Thumbnail (if thumbnail mode & not big picture) */}
          {content.mediaType === 'thumbnail' && content.mediaUrl && (
            <div className="shrink-0 pl-1">
              <img
                src={content.mediaUrl}
                alt="Thumbnail"
                className="w-12 h-12 rounded-xl object-cover shadow-xs border border-black/5 dark:border-white/10"
              />
            </div>
          )}
        </div>

        {/* Big Picture Rich Media (when mediaType is bigPicture or expanded) */}
        {content.mediaType === 'bigPicture' && content.mediaUrl && (
          <div className="mt-3 overflow-hidden rounded-xl border border-black/5 dark:border-white/10">
            <img
              src={content.mediaUrl}
              alt="Expanded preview"
              className="w-full h-40 object-cover"
            />
          </div>
        )}
      </div>

      {/* iOS Action Buttons (Shown when expanded or actions exist) */}
      {content.actions.length > 0 && isExpanded && (
        <div
          className={`border-t ${
            isDark ? 'border-white/10' : 'border-black/10'
          } ${
            stackButtons
              ? 'flex flex-col'
              : `grid grid-cols-${content.actions.length} divide-x ${
                  isDark ? 'divide-white/10' : 'divide-black/10'
                }`
          }`}
        >
          {content.actions.map((action, idx) => (
            <button
              key={action.id || idx}
              style={{
                fontSize: `${actionSize}px`,
              }}
              className={`py-3 px-4 text-center transition-colors select-none cursor-pointer ${
                stackButtons && idx > 0
                  ? isDark
                    ? 'border-t border-white/10'
                    : 'border-t border-black/10'
                  : ''
              } ${
                action.style === 'destructive'
                  ? 'text-red-500 hover:bg-red-500/10'
                  : isDark
                    ? 'text-indigo-400 hover:bg-white/5 active:bg-white/10'
                    : 'text-indigo-600 hover:bg-black/5 active:bg-black/10'
              } ${fontWeightAction}`}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
