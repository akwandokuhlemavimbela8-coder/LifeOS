import React, { useState } from 'react';
import { Target, Plus, CheckCircle2, Circle, Calendar, ChevronRight } from 'lucide-react';
import { Goal, LifeCategory } from '../types';

export const Goals: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 'g1',
      title: 'Achieve Storage Target (30GB)',
      category: 'mindset',
      targetDate: '2026-09-01',
      progress: 80,
      completed: false,
      milestones: [
        { id: 'm1', title: 'Clear cache & system bloat', completed: true },
        { id: 'm2', title: 'Utilize Shizuku for app package management', completed: true },
        { id: 'm3', title: 'Archive media to cloud', completed: false }
      ]
    },
    {
      id: 'g2',
      title: 'Build LifeOS Full Core Stack',
      category: 'learning',
      targetDate: '2026-08-30',
      progress: 60,
      completed: false,
      milestones: [
        { id: 'm4', title: 'Setup GitHub & Vite React Stack', completed: true },
        { id: 'm5', title: 'Build Dashboard & Orbit System', completed: true },
        { id: 'm6', title: 'Build Day Planner & Money Hub', completed: false }
      ]
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<LifeCategory>('learning');

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const newGoal: Goal = {
      id: 'g_' + Date.now(),
      title: newTitle,
      category: newCategory,
      targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      progress: 0,
      completed: false,
      milestones: []
    };

    setGoals([...goals, newGoal]);
    setNewTitle('');
    setShowAddModal(false);
  };

  const toggleGoal = (id: string) => {
    setGoals(goals.map(g => {
      if (g.id === id) {
        const nextCompleted = !g.completed;
        return { ...g, completed: nextCompleted, progress: nextCompleted ? 100 : 50 };
      }
      return g;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/60 border border-slate-800 p-6 rounded-2xl backdrop-blur-xl">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Target className="text-cyan-400" size={24} />
            Goals & Milestones
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Track macro objectives and break them down into actionable steps.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs transition-colors flex items-center gap-2"
        >
          <Plus size={16} />
          New Goal
        </button>
      </div>

      {/* Goal List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals.map((goal) => (
          <div key={goal.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between backdrop-blur-xl hover:border-slate-700 transition-colors">
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className="text-[10px] uppercase font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-cyan-400 border border-cyan-500/20">
                  {goal.category}
                </span>
                <div className="flex items-center gap-1 text-[11px] text-slate-400">
                  <Calendar size={12} />
                  <span>{goal.targetDate}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 cursor-pointer" onClick={() => toggleGoal(goal.id)}>
                {goal.completed ? (
                  <CheckCircle2 size={20} className="text-emerald-400 shrink-0" />
                ) : (
                  <Circle size={20} className="text-slate-600 shrink-0" />
                )}
                <h3 className={`text-sm font-semibold text-slate-200 ${goal.completed ? 'line-through text-slate-500' : ''}`}>
                  {goal.title}
                </h3>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-[11px] text-slate-400 mb-1 font-medium">
                  <span>Progress</span>
                  <span>{goal.progress}%</span>
                </div>
                <div className="w-full bg-slate-950/60 rounded-full h-2 overflow-hidden border border-slate-800">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-300" style={{ width: `${goal.progress}%` }} />
                </div>
              </div>

              {/* Milestones */}
              {goal.milestones.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-800/60 space-y-2">
                  {goal.milestones.map((m) => (
                    <div key={m.id} className="flex items-center gap-2 text-xs text-slate-400">
                      <ChevronRight size={12} className="text-slate-600" />
                      <span className={m.completed ? 'line-through text-slate-600' : 'text-slate-300'}>{m.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Goal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md space-y-4">
            <h3 className="text-lg font-bold text-slate-100">Create New Goal</h3>
            <form onSubmit={handleAddGoal} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Goal Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Master React 19"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as LifeCategory)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-cyan-500"
                >
                  <option value="health">Health</option>
                  <option value="money">Money</option>
                  <option value="learning">Learning</option>
                  <option value="career">Career</option>
                  <option value="relationships">Relationships</option>
                  <option value="mindset">Mindset</option>
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
                  className="flex-1 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-semibold text-xs hover:bg-cyan-400"
                >
                  Save Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
