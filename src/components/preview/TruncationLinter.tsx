import React from 'react';
import { AlertTriangle, CheckCircle, Info, ShieldAlert } from 'lucide-react';
import type { NotificationContent, AccessibilitySettings, AuditWarning } from '../../types/notification';

interface TruncationLinterProps {
  content: NotificationContent;
  settings: AccessibilitySettings;
}

export const TruncationLinter: React.FC<TruncationLinterProps> = ({
  content,
  settings,
}) => {
  const { fontScale, platform, expanded, deviceWidth } = settings;

  const warnings: AuditWarning[] = [];

  // Title Audit
  const titleCharLimit = Math.round(
    (deviceWidth === 360 ? 32 : deviceWidth === 430 ? 46 : 38) / (fontScale * 0.9)
  );
  if (content.title.length > titleCharLimit) {
    warnings.push({
      type: 'warning',
      field: 'title',
      message: `Title (${content.title.length} chars) exceeds single-line budget (~${titleCharLimit} chars at ${Math.round(fontScale * 100)}% scale).`,
      recommendation: 'Title will wrap to line 2 or truncate with ellipses on compact devices.',
    });
  }

  // Body Truncation Audit
  if (!expanded) {
    if (platform === 'android') {
      const androidOneLineLimit = Math.round(48 / fontScale);
      if (content.body.length > androidOneLineLimit) {
        warnings.push({
          type: 'error',
          field: 'body',
          message: `Android collapsed state clamps body to 1 line (~${androidOneLineLimit} chars). Currently ${content.body.length} chars.`,
          recommendation: 'Front-load key message details in the first 6-8 words so users grasp the message before expanding.',
        });
      }
    } else {
      const iosTwoLineLimit = Math.round(95 / fontScale);
      if (content.body.length > iosTwoLineLimit) {
        warnings.push({
          type: 'warning',
          field: 'body',
          message: `iOS collapsed banner clamps body to ~2-3 lines (~${iosTwoLineLimit} chars). Currently ${content.body.length} chars.`,
          recommendation: 'Users must long-press or tap to read remaining content.',
        });
      }
    }
  }

  // Action Buttons Audit
  if (content.actions.length > 0) {
    const longActions = content.actions.filter(a => a.label.length > 14);
    if (longActions.length > 0) {
      warnings.push({
        type: 'warning',
        field: 'actions',
        message: `Action button label "${longActions[0].label}" has ${longActions[0].label.length} chars (guideline max: 12-14).`,
        recommendation: 'On small screens or enlarged text sizes, buttons will wrap or stack into a vertical list.',
      });
    }

    if (fontScale >= 1.4) {
      warnings.push({
        type: 'info',
        field: 'actions',
        message: `Accessibility scale (${Math.round(fontScale * 100)}%) forces action buttons into stacked column layout.`,
        recommendation: 'Ensure your app layout handles vertical growth cleanly.',
      });
    }
  }

  // Transparency Audit
  if (!settings.reduceTransparency && settings.wallpaper === 'sunset-blush' && settings.theme === 'light') {
    warnings.push({
      type: 'info',
      field: 'contrast',
      message: 'Vibrant wallpaper combined with light frosted glass may reduce text contrast ratio.',
      recommendation: 'Verify readability or test with "Reduce Transparency" / "High Contrast" enabled.',
    });
  }

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-sm text-sm">
      <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2.5">
        <div className="flex items-center space-x-2">
          <ShieldAlert size={18} className="text-indigo-400" />
          <span className="font-semibold text-slate-200">Accessibility & Truncation Auditor</span>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
            Title: {content.title.length} chars
          </span>
          <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
            Body: {content.body.length} chars
          </span>
        </div>
      </div>

      {warnings.length === 0 ? (
        <div className="flex items-center space-x-2 text-emerald-400 py-1">
          <CheckCircle size={16} />
          <span className="text-xs">
            All text and buttons fit cleanly within safe margins at current {Math.round(fontScale * 100)}% font scaling!
          </span>
        </div>
      ) : (
        <div className="space-y-2">
          {warnings.map((w, idx) => (
            <div
              key={idx}
              className={`p-2.5 rounded-xl border text-xs flex items-start space-x-2.5 ${
                w.type === 'error'
                  ? 'bg-rose-950/30 border-rose-800/50 text-rose-200'
                  : w.type === 'warning'
                    ? 'bg-amber-950/30 border-amber-800/50 text-amber-200'
                    : 'bg-indigo-950/30 border-indigo-800/50 text-indigo-200'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {w.type === 'error' ? (
                  <AlertTriangle size={15} className="text-rose-400" />
                ) : w.type === 'warning' ? (
                  <AlertTriangle size={15} className="text-amber-400" />
                ) : (
                  <Info size={15} className="text-indigo-400" />
                )}
              </div>
              <div className="space-y-0.5">
                <div className="font-medium">{w.message}</div>
                <div className="opacity-80 text-[11px]">{w.recommendation}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
