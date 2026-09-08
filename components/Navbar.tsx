import React, { useState } from 'react';
import { Settings, Sparkles } from 'lucide-react';
import { SettingsModal } from './SettingsModal';
import { useHotkeys } from '../hooks/useHotkeys';

export const Navbar: React.FC = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Global hotkey: Cmd + , or Ctrl + ,
  useHotkeys(',', () => setIsSettingsOpen((prev) => !prev), { metaKey: true, ctrlKey: true });

  return (
    <>
      <header className="flex items-center justify-between px-6 py-4 bg-zinc-950 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <span className="text-base font-bold tracking-wider text-white">LifeOS</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 hover:text-white transition-colors"
            title="Preferences (Cmd + ,)"
          >
            <Settings size={15} />
            <span className="hidden sm:inline">Settings</span>
            <kbd className="hidden md:inline px-1.5 py-0.5 text-[10px] text-zinc-400 bg-zinc-800 border border-zinc-700 rounded">
              ⌘,
            </kbd>
          </button>
        </div>
      </header>

      {/* Settings Modal Mounting */}
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
};
