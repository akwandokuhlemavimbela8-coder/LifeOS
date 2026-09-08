import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, Sliders, LayoutGrid, Volume2, Database, X, Check, RotateCcw 
} from 'lucide-react';
import { useSettings } from '../hooks/useSettings';

type Tab = 'general' | 'appearance' | 'modules' | 'data';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<Tab>('general');
  const { settings, updateSettings, resetSettings } = useSettings();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="w-full max-w-3xl overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl flex flex-col md:flex-row h-[550px]"
        >
          {/* Sidebar Navigation */}
          <div className="w-full md:w-56 bg-zinc-950/50 p-4 border-r border-zinc-800 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="px-3 py-2 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                LifeOS Settings
              </div>
              <NavButton
                active={activeTab === 'general'}
                onClick={() => setActiveTab('general')}
                icon={<Sliders size={18} />}
                label="General"
              />
              <NavButton
                active={activeTab === 'appearance'}
                onClick={() => setActiveTab('appearance')}
                icon={<Volume2 size={18} />}
                label="Appearance & FX"
              />
              <NavButton
                active={activeTab === 'modules'}
                onClick={() => setActiveTab('modules')}
                icon={<LayoutGrid size={18} />}
                label="Modules"
              />
              <NavButton
                active={activeTab === 'data'}
                onClick={() => setActiveTab('data')}
                icon={<Database size={18} />}
                label="Data & Storage"
              />
            </div>

            <button
              onClick={resetSettings}
              className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-zinc-400 hover:text-red-400 transition-colors"
            >
              <RotateCcw size={14} /> Reset Defaults
            </button>
          </div>

          {/* Tab Content Panel */}
          <div className="flex-1 flex flex-col justify-between p-6 bg-zinc-900 overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <h2 className="text-lg font-bold text-white capitalize">{activeTab} Preferences</h2>
                <button
                  onClick={onClose}
                  className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {activeTab === 'general' && (
                <div className="space-y-4">
                  <SettingSelect
                    label="Default Launch View"
                    value={settings.general.defaultView}
                    onChange={(val) => updateSettings('general', { defaultView: val as any })}
                    options={[
                      { value: 'dashboard', label: 'Dashboard' },
                      { value: 'planner', label: 'Daily Planner' },
                      { value: 'zen', label: 'Zen Focus View' },
                    ]}
                  />
                  <SettingSelect
                    label="Week Starts On"
                    value={settings.general.weekStartDay}
                    onChange={(val) => updateSettings('general', { weekStartDay: val as any })}
                    options={[
                      { value: 'monday', label: 'Monday' },
                      { value: 'sunday', label: 'Sunday' },
                    ]}
                  />
                </div>
              )}

              {activeTab === 'appearance' && (
                <div className="space-y-4">
                  <SettingToggle
                    label="Rainbow Loading Animations"
                    description="Enable gradient splash and loading effects"
                    checked={settings.appearance.enableRainbowLoader}
                    onChange={(val) => updateSettings('appearance', { enableRainbowLoader: val })}
                  />
                  <SettingToggle
                    label="Sound Feedback"
                    description="Play soft audio cues on task and habit completions"
                    checked={settings.appearance.soundEffectsEnabled}
                    onChange={(val) => updateSettings('appearance', { soundEffectsEnabled: val })}
                  />
                </div>
              )}

              {activeTab === 'modules' && (
                <div className="space-y-4">
                  <SettingToggle
                    label="Finance Tracker"
                    description="Display monthly cashflow and budget overview on dashboard"
                    checked={settings.modules.showFinanceTracker}
                    onChange={(val) => updateSettings('modules', { showFinanceTracker: val })}
                  />
                  <SettingToggle
                    label="Habit Heatmap"
                    description="Show daily completion activity matrix"
                    checked={settings.modules.showHabitHeatmap}
                    onChange={(val) => updateSettings('modules', { showHabitHeatmap: val })}
                  />
                  <SettingToggle
                    label="Second Brain"
                    description="Quick notes, knowledge base, and resource vault"
                    checked={settings.modules.showSecondBrain}
                    onChange={(val) => updateSettings('modules', { showSecondBrain: val })}
                  />
                </div>
              )}

              {activeTab === 'data' && (
                <div className="space-y-4 text-sm text-zinc-400">
                  <p>Manage your local state and cloud integrations.</p>
                  <button
                    onClick={() => {
                      const data = JSON.stringify(settings, null, 2);
                      const blob = new Blob([data], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'lifeos-settings-backup.json';
                      a.click();
                    }}
                    className="px-4 py-2 text-xs font-semibold rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 transition-colors"
                  >
                    Export Settings Backup
                  </button>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-zinc-800 flex justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2 text-xs font-medium rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// UI Helpers
const NavButton = ({ active, onClick, icon, label }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
      active ? 'bg-zinc-800 text-white font-semibold' : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
    }`}
  >
    {icon}
    {label}
  </button>
);

const SettingToggle = ({ label, description, checked, onChange }: any) => (
  <div className="flex items-center justify-between py-2">
    <div>
      <div className="text-sm font-medium text-white">{label}</div>
      {description && <div className="text-xs text-zinc-400">{description}</div>}
    </div>
    <button
      onClick={() => onChange(!checked)}
      className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
        checked ? 'bg-indigo-600 justify-end' : 'bg-zinc-800 justify-start'
      }`}
    >
      <motion.div layout className="w-4 h-4 rounded-full bg-white shadow-md" />
    </button>
  </div>
);

const SettingSelect = ({ label, value, onChange, options }: any) => (
  <div className="flex items-center justify-between py-2">
    <div className="text-sm font-medium text-white">{label}</div>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-zinc-800 border border-zinc-700 text-xs text-white rounded-lg px-3 py-1.5 focus:outline-none focus:border-indigo-500"
    >
      {options.map((opt: any) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);
