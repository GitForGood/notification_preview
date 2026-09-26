import React from 'react';
import { 
  Bell, 
  Image, 
  MessageSquare, 
  Plus, 
  Trash2, 
  Layers 
} from 'lucide-react';
import type { 
  NotificationContent, 
  NotificationAction, 
  MediaType, 
  NotificationCategory 
} from '../../types/notification';
import { APP_ICON_PRESETS } from '../../constants/appIcons';

interface NotificationEditorProps {
  content: NotificationContent;
  onChange: (updated: NotificationContent) => void;
}

export const NotificationEditor: React.FC<NotificationEditorProps> = ({
  content,
  onChange,
}) => {
  const updateField = <K extends keyof NotificationContent>(
    key: K,
    value: NotificationContent[K]
  ) => {
    onChange({ ...content, [key]: value });
  };

  const handleActionChange = (index: number, updatedAction: NotificationAction) => {
    const newActions = [...content.actions];
    newActions[index] = updatedAction;
    updateField('actions', newActions);
  };

  const handleAddAction = () => {
    if (content.actions.length >= 3) return;
    const newAction: NotificationAction = {
      id: `act-${Date.now()}`,
      label: `Action ${content.actions.length + 1}`,
      style: 'default',
    };
    updateField('actions', [...content.actions, newAction]);
  };

  const handleRemoveAction = (index: number) => {
    const newActions = content.actions.filter((_, i) => i !== index);
    updateField('actions', newActions);
  };

  return (
    <div className="space-y-6 text-slate-200">
      {/* App Identity */}
      <section className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Bell size={14} className="text-indigo-400" />
          App Identity
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              App Name
            </label>
            <input
              type="text"
              value={content.appName}
              onChange={(e) => updateField('appName', e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
              placeholder="e.g. Acme App"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              App Icon Preset
            </label>
            <select
              value={content.appIconPreset}
              onChange={(e) => updateField('appIconPreset', e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-hidden focus:ring-1 focus:ring-indigo-500 cursor-pointer"
            >
              {APP_ICON_PRESETS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">
            Custom Icon URL (Optional)
          </label>
          <input
            type="url"
            value={content.customIconUrl || ''}
            onChange={(e) => updateField('customIconUrl', e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
            placeholder="https://example.com/icon.png"
          />
        </div>
      </section>

      {/* Content & Copy */}
      <section className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <MessageSquare size={14} className="text-indigo-400" />
          Notification Content
        </h3>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-medium text-slate-400">Title</label>
            <span className="text-[11px] font-mono text-slate-500">
              {content.title.length} chars
            </span>
          </div>
          <input
            type="text"
            value={content.title}
            onChange={(e) => updateField('title', e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm font-medium focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
            placeholder="Notification Title"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Subtitle / Channel
            </label>
            <input
              type="text"
              value={content.subtitle}
              onChange={(e) => updateField('subtitle', e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
              placeholder="e.g. #orders, Promotions"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Timestamp
            </label>
            <input
              type="text"
              value={content.timestamp}
              onChange={(e) => updateField('timestamp', e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
              placeholder="e.g. now, 2m ago"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-medium text-slate-400">Body Message</label>
            <span className="text-[11px] font-mono text-slate-500">
              {content.body.length} chars
            </span>
          </div>
          <textarea
            rows={3}
            value={content.body}
            onChange={(e) => updateField('body', e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs leading-relaxed focus:outline-hidden focus:ring-1 focus:ring-indigo-500 resize-y"
            placeholder="Provide concise, high-value notification text..."
          />
        </div>
      </section>

      {/* Visual Style & Rich Attachments */}
      <section className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Image size={14} className="text-indigo-400" />
          Style & Attachments
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Category Style
            </label>
            <select
              value={content.category}
              onChange={(e) => updateField('category', e.target.value as NotificationCategory)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs focus:outline-hidden focus:ring-1 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="basic">Standard Card</option>
              <option value="messaging">Messaging / Chat</option>
              <option value="bigPicture">Big Picture Media</option>
              <option value="progress">Ongoing / Progress</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Media Attachment
            </label>
            <select
              value={content.mediaType}
              onChange={(e) => updateField('mediaType', e.target.value as MediaType)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs focus:outline-hidden focus:ring-1 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="none">None</option>
              <option value="thumbnail">Right Thumbnail (Square)</option>
              <option value="bigPicture">Full Big Picture Banner</option>
            </select>
          </div>
        </div>

        {content.mediaType !== 'none' && (
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Media Image URL
            </label>
            <input
              type="url"
              value={content.mediaUrl || ''}
              onChange={(e) => updateField('mediaUrl', e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
              placeholder="https://images.unsplash.com/..."
            />
          </div>
        )}

        {content.category === 'messaging' && (
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Sender Avatar Image URL
            </label>
            <input
              type="url"
              value={content.avatarUrl || ''}
              onChange={(e) => updateField('avatarUrl', e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
              placeholder="https://images.unsplash.com/..."
            />
          </div>
        )}

        {content.category === 'progress' && (
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-medium text-slate-400">
                Progress Percentage
              </label>
              <span className="text-xs font-mono text-indigo-400">
                {content.progress ?? 65}%
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={content.progress ?? 65}
              onChange={(e) => updateField('progress', parseInt(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>
        )}
      </section>

      {/* Action Buttons */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Layers size={14} className="text-indigo-400" />
            Action Buttons ({content.actions.length}/3)
          </h3>
          {content.actions.length < 3 && (
            <button
              onClick={handleAddAction}
              className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer"
            >
              <Plus size={13} />
              Add Button
            </button>
          )}
        </div>

        <div className="space-y-2">
          {content.actions.map((action, idx) => (
            <div
              key={action.id || idx}
              className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 p-2 rounded-lg"
            >
              <input
                type="text"
                value={action.label}
                onChange={(e) =>
                  handleActionChange(idx, { ...action, label: e.target.value })
                }
                className="flex-1 bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-xs focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                placeholder="Button label"
              />
              <select
                value={action.style || 'default'}
                onChange={(e) =>
                  handleActionChange(idx, {
                    ...action,
                    style: e.target.value as 'default' | 'tonal' | 'destructive',
                  })
                }
                className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-300 focus:outline-hidden cursor-pointer"
              >
                <option value="default">Default</option>
                <option value="tonal">Tonal / Filled</option>
                <option value="destructive">Destructive</option>
              </select>
              <button
                onClick={() => handleRemoveAction(idx)}
                className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer"
                title="Remove action"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          {content.actions.length === 0 && (
            <p className="text-xs text-slate-500 italic">No action buttons configured.</p>
          )}
        </div>
      </section>
    </div>
  );
};
