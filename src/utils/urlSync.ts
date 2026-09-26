import type { NotificationContent, AccessibilitySettings } from '../types/notification';

export interface AppState {
  content: NotificationContent;
  settings: AccessibilitySettings;
}

export function serializeStateToUrl(state: AppState): string {
  try {
    const json = JSON.stringify(state);
    const encoded = btoa(encodeURIComponent(json));
    const url = new URL(window.location.href);
    url.hash = `preview=${encoded}`;
    return url.toString();
  } catch (err) {
    console.error('Failed to serialize state to URL', err);
    return window.location.href;
  }
}

export function loadStateFromUrl(): Partial<AppState> | null {
  try {
    const hash = window.location.hash;
    if (!hash || !hash.includes('preview=')) return null;

    const encoded = hash.split('preview=')[1];
    if (!encoded) return null;

    const json = decodeURIComponent(atob(encoded));
    const parsed = JSON.parse(json);
    return parsed;
  } catch (err) {
    console.warn('Failed to parse state from URL hash', err);
    return null;
  }
}
