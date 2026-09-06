'use client';

import { motion } from 'framer-motion';

export default function HabitHeatmap() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Mock activity intensity levels (0 = low, 3 = high)
  const mockActivity = [2, 3, 1, 3, 2, 0, 3];

  const getColor = (level: number) => {
    switch (level) {
      case 3: return 'bg-indigo-500 shadow-indigo-500/50 shadow-sm';
      case 2: return 'bg-indigo-700/80';
      case 1: return 'bg-indigo-900/40';
      default: return 'bg-slate-800/60';
    }
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 p-6 rounded-2xl backdrop-blur-sm space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Consistency Matrix</span>
        <span className="text-xs text-slate-500">This Week</span>
      </div>

      <div className="grid grid-cols-7 gap-3">
        {days.map((day, idx) => (
          <div key={day} className="flex flex-col items-center space-y-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className={`w-full aspect-square rounded-xl border border-slate-700/50 ${getColor(mockActivity[idx])} transition-all`}
            />
            <span className="text-xs text-slate-500 font-mono">{day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
