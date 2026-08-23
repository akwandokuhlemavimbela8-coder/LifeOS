import React from 'react';
import { BarChart2, TrendingUp, ShieldCheck, Zap, Target, Activity } from 'lucide-react';

export const Analytics: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl backdrop-blur-xl">
        <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <BarChart2 className="text-cyan-400" size={24} />
          Life Performance Analytics
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          High-level metrics across productivity, finance, health, and goal execution.
        </p>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl backdrop-blur-xl">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Goal Execution</span>
          <div className="flex items-center justify-between mt-2">
            <span className="text-2xl font-bold text-cyan-400">82%</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Target size={18} />
            </div>
          </div>
          <p className="text-[10px] text-slate-500 mt-2">+5% from last month</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl backdrop-blur-xl">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Habit Consistency</span>
          <div className="flex items-center justify-between mt-2">
            <span className="text-2xl font-bold text-amber-400">76%</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Zap size={18} />
            </div>
          </div>
          <p className="text-[10px] text-slate-500 mt-2">12 day active streak</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl backdrop-blur-xl">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Task Velocity</span>
          <div className="flex items-center justify-between mt-2">
            <span className="text-2xl font-bold text-emerald-400">28/wk</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Activity size={18} />
            </div>
          </div>
          <p className="text-[10px] text-slate-500 mt-2">High focus efficiency</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl backdrop-blur-xl">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Overall Balance</span>
          <div className="flex items-center justify-between mt-2">
            <span className="text-2xl font-bold text-purple-400">9.1/10</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <ShieldCheck size={18} />
            </div>
          </div>
          <p className="text-[10px] text-slate-500 mt-2">Optimal wellness score</p>
        </div>
      </div>

      {/* Visual Domain Breakdown Progress Bars */}
      <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl backdrop-blur-xl space-y-4">
        <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <TrendingUp className="text-cyan-400" size={18} />
          Life Domain Distribution
        </h2>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs text-slate-300 font-medium mb-1">
              <span>Career & Tech Engineering</span>
              <span className="text-cyan-400 font-bold">88%</span>
            </div>
            <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div className="h-full bg-cyan-400 rounded-full" style={{ width: '88%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-300 font-medium mb-1">
              <span>Financial Growth & Investments</span>
              <span className="text-amber-400 font-bold">75%</span>
            </div>
            <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div className="h-full bg-amber-400 rounded-full" style={{ width: '75%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-300 font-medium mb-1">
              <span>Health & Fitness</span>
              <span className="text-emerald-400 font-bold">80%</span>
            </div>
            <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div className="h-full bg-emerald-400 rounded-full" style={{ width: '80%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-300 font-medium mb-1">
              <span>Mindset & Knowledge Synthesis</span>
              <span className="text-purple-400 font-bold">92%</span>
            </div>
            <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div className="h-full bg-purple-400 rounded-full" style={{ width: '92%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
