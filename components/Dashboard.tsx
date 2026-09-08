import React from 'react';
import { useSettings } from '../hooks/useSettings';
import { HabitHeatmap } from './HabitHeatmap';
import { FinanceTracker } from './FinanceTracker';
import { SecondBrain } from './SecondBrain';
import { FocusTimer } from './FocusTimer';

export const Dashboard: React.FC = () => {
  const { settings } = useSettings();
  const { modules } = settings;

  // Count active modules to dynamically scale grid columns
  const activeCount = Object.values(modules).filter(Boolean).length;

  if (activeCount === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 border border-dashed border-zinc-800 rounded-2xl p-6 text-center">
        <p className="text-sm font-medium text-zinc-400">All dashboard modules are hidden.</p>
        <p className="text-xs text-zinc-500 mt-1">
          Press <kbd className="px-1 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-zinc-300">⌘,</kbd> to open settings and enable modules.
        </p>
      </div>
    );
  }

  return (
    <main className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner / Focus Section */}
      {modules.showFocusTimer && (
        <section className="w-full">
          <FocusTimer />
        </section>
      )}

      {/* Dynamic Grid Layout */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.showHabitHeatmap && (
          <div className="lg:col-span-2">
            <HabitHeatmap weekStartDay={settings.general.weekStartDay} />
          </div>
        )}

        {modules.showFinanceTracker && (
          <div className={modules.showHabitHeatmap ? 'lg:col-span-1' : 'lg:col-span-3'}>
            <FinanceTracker />
          </div>
        )}

        {modules.showSecondBrain && (
          <div className="lg:col-span-3">
            <SecondBrain />
          </div>
        )}
      </section>
    </main>
  );
};
