import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Shield, Moon, Bell, Database, Check } from 'lucide-react';
import { UserProfile } from '../types';

interface SettingsProps {
  user?: UserProfile | null;
}

export const Settings: React.FC<SettingsProps> = ({ user }) => {
  const [name, setName] = useState(user?.name || 'User');
  const [email, setEmail] = useState(user?.email || 'user@lifeos.app');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-3xl">
      <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl backdrop-blur-xl">
        <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <SettingsIcon className="text-slate-400" size={24} />
          System Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Manage system preferences, profile customization, and local storage data.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Info Card */}
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl backdrop-blur-xl space-y-4">
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <User size={18} className="text-cyan-400" />
            User Profile
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl backdrop-blur-xl space-y-4">
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Moon size={18} className="text-amber-400" />
            Appearance & System Preferences
          </h2>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <div>
                <p className="font-semibold text-slate-200">Glassmorphism Visual Style</p>
                <p className="text-[10px] text-slate-500">Enable modern frosted glass HUD effects</p>
              </div>
              <input type="checkbox" defaultChecked className="toggle accent-cyan-400 w-4 h-4 rounded" />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <div>
                <p className="font-semibold text-slate-200">Daily Execution Notifications</p>
                <p className="text-[10px] text-slate-500">Reminders for habit checks and top daily tasks</p>
              </div>
              <input type="checkbox" defaultChecked className="accent-cyan-400 w-4 h-4 rounded" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all flex items-center gap-2"
          >
            {saved ? <Check size={16} /> : null}
            {saved ? 'Saved Preferences!' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};
