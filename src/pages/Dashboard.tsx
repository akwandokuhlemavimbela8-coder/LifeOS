import React from 'react';
import { Target, CheckCircle2, Sparkles, TrendingUp, Calendar, ShieldCheck } from 'lucide-react';
import { UserProfile, LifeCategory } from '../types';
import { LifeOrbitView } from '../components/life-orbit/LifeOrbitView';

interface DashboardProps {
  user: UserProfile;
}

export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const mockCategoryScores: Record<LifeCategory, number> = {
    health: 85,
    money: 70,
    learning: 90,
    career: 75,
    relationships: 80,
    mindset: 65,
  };

  const todayTasks = [
    { id: '1', title: 'Complete 45 min deep study session', category: 'learning', priority: 'high' },
    { id: '2', title: '30-minute workout & hydrations check', category: 'health', priority: 'medium' },
    { id: '3', title: 'Review monthly budget and savings', category: 'money', priority: 'high' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner & Greeting */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/60 border border-slate-800 p-6 rounded-2xl backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Sparkles size={14} />
            <span>LifeOS Active</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-100">
            Good day, {user.name}
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Here is your daily overview across all life systems.
          </p>
        </div>

        {/* Life Score Badge */}
        <div className="flex items-center gap-3 bg-slate-950/80 px-4 py-3 rounded-xl border border-slate-800">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-slate-950 text-lg shadow-md shadow-cyan-500/20">
            {user.lifeScore}
          </div>
          <div>
            <p className="text-[10px] uppercase text-slate-500 font-semibold tracking-wider">Life Score</p>
            <p className="text-xs font-medium text-emerald-400 flex items-center gap-1">
              <TrendingUp size={12} /> Optimal State
            </p>
          </div>
        </div>
      </div>

      {/* Grid: Orbit View & Today's Priorities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LifeOrbitView scores={mockCategoryScores} />
        </div>

        {/* Today's Tasks & Priorities */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Target className="text-cyan-400" size={18} />
                Today's Focus
              </h2>
              <span className="text-xs text-slate-500">{todayTasks.length} priorities</span>
            </div>

            <div className="space-y-3">
              {todayTasks.map((task) => (
                <div key={task.id} className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 flex items-start gap-3 hover:border-slate-700 transition-colors">
                  <CheckCircle2 size={16} className="text-slate-600 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-slate-200 truncate">{task.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 uppercase tracking-wider font-medium">
                        {task.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1 text-slate-500">
              <Calendar size={13} /> Schedule synced
            </span>
            <span className="text-cyan-400 font-medium cursor-pointer hover:underline">View Planner</span>
          </div>
        </div>
      </div>

      {/* AI Intelligence Card */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900/80 to-blue-950/40 border border-cyan-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-100">AI Recommendation Engine</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Based on your Life Orbit, completing 1 study session today will boost your Learning domain by +5%.
            </p>
          </div>
        </div>
        <button className="px-4 py-2 rounded-xl bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/30 text-xs font-semibold transition-colors shrink-0">
          Optimize Schedule
        </button>
      </div>
    </div>
  );
};
