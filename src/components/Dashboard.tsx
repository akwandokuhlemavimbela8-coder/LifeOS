'use client';

import { useState } from 'react';
import { useLifeStore } from '@/store/useLifeStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function Dashboard() {
  const { xp, level, tasks, habits, addTask, toggleTask, toggleHabit } = useLifeStore();
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const nextLevelXp = level * 200;
  const currentLevelProgress = ((xp % 200) / 200) * 100;

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    addTask(newTaskTitle);
    setNewTaskTitle('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 text-slate-100">
      {/* Top XP & Level Widget */}
      <section className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl relative overflow-hidden">
        <div className="flex justify-between items-center mb-3">
          <div>
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold">System Status</span>
            <h1 className="text-2xl font-black">Level {level} Operator</h1>
          </div>
          <div className="text-right">
            <span className="text-xl font-extrabold text-indigo-400">{xp}</span>
            <span className="text-xs text-slate-500"> / {nextLevelXp} XP</span>
          </div>
        </div>

        {/* Dynamic XP Progress Bar */}
        <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${currentLevelProgress}%` }}
            transition={{ type: 'spring', stiffness: 50 }}
          />
        </div>
      </section>

      {/* Grid: Tasks & Habits */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Habit Streaks */}
        <section className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80 backdrop-blur-sm">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            🔥 Daily Habit Streaks
          </h2>
          <div className="space-y-3">
            {habits.map((habit) => (
              <motion.div
                key={habit.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleHabit(habit.id)}
                className={`p-4 rounded-xl border cursor-pointer flex justify-between items-center transition-all ${
                  habit.completedToday
                    ? 'bg-indigo-950/40 border-indigo-500/50 text-indigo-200'
                    : 'bg-slate-800/40 border-slate-700/50 text-slate-400 hover:border-slate-600'
                }`}
              >
                <span className="font-medium">{habit.name}</span>
                <span className="text-xs font-bold px-2.5 py-1 bg-slate-800 rounded-full border border-slate-700">
                  ⚡ {habit.streak} Days
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Micro-Task Engine */}
        <section className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80 backdrop-blur-sm">
          <h2 className="text-lg font-bold mb-4">⚡ Priority Quests</h2>
          
          <form onSubmit={handleCreateTask} className="flex gap-2 mb-4">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Add new quest..."
              className="flex-1 bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all"
            >
              Add
            </button>
          </form>

          <div className="space-y-2">
            <AnimatePresence>
              {tasks.map((task) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onClick={() => toggleTask(task.id)}
                  className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between text-sm transition-all ${
                    task.completed
                      ? 'line-through text-slate-500 bg-slate-900/30 border-slate-800'
                      : 'bg-slate-800/60 border-slate-700 text-slate-200 hover:border-indigo-500/50'
                  }`}
                >
                  <span>{task.title}</span>
                  <span className="text-xs text-indigo-400 font-mono">+{task.xpValue} XP</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

      </div>
    </div>
  );
}
