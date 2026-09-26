export interface DynamicTypeScale {
  id: string;
  name: string;
  scale: number;
  isAccessibility?: boolean;
}

export const IOS_DYNAMIC_TYPE_SCALES: DynamicTypeScale[] = [
  { id: 'xs', name: 'xSmall', scale: 0.82 },
  { id: 's', name: 'Small', scale: 0.88 },
  { id: 'm', name: 'Medium', scale: 0.94 },
  { id: 'l', name: 'Large (Default)', scale: 1.0 },
  { id: 'xl', name: 'xLarge', scale: 1.12 },
  { id: 'xxl', name: 'xxLarge', scale: 1.24 },
  { id: 'xxxl', name: 'xxxLarge', scale: 1.35 },
  // Accessibility Sizes
  { id: 'ax1', name: 'AX1 (Large)', scale: 1.6, isAccessibility: true },
  { id: 'ax2', name: 'AX2', scale: 1.9, isAccessibility: true },
  { id: 'ax3', name: 'AX3', scale: 2.2, isAccessibility: true },
  { id: 'ax4', name: 'AX4', scale: 2.6, isAccessibility: true },
  { id: 'ax5', name: 'AX5 (Max)', scale: 3.1, isAccessibility: true },
];

export const ANDROID_FONT_SCALES: DynamicTypeScale[] = [
  { id: 'a-small', name: 'Small (85%)', scale: 0.85 },
  { id: 'a-default', name: 'Default (100%)', scale: 1.0 },
  { id: 'a-large', name: 'Large (115%)', scale: 1.15 },
  { id: 'a-largest', name: 'Largest (130%)', scale: 1.30 },
  { id: 'a-super', name: 'Display Zoom (160%)', scale: 1.60, isAccessibility: true },
  { id: 'a-max', name: 'Android 14+ Max (200%)', scale: 2.00, isAccessibility: true },
];

export const M3_TYPE_SPECS = {
  appName: {
    token: 'labelSmall',
    baseSizeSp: 11,
    weight: 500,
    lineHeightSp: 16,
    desc: 'Small system label for app identity and channel subtext'
  },
  timestamp: {
    token: 'bodySmall',
    baseSizeSp: 11,
    weight: 400,
    lineHeightSp: 16,
    desc: 'Timestamp and relative time counter'
  },
  title: {
    token: 'titleMedium',
    baseSizeSp: 16,
    weight: 500,
    lineHeightSp: 22,
    desc: 'Primary bold notification header (M3 Title Medium)'
  },
  body: {
    token: 'bodyMedium',
    baseSizeSp: 14,
    weight: 400,
    lineHeightSp: 20,
    desc: 'Secondary message body content (M3 Body Medium)'
  },
  action: {
    token: 'labelLarge',
    baseSizeSp: 14,
    weight: 500,
    lineHeightSp: 20,
    desc: 'Interactive action buttons (M3 Label Large)'
  }
};

export const APPLE_HIG_SPECS = {
  appName: {
    token: 'Caption 2 / Footnote',
    baseSizePt: 12.5,
    weight: 400,
    lineHeightPt: 16,
    desc: 'Muted header label with app title and timestamp'
  },
  title: {
    token: 'Headline',
    baseSizePt: 15,
    weight: 600,
    lineHeightPt: 20,
    desc: 'Bold primary notification title'
  },
  subtitle: {
    token: 'Subheadline',
    baseSizePt: 14,
    weight: 500,
    lineHeightPt: 18,
    desc: 'Optional subtitle or conversation participant'
  },
  body: {
    token: 'Subheadline / Body',
    baseSizePt: 14.5,
    weight: 400,
    lineHeightPt: 19,
    desc: 'Message content'
  },
  action: {
    token: 'Callout',
    baseSizePt: 15,
    weight: 600,
    lineHeightPt: 20,
    desc: 'Pill-shaped quick action button'
  }
};
