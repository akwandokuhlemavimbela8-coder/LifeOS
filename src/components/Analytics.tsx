import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export function Analytics() {
  const [tasks] = useLocalStorage('lifeos_tasks', []);
  const [transactions] = useLocalStorage('lifeos_transactions', []);
  const [goals] = useLocalStorage('lifeos_goals', []);

  // Compute metrics dynamically
  const completedTasks = tasks.filter((t: any) => t.completed).length;
  const taskCompletionRate = tasks.length ? Math.round((completedTasks / tasks.length) * 100) : 0;

  const totalIncome = transactions
    .filter((t: any) => t.type === 'income')
    .reduce((acc: number, t: any) => acc + t.amount, 0);

  const totalExpenses = transactions
    .filter((t: any) => t.type === 'expense')
    .reduce((acc: number, t: any) => acc + t.amount, 0);

  const savingsRate = totalIncome > 0 ? Math.round(((totalIncome - totalExpenses) / totalIncome) * 100) : 0;

  const avgGoalProgress = goals.length
    ? Math.round(goals.reduce((acc: number, g: any) => acc + (g.progress || 0), 0) / goals.length)
    : 0;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white">System Performance & Analytics</h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-slate-900/60 border border-slate-800/80 rounded-2xl">
          <p className="text-xs uppercase font-semibold text-indigo-400">Task Completion</p>
          <p className="text-3xl font-extrabold text-white mt-1">{taskCompletionRate}%</p>
          <p className="text-xs text-slate-400 mt-1">{completedTasks} of {tasks.length} tasks completed</p>
        </div>

        <div className="p-5 bg-slate-900/60 border border-slate-800/80 rounded-2xl">
          <p className="text-xs uppercase font-semibold text-emerald-400">Savings Rate</p>
          <p className="text-3xl font-extrabold text-white mt-1">{savingsRate}%</p>
          <p className="text-xs text-slate-400 mt-1">Based on income vs expenses</p>
        </div>

        <div className="p-5 bg-slate-900/60 border border-slate-800/80 rounded-2xl">
          <p className="text-xs uppercase font-semibold text-purple-400">Avg Goal Progress</p>
          <p className="text-3xl font-extrabold text-white mt-1">{avgGoalProgress}%</p>
          <p className="text-xs text-slate-400 mt-1">Across all active milestones</p>
        </div>
      </div>

      <div className="p-5 bg-slate-900/60 border border-slate-800/80 rounded-2xl space-y-3">
        <h4 className="text-md font-bold text-white">Weekly Summary</h4>
        <p className="text-sm text-slate-300 leading-relaxed">
          Your LifeOS core engine is running smoothly. Keep ticking off day planner items and maintaining positive cashflow to boost your overall Life Score.
        </p>
      </div>
    </div>
  );
}
