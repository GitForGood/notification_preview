import React from 'react';
import type { NotificationContent, AccessibilitySettings } from '../../types/notification';
import { DeviceFrame } from '../preview/DeviceFrame';
import { TruncationLinter } from '../preview/TruncationLinter';

interface StudioViewProps {
  content: NotificationContent;
  settings: AccessibilitySettings;
  frameRef?: React.RefObject<HTMLDivElement | null>;
}

export const StudioView: React.FC<StudioViewProps> = ({
  content,
  settings,
  frameRef,
}) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-start p-4 md:p-6 overflow-y-auto">
      {/* Device frame container */}
      <div className="w-full flex justify-center">
        <DeviceFrame
          content={content}
          settings={settings}
          frameRef={frameRef}
        />
      </div>

      {/* Real-time Truncation & Accessibility Auditor */}
      <div className="w-full max-w-xl mt-6">
        <TruncationLinter content={content} settings={settings} />
      </div>
    </div>
  );
};
