import React from 'react';
import { X, BookOpen } from 'lucide-react';
import { M3_TYPE_SPECS, APPLE_HIG_SPECS } from '../../constants/typography';

interface SpecsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpecsModal: React.FC<SpecsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 shadow-2xl text-slate-200 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <BookOpen size={20} className="text-indigo-400" />
            <div>
              <h2 className="text-lg font-bold text-white">
                Design Specs & Typography Reference
              </h2>
              <p className="text-xs text-slate-400">
                Official design tokens for Android Material 3 and Apple Human Interface Guidelines
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Material 3 Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400">
              Android Material 3 (M3) Notification Specs
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono">
                  <th className="py-2 px-3">Role</th>
                  <th className="py-2 px-3">M3 Token</th>
                  <th className="py-2 px-3">Base Size</th>
                  <th className="py-2 px-3">Weight</th>
                  <th className="py-2 px-3">Line Height</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                <tr>
                  <td className="py-2 px-3 text-slate-200">App Name</td>
                  <td className="py-2 px-3 text-indigo-300">{M3_TYPE_SPECS.appName.token}</td>
                  <td className="py-2 px-3">{M3_TYPE_SPECS.appName.baseSizeSp}sp</td>
                  <td className="py-2 px-3">{M3_TYPE_SPECS.appName.weight}</td>
                  <td className="py-2 px-3">{M3_TYPE_SPECS.appName.lineHeightSp}sp</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-slate-200">Timestamp</td>
                  <td className="py-2 px-3 text-indigo-300">{M3_TYPE_SPECS.timestamp.token}</td>
                  <td className="py-2 px-3">{M3_TYPE_SPECS.timestamp.baseSizeSp}sp</td>
                  <td className="py-2 px-3">{M3_TYPE_SPECS.timestamp.weight}</td>
                  <td className="py-2 px-3">{M3_TYPE_SPECS.timestamp.lineHeightSp}sp</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-slate-200 font-bold">Title (Header)</td>
                  <td className="py-2 px-3 text-indigo-300 font-bold">{M3_TYPE_SPECS.title.token}</td>
                  <td className="py-2 px-3 font-bold">{M3_TYPE_SPECS.title.baseSizeSp}sp</td>
                  <td className="py-2 px-3">{M3_TYPE_SPECS.title.weight}</td>
                  <td className="py-2 px-3">{M3_TYPE_SPECS.title.lineHeightSp}sp</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-slate-200">Body Message</td>
                  <td className="py-2 px-3 text-indigo-300">{M3_TYPE_SPECS.body.token}</td>
                  <td className="py-2 px-3">{M3_TYPE_SPECS.body.baseSizeSp}sp</td>
                  <td className="py-2 px-3">{M3_TYPE_SPECS.body.weight}</td>
                  <td className="py-2 px-3">{M3_TYPE_SPECS.body.lineHeightSp}sp</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-slate-200">Action Buttons</td>
                  <td className="py-2 px-3 text-indigo-300">{M3_TYPE_SPECS.action.token}</td>
                  <td className="py-2 px-3">{M3_TYPE_SPECS.action.baseSizeSp}sp</td>
                  <td className="py-2 px-3">{M3_TYPE_SPECS.action.weight}</td>
                  <td className="py-2 px-3">{M3_TYPE_SPECS.action.lineHeightSp}sp</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-slate-400">
            * Corner Radius: 20dp – 28dp rounded container shape. Collapsed body text is strictly truncated to 1 line with ellipses.
          </p>
        </div>

        {/* Apple HIG Section */}
        <div className="space-y-3 border-t border-slate-800 pt-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-sky-400">
              Apple Human Interface Guidelines (HIG) Specs
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono">
                  <th className="py-2 px-3">Role</th>
                  <th className="py-2 px-3">Apple Token</th>
                  <th className="py-2 px-3">Base Size</th>
                  <th className="py-2 px-3">Weight</th>
                  <th className="py-2 px-3">Line Height</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                <tr>
                  <td className="py-2 px-3 text-slate-200">App Name & Time</td>
                  <td className="py-2 px-3 text-sky-300">{APPLE_HIG_SPECS.appName.token}</td>
                  <td className="py-2 px-3">{APPLE_HIG_SPECS.appName.baseSizePt}pt</td>
                  <td className="py-2 px-3">{APPLE_HIG_SPECS.appName.weight}</td>
                  <td className="py-2 px-3">{APPLE_HIG_SPECS.appName.lineHeightPt}pt</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-slate-200 font-bold">Title</td>
                  <td className="py-2 px-3 text-sky-300 font-bold">{APPLE_HIG_SPECS.title.token}</td>
                  <td className="py-2 px-3 font-bold">{APPLE_HIG_SPECS.title.baseSizePt}pt</td>
                  <td className="py-2 px-3">{APPLE_HIG_SPECS.title.weight}</td>
                  <td className="py-2 px-3">{APPLE_HIG_SPECS.title.lineHeightPt}pt</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-slate-200">Subtitle</td>
                  <td className="py-2 px-3 text-sky-300">{APPLE_HIG_SPECS.subtitle.token}</td>
                  <td className="py-2 px-3">{APPLE_HIG_SPECS.subtitle.baseSizePt}pt</td>
                  <td className="py-2 px-3">{APPLE_HIG_SPECS.subtitle.weight}</td>
                  <td className="py-2 px-3">{APPLE_HIG_SPECS.subtitle.lineHeightPt}pt</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-slate-200">Body Message</td>
                  <td className="py-2 px-3 text-sky-300">{APPLE_HIG_SPECS.body.token}</td>
                  <td className="py-2 px-3">{APPLE_HIG_SPECS.body.baseSizePt}pt</td>
                  <td className="py-2 px-3">{APPLE_HIG_SPECS.body.weight}</td>
                  <td className="py-2 px-3">{APPLE_HIG_SPECS.body.lineHeightPt}pt</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-slate-200">Action Buttons</td>
                  <td className="py-2 px-3 text-sky-300">{APPLE_HIG_SPECS.action.token}</td>
                  <td className="py-2 px-3">{APPLE_HIG_SPECS.action.baseSizePt}pt</td>
                  <td className="py-2 px-3">{APPLE_HIG_SPECS.action.weight}</td>
                  <td className="py-2 px-3">{APPLE_HIG_SPECS.action.lineHeightPt}pt</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-slate-400">
            * Continuous squircle corners (~20-22pt radius). Materials use heavy frosted glass blur (`backdrop-filter: blur(25px)`). At accessibility sizes AX1–AX5, action buttons stack vertically.
          </p>
        </div>

        {/* Footer */}
        <div className="pt-2 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold cursor-pointer"
          >
            Close Reference
          </button>
        </div>
      </div>
    </div>
  );
};
