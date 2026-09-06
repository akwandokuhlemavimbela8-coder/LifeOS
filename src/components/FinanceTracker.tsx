'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface BudgetBucket {
  id: string;
  category: string;
  spent: number;
  limit: number;
}

export default function FinanceTracker() {
  const [buckets, setBuckets] = useState<BudgetBucket[]>([
    { id: '1', category: 'Subscriptions & Software', spent: 45, limit: 100 },
    { id: '2', category: 'Personal & Lifestyle', spent: 180, limit: 300 },
    { id: '3', category: 'Emergency Fund Goal', spent: 750, limit: 1000 },
  ]);

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 p-6 rounded-2xl backdrop-blur-sm space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
          💳 Finance & Buckets
        </span>
        <span className="text-xs text-slate-500 font-mono">Monthly Allocations</span>
      </div>

      <div className="space-y-4">
        {buckets.map((bucket) => {
          const progress = Math.min(100, (bucket.spent / bucket.limit) * 100);
          return (
            <div key={bucket.id} className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-300">{bucket.category}</span>
                <span className="text-slate-400 font-mono">
                  ${bucket.spent} / ${bucket.limit}
                </span>
              </div>
              <div className="w-full bg-slate-950/80 h-2 rounded-full overflow-hidden border border-slate-800">
                <motion.div
                  className={`h-full rounded-full ${
                    progress >= 90
                      ? 'bg-rose-500'
                      : progress >= 75
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
