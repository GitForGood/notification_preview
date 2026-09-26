import type { PresetTemplate } from '../types/notification';

export const WALLPAPERS = [
  {
    id: 'ios-dusk',
    name: 'iOS Dusk',
    style: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 30%, #4c1d95 60%, #831843 100%)',
    tone: 'dark',
  },
  {
    id: 'android-ocean',
    name: 'Material Ocean',
    style: 'linear-gradient(180deg, #022c22 0%, #064e3b 35%, #0f766e 70%, #134e4a 100%)',
    tone: 'dark',
  },
  {
    id: 'sunset-blush',
    name: 'Sunset Blush',
    style: 'linear-gradient(145deg, #fb7185 0%, #fda4af 35%, #f472b6 65%, #c084fc 100%)',
    tone: 'light',
  },
  {
    id: 'cyber-neon',
    name: 'Cyber Horizon',
    style: 'linear-gradient(135deg, #09090b 0%, #18181b 40%, #0369a1 80%, #0284c7 100%)',
    tone: 'dark',
  },
  {
    id: 'minimal-light',
    name: 'Minimal Sand',
    style: 'linear-gradient(180deg, #f5f5f4 0%, #e7e5e4 50%, #d6d3d1 100%)',
    tone: 'light',
  },
  {
    id: 'deep-slate',
    name: 'OLED Blackout',
    style: 'linear-gradient(180deg, #020617 0%, #090d16 100%)',
    tone: 'dark',
  }
];

export const PRESET_TEMPLATES: PresetTemplate[] = [
  {
    id: 'chat-messaging',
    name: 'Direct Message (Chat)',
    description: 'Conversation alert with sender avatar, message snippet, and quick reply actions.',
    category: 'messaging',
    content: {
      appName: 'Slack',
      appIconPreset: 'chat',
      senderName: 'Sarah Lin (Product)',
      title: 'Sarah Lin',
      subtitle: '#mobile-core',
      body: 'Can everyone verify the M3 accessibility font scales before today’s release? The dynamic type sizes look cramped on compact screens.',
      timestamp: '2m ago',
      badgeCount: 3,
      category: 'messaging',
      mediaType: 'none',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
      actions: [
        { id: 'act-1', label: 'Reply', style: 'default' },
        { id: 'act-2', label: 'Mark as read', style: 'tonal' }
      ]
    }
  },
  {
    id: 'delivery-update',
    name: 'Food & Parcel Delivery',
    description: 'Real-time arrival notification with drop-off instructions and thumbnail map.',
    category: 'basic',
    content: {
      appName: 'QuickBite Delivery',
      appIconPreset: 'delivery',
      title: 'Your order is arriving in 3 mins! 🛵',
      subtitle: 'Order #FD-9281',
      body: 'Courier Alex has arrived near your building entrance. Please be ready to meet at the main door or check door buzzer.',
      timestamp: 'now',
      category: 'basic',
      mediaType: 'thumbnail',
      mediaUrl: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=160&auto=format&fit=crop&q=80',
      actions: [
        { id: 'act-1', label: 'Track Courier', style: 'default' },
        { id: 'act-2', label: 'Add Gate Code', style: 'tonal' }
      ]
    }
  },
  {
    id: 'ecommerce-promo',
    name: 'Promo (Big Picture Media)',
    description: 'Rich promotional banner with high-impact visuals and call-to-action.',
    category: 'bigPicture',
    content: {
      appName: 'UrbanStyle',
      appIconPreset: 'shopping',
      title: 'Flash Sale: 40% Off Selected Styles 🏷️',
      subtitle: 'VIP Early Access',
      body: 'Grab top trending footwear and jackets before midnight. Use code ACCESS40 at checkout with free express shipping.',
      timestamp: '15m ago',
      category: 'bigPicture',
      mediaType: 'bigPicture',
      mediaUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
      actions: [
        { id: 'act-1', label: 'Shop Now', style: 'default' },
        { id: 'act-2', label: 'Save for Later', style: 'tonal' }
      ]
    }
  },
  {
    id: 'security-alert',
    name: 'Critical Security Alert',
    description: 'High-urgency two-factor or account activity prompt requiring rapid decision.',
    category: 'basic',
    content: {
      appName: 'ShieldAuth',
      appIconPreset: 'bank',
      title: 'New Sign-in Attempt Detected ⚠️',
      subtitle: 'Account Security',
      body: 'A login request was initiated from Chrome on macOS in Frankfurt, Germany. If this was not you, lock your account immediately.',
      timestamp: 'Just now',
      category: 'basic',
      mediaType: 'none',
      actions: [
        { id: 'act-1', label: 'Yes, it’s me', style: 'tonal' },
        { id: 'act-2', label: 'Block & Report', style: 'destructive' }
      ]
    }
  },
  {
    id: 'flight-progress',
    name: 'Flight / Live Tracker',
    description: 'Ongoing journey tracker with gate announcement and progress indicator.',
    category: 'progress',
    content: {
      appName: 'SkyWings',
      appIconPreset: 'calendar',
      title: 'Flight SW-428 Boarding Soon ✈️',
      subtitle: 'Gate B22 • Seat 14A',
      body: 'Group 3 boarding starts in 10 minutes. Please proceed to Terminal 2, Gate B22. Carry-on bag tag verified.',
      timestamp: '1h ago',
      category: 'progress',
      mediaType: 'none',
      progress: 75,
      actions: [
        { id: 'act-1', label: 'Boarding Pass', style: 'default' },
        { id: 'act-2', label: 'Airport Map', style: 'tonal' }
      ]
    }
  }
];
