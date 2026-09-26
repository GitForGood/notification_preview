export type Platform = 'ios' | 'android';

export type NotificationCategory = 'basic' | 'messaging' | 'bigPicture' | 'progress';

export type MediaType = 'none' | 'thumbnail' | 'bigPicture';

export interface NotificationAction {
  id: string;
  label: string;
  style?: 'default' | 'tonal' | 'destructive';
}

export interface NotificationContent {
  appName: string;
  appIconPreset: string;
  customIconUrl?: string;
  title: string;
  subtitle: string;
  body: string;
  timestamp: string;
  badgeCount?: number;
  mediaType: MediaType;
  mediaUrl?: string;
  actions: NotificationAction[];
  senderName?: string;
  avatarUrl?: string;
  category: NotificationCategory;
  progress?: number; // 0 - 100
}

export interface AccessibilitySettings {
  platform: Platform;
  fontScale: number; // 0.85 to 2.5
  boldText: boolean;
  highContrast: boolean;
  reduceTransparency: boolean;
  theme: 'light' | 'dark';
  deviceWidth: number; // 360, 393, 430
  wallpaper: string;
  presentation: 'lockscreen' | 'banner' | 'shade';
  expanded: boolean;
}

export interface PresetTemplate {
  id: string;
  name: string;
  description: string;
  category: NotificationCategory;
  content: NotificationContent;
  recommendedSettings?: Partial<AccessibilitySettings>;
}

export interface AuditWarning {
  type: 'error' | 'warning' | 'info';
  field: 'title' | 'body' | 'actions' | 'contrast';
  message: string;
  recommendation: string;
}
