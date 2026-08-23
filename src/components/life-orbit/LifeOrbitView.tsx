import React from 'react';
import { HeartPulse, Wallet, BookOpen, Briefcase, Users, Brain } from 'lucide-react';
import { LifeCategory } from '../../types';

interface LifeOrbitViewProps {
  scores: Record<LifeCategory, number>;
}

export const LifeOrbitView: React.FC<LifeOrbitViewProps> = ({ scores }) => {
  const categories: { id: LifeCategory; label: string; icon: any; color: string }[] = [
    { id: 'health', label: 'Health', icon: HeartPulse, color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' },
    { id: 'money', label: 'Money', icon: Wallet, color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' },
    { id: 'learning', label: 'Learning', icon: BookOpen, color: 'text-blue-400 border-blue-500/30 bg-blue-500/10' },
    { id: 'career', label: 'Career', icon: Briefcase, color: 'text-purple-400 border-purple-500/30 bg-purple-500/10' },
    { id: 'relationships', label: 'Relationships', icon: Users, color: 'text-rose-400 border-rose-500/30 bg-rose-500/10' },
    { id: 'mindset', label: 'Mindset', icon: Brain, color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10' },
  ];

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl">
      <h2 className="text-lg font-bold text-slate-100 mb-1">Life Orbit</h2>
      <p className="text-xs text-slate-400 mb-6">Real-time status across primary life domains</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const score = scores[cat.id] || 0;
          return (
            <div key={cat.id} className={`p-3.5 rounded-xl border flex flex-col justify-between ${cat.color}`}>
              <div className="flex items-center justify-between mb-3">
                <Icon size={18} />
                <span className="text-xs font-semibold">{score}%</span>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-200">{cat.label}</p>
                <div className="w-full bg-slate-950/40 rounded-full h-1.5 mt-2 overflow-hidden">
                  <div className="bg-current h-1.5 rounded-full" style={{ width: `${score}%` }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
