import React, { useState } from 'react';
import { Calendar as CalendarIcon, CheckCircle2, Circle, Plus, Sparkles, Clock, Tag } from 'lucide-react';
import { DailyTask, LifeCategory } from '../types';

export const Planner: React.FC = () => {
  const [tasks, setTasks] = useState<DailyTask[]>([
    { id: '1', title: 'Deep study session (45m)', category: 'learning', priority: 'high', completed: true },
    { id: '2', title: '30-min workout & hydration check', category: 'health', priority: 'medium', completed: false },
    { id: '3', title: 'Review monthly budget and savings goals', category: 'money', priority: 'high', completed: false },
    { id: '4', title: 'Mindfulness / Meditation (10m)', category: 'mindset', priority: 'low', completed: true },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState<LifeCategory>('learning');
  const [newTaskPriority, setNewTaskPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: DailyTask = {
      id: 'task_' + Date.now(),
      title: newTaskTitle,
      category: newTaskCategory,
      priority: newTaskPriority,
      completed: false,
    };

    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/60 border border-slate-800 p-6 rounded-2xl backdrop-blur-xl">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <CalendarIcon className="text-cyan-400" size={24} />
            Day Planner
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Organize daily execution and track completion across life domains.
          </p>
        </div>

        {/* Dynamic Daily Completion Gauge */}
        <div className="flex items-center gap-3 bg-slate-950/80 px-4 py-2.5 rounded-xl border border-slate-800 w-full sm:w-auto">
          <div className="text-right">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">Today's Progress</span>
            <span className="text-sm font-bold text-cyan-400">{completedCount} / {tasks.length} Completed</span>
          </div>
          <div className="w-12 h-12 rounded-full border-2 border-slate-800 flex items-center justify-center relative font-semibold text-xs text-slate-200">
            <div className="absolute inset-0 rounded-full border-2 border-cyan-400 transition-all duration-500" style={{ clipPath: `inset(0 0 ${100 - progressPercent}% 0)` }} />
            {progressPercent}%
          </div>
        </div>
      </div>

      {/* Quick Add Form */}
      <form onSubmit={handleAddTask} className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl backdrop-blur-xl flex flex-col md:flex-row gap-3 items-center">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="flex-1 w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition-all"
        />
        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={newTaskCategory}
            onChange={(e) => setNewTaskCategory(e.target.value as LifeCategory)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 flex-1 md:flex-none"
          >
            <option value="health">Health</option>
            <option value="money">Money</option>
            <option value="learning">Learning</option>
            <option value="career">Career</option>
            <option value="relationships">Relationships</option>
            <option value="mindset">Mindset</option>
          </select>

          <select
            value={newTaskPriority}
            onChange={(e) => setNewTaskPriority(e.target.value as 'low' | 'medium' | 'high')}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 flex-1 md:flex-none"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <button
            type="submit"
            className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl font-semibold text-xs transition-all flex items-center gap-1 shrink-0"
          >
            <Plus size={16} />
            Add
          </button>
        </div>
      </form>

      {/* Tasks List */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className={`p-4 rounded-xl border backdrop-blur-xl flex items-center justify-between transition-all duration-200 cursor-pointer ${
              task.completed
                ? 'bg-slate-950/40 border-slate-800/40 text-slate-500'
                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-200 shadow-md'
            }`}
          >
            <div className="flex items-center gap-3">
              {task.completed ? (
                <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
              ) : (
                <Circle size={18} className="text-slate-600 shrink-0" />
              )}
              <span className={`text-xs font-medium ${task.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                {task.title}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700/50">
                {task.category}
              </span>
              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                task.priority === 'high'
                  ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                  : task.priority === 'medium'
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                  : 'bg-slate-800 text-slate-400'
              }`}>
                {task.priority}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
