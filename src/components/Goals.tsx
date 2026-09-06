import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface Milestone {
  id: string;
  title: string;
  completed: boolean;
}

interface Goal {
  id: string;
  title: string;
  domain: string;
  targetDate: string;
  progress: number;
  milestones: Milestone[];
}

interface GoalsProps {
  onSuccess: (msg: string) => void;
}

export function Goals({ onSuccess }: GoalsProps) {
  const [goals, setGoals] = useLocalStorage<Goal[]>('lifeos_goals', [
    {
      id: '1',
      title: 'Achieve Storage Target (30GB)',
      domain: 'mindset',
      targetDate: '2026-09-01',
      progress: 100,
      milestones: [
        { id: 'm1', title: 'Clear cache & system bloat', completed: true },
        { id: 'm2', title: 'Utilize Shizuku for app package management', completed: true },
        { id: 'm3', title: 'Archive media to cloud', completed: true }
      ]
    },
    {
      id: '2',
      title: 'Build LifeOS Full Core Stack',
      domain: 'learning',
      targetDate: '2026-08-30',
      progress: 60,
      milestones: [
        { id: 'm4', title: 'Setup GitHub & Vite React Stack', completed: true },
        { id: 'm5', title: 'Build Dashboard & Orbit System', completed: true },
        { id: 'm6', title: 'Build Day Planner & Money Hub', completed: false }
      ]
    }
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newDomain, setNewDomain] = useState('learning');
  const [targetDate, setTargetDate] = useState('');

  const toggleMilestone = (goalId: string, milestoneId: string) => {
    const updated = goals.map((goal) => {
      if (goal.id !== goalId) return goal;
      
      const updatedMilestones = goal.milestones.map((m) =>
        m.id === milestoneId ? { ...m, completed: !m.completed } : m
      );

      const completedCount = updatedMilestones.filter((m) => m.completed).length;
      const progress = updatedMilestones.length
        ? Math.round((completedCount / updatedMilestones.length) * 100)
        : 0;

      return { ...goal, milestones: updatedMilestones, progress };
    });

    setGoals(updated);
    onSuccess('Progress updated');
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const newGoal: Goal = {
      id: Date.now().toString(),
      title: newTitle,
      domain: newDomain,
      targetDate: targetDate || '2026-12-31',
      progress: 0,
      milestones: []
    };

    setGoals([newGoal, ...goals]);
    setNewTitle('');
    setTargetDate('');
    onSuccess('New goal added!');
  };

  const goalsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const goalCardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  const milestoneVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const milestoneItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  return (
    <div className="space-y-6">
      {/* Create New Goal Form */}
      <form onSubmit={handleAddGoal} className="p-5 bg-slate-900/60 border border-slate-800/80 rounded-2xl space-y-4">
        <h3 className="text-lg font-bold text-white">Create New Goal</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="Goal Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
          />
          <select
            value={newDomain}
            onChange={(e) => setNewDomain(e.target.value)}
            className="bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="health">Health</option>
            <option value="money">Money</option>
            <option value="learning">Learning</option>
            <option value="career">Career</option>
            <option value="mindset">Mindset</option>
          </select>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl px-4 py-2 text-sm transition"
          >
            + Add Goal
          </motion.button>
        </div>
      </form>

      {/* Goal Cards */}
      <motion.div
        className="space-y-4"
        variants={goalsContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {goals.map((goal) => (
          <motion.div
            key={goal.id}
            variants={goalCardVariants}
            whileHover={{ y: -2, scale: 1.01 }}
            className="p-5 bg-slate-900/60 border border-slate-800/80 rounded-2xl space-y-3 cursor-pointer transition-all"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-indigo-400">{goal.domain}</span>
                <h4 className="text-lg font-bold text-white">{goal.title}</h4>
                <p className="text-xs text-slate-400">Target: {goal.targetDate}</p>
              </div>
              <motion.span
                className="text-xl font-extrabold text-indigo-400"
                key={goal.progress}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {goal.progress}%
              </motion.span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                initial={{ width: 0 }}
                animate={{ width: `${goal.progress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>

            {/* Milestones Checklist */}
            <motion.div
              className="pt-2 space-y-2"
              variants={milestoneVariants}
              initial="hidden"
              animate="visible"
            >
              {goal.milestones.map((m) => (
                <motion.button
                  key={m.id}
                  variants={milestoneItemVariants}
                  onClick={() => toggleMilestone(goal.id, m.id)}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center space-x-3 text-sm cursor-pointer text-slate-300 hover:text-white transition-all text-left"
                >
                  <motion.div
                    className={`w-4 h-4 rounded flex items-center justify-center border flex-shrink-0 ${
                      m.completed ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-slate-600'
                    }`}
                    animate={m.completed ? { scale: [1, 1.2, 1] } : {}}
                  >
                    {m.completed && '✓'}
                  </motion.div>
                  <span className={m.completed ? 'line-through text-slate-500' : ''}>{m.title}</span>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
