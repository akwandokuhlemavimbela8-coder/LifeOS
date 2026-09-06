'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useLifeStore } from '@/store/useLifeStore';

export default function ToastContainer() {
  const { xp, level } = useLifeStore();

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        <motion.div
          key={xp}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.25 }}
          className="bg-slate-900 border border-indigo-500/50 text-slate-100 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 backdrop-blur-md pointer-events-auto"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-ping" />
          <div className="text-xs">
            <p className="font-bold text-indigo-300">System Synced</p>
            <p className="text-slate-400">Current Total: <span className="font-mono text-white font-bold">{xp} XP</span> (Lvl {level})</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
