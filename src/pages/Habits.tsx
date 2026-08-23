import React, { useState } from 'react';
import { Flame, CheckCircle2, Circle, Plus, Activity, Award, TrendingUp, Sparkles } from 'lucide-react';

interface Habit {
  id: string;
  name: string;
  category: 'health' | 'mindset' | 'productivity' | 'fitness';
  streak: number;
  completedToday: boolean;
  targetDays: number;
}

export const Habits: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([
    { id: '1', name: 'Morning Hydration (1L)', category: 'health', streak: 12, completedToday: true, targetDays: 30 },
    { id: '2', name: '30 min HIIT / Gym Workout', category: 'fitness', streak: 5, completedToday: false, targetDays: 21 },
    { id: '3', name: 'Read 15 Pages of Non-Fiction', category: 'mindset', streak: 18, completedToday: true, targetDays: 30 },
    { id: '4', name: 'No Distractions / Focus Block', category: 'productivity', streak: 3, completedToday: false, targetDays: 14 },
  ]);

  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitCategory, setNewHabitCategory] = useState<'health' | 'mindset' | 'productivity' | 'fitness'>('health');
  const [showAddModal, setShowAddModal] = useState(false);

  const toggleHabit = (id: string) => {
    setHabits(
      habits.map((h) => {
        if (h.id === id) {
          const isDone = !h.completedToday;
          return {
            ...h,
            completedToday: isDone,
            streak: isDone ? h.streak + 1 : Math.max(0, h.streak - 1),
          };
        }
        return h;
      })
    );
  };

  const handleAddHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;

    const newHabit: Habit = {
      id: 'habit_' + Date.now(),
      name: newHabitName,
      category: newHabitCategory,
      streak: 0,
      completedToday: false,
      targetDays: 30,
    };

    setHabits([newHabit, ...habits]);
    setNewHabitName('');
    setShowAddModal(false);
  };

  const completedCount = habits.filter((h) => h.completedToday).length;
  const bestStreak = habits.length > 0 ? Math.max(...habits.map((h) => h.streak)) : 0;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/60 border border-slate-800 p-6 rounded-2xl backdrop-blur-xl">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Flame className="text-amber-500 animate-pulse" size={24} />
            Habit & Health Tracker
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Build consistency, protect your streak, and level up your discipline.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-all flex items-center gap-2 shrink-0 shadow-lg shadow-amber-500/20"
        >
          <Plus size={16} />
          New Habit
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl backdrop-blur-xl flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">Completed Today</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1">
              {completedCount} <span className="text-xs font-normal text-slate-400">/ {habits.length}</span>
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Activity size={22} />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl backdrop-blur-xl flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">Longest Active Streak</p>
            <p className="text-2xl font-bold text-amber-400 mt-1">{bestStreak} Days</p>
          </div>
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Flame size={22} />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl backdrop-blur-xl flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">Consistency Level</p>
            <p className="text-2xl font-bold text-cyan-400 mt-1">
              {habits.length > 0 ? Math.round((completedCount / habits.length) * 100) : 0}%
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Award size={22} />
          </div>
        </div>
      </div>

      {/* Habit List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {habits.map((habit) => (
          <div
            key={habit.id}
            onClick={() => toggleHabit(habit.id)}
            className={`p-5 rounded-2xl border backdrop-blur-xl transition-all duration-300 cursor-pointer flex flex-col justify-between gap-4 ${
              habit.completedToday
                ? 'bg-slate-900/90 border-emerald-500/40 shadow-lg shadow-emerald-500/5'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                {habit.completedToday ? (
                  <CheckCircle2 size={24} className="text-emerald-400 shrink-0 animate-bounce" />
                ) : (
                  <Circle size={24} className="text-slate-600 shrink-0" />
                )}
                <div>
                  <h3 className={`text-sm font-semibold ${habit.completedToday ? 'text-slate-100 line-through' : 'text-slate-200'}`}>
                    {habit.name}
                  </h3>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500">
                    {habit.category}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold shrink-0">
                <Flame size={14} className="fill-amber-400" />
                {habit.streak}d
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                <span>Target Progress</span>
                <span>{habit.streak} / {habit.targetDays} Days</span>
              </div>
              <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-cyan-400 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (habit.streak / habit.targetDays) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Habit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md space-y-4">
            <h3 className="text-lg font-bold text-slate-100">Create New Habit</h3>
            <form onSubmit={handleAddHabit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Habit Name</label>
                <input
                  type="text"
                  required
                  value={newHabitName}
                  onChange={(e) => setNewHabitName(e.target.value)}
                  placeholder="e.g. 10,000 Steps, Meditate"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Category</label>
                <select
                  value={newHabitCategory}
                  onChange={(e) => setNewHabitCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-amber-400"
                >
                  <option value="health">Health</option>
                  <option value="fitness">Fitness</option>
                  <option value="mindset">Mindset</option>
                  <option value="productivity">Productivity</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-semibold text-xs hover:bg-amber-400"
                >
                  Save Habit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
