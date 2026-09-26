import { 
  MessageSquare, 
  ShoppingBag, 
  Bike, 
  ShieldCheck, 
  Newspaper, 
  Sparkles, 
  Calendar, 
  Bell 
} from 'lucide-react';

export const APP_ICON_PRESETS = [
  { id: 'chat', label: 'Chat / Messaging', icon: MessageSquare, bg: '#0284c7' },
  { id: 'delivery', label: 'Delivery & Transport', icon: Bike, bg: '#ea580c' },
  { id: 'shopping', label: 'E-Commerce / Shopping', icon: ShoppingBag, bg: '#ec4899' },
  { id: 'bank', label: 'Security & Finance', icon: ShieldCheck, bg: '#10b981' },
  { id: 'calendar', label: 'Calendar / Travel', icon: Calendar, bg: '#8b5cf6' },
  { id: 'news', label: 'News & Media', icon: Newspaper, bg: '#f59e0b' },
  { id: 'social', label: 'Social & Sparks', icon: Sparkles, bg: '#f43f5e' },
  { id: 'default', label: 'Standard Alert', icon: Bell, bg: '#64748b' },
];
