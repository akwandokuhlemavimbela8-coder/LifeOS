import React, { useState } from 'react';
import { BookOpen, Plus, Smile, Meh, Frown, Sparkles, Calendar, Tag } from 'lucide-react';
import { JournalEntry } from '../types';

export const Journal: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      title: 'Focusing on Core Systems & UI Polish',
      content: 'Spent today streamlining modules and adding sleek glassmorphism animations. Building consistency feels good when the UI is crisp.',
      mood: 'energized',
      category: 'mindset',
      date: '2026-08-23',
    },
    {
      id: '2',
      title: 'Weekly LifeOS Strategy Review',
      content: 'Reflected on long-term goals. Broke down large quarterly milestones into daily action steps.',
      mood: 'calm',
      category: 'reflection',
      date: '2026-08-20',
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<'calm' | 'energized' | 'focused' | 'drained' | 'anxious'>('focused');
  const [category, setCategory] = useState<'mindset' | 'gratitude' | 'reflection' | 'ideas'>('reflection');

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newEntry: JournalEntry = {
      id: 'journal_' + Date.now(),
      title,
      content,
      mood,
      category,
      date: new Date().toISOString().split('T')[0],
    };

    setEntries([newEntry, ...entries]);
    setTitle('');
    setContent('');
    setShowAddModal(false);
  };

  const getMoodBadge = (mood: string) => {
    switch (mood) {
      case 'energized':
        return <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold uppercase">Energized</span>;
      case 'calm':
        return <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase">Calm</span>;
      case 'focused':
        return <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-bold uppercase">Focused</span>;
      case 'drained':
        return <span className="px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-bold uppercase">Drained</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px] font-bold uppercase">{mood}</span>;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/60 border border-slate-800 p-6 rounded-2xl backdrop-blur-xl">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <BookOpen className="text-indigo-400" size={24} />
            Journal & Mindset
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Capture thoughts, track emotional states, and record daily wins.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-semibold text-xs transition-all flex items-center gap-2 shrink-0 shadow-lg shadow-indigo-500/20"
        >
          <Plus size={16} />
          New Entry
        </button>
      </div>

      {/* Entries List */}
      <div className="space-y-4">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 backdrop-blur-xl transition-all space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700/50">
                  {entry.category}
                </span>
                {getMoodBadge(entry.mood)}
              </div>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Calendar size={12} />
                {entry.date}
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-100">{entry.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{entry.content}</p>
          </div>
        ))}
      </div>

      {/* Add Entry Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md space-y-4">
            <h3 className="text-lg font-bold text-slate-100">New Reflection Entry</h3>
            <form onSubmit={handleAddEntry} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Breakthrough session on project"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-indigo-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-indigo-400"
                  >
                    <option value="reflection">Reflection</option>
                    <option value="mindset">Mindset</option>
                    <option value="gratitude">Gratitude</option>
                    <option value="ideas">Ideas</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Mood</label>
                  <select
                    value={mood}
                    onChange={(e) => setMood(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-indigo-400"
                  >
                    <option value="focused">Focused</option>
                    <option value="energized">Energized</option>
                    <option value="calm">Calm</option>
                    <option value="drained">Drained</option>
                    <option value="anxious">Anxious</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Content</label>
                <textarea
                  rows={4}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What's on your mind today?..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-indigo-400 resize-none"
                />
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
                  className="flex-1 py-2.5 rounded-xl bg-indigo-500 text-slate-950 font-semibold text-xs hover:bg-indigo-400"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
