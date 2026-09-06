'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLifeStore } from '@/store/useLifeStore';

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { addTask } = useLifeStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === 'Escape') setOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    addTask(query, 50);
    setQuery('');
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-slate-950/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-4"
          >
            <form onSubmit={handleQuickAdd} className="flex items-center border-b border-slate-800 pb-3">
              <span className="text-slate-500 font-mono text-sm mr-3">⌘K</span>
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a task and hit Enter to quick add (+50 XP)..."
                className="w-full bg-transparent text-slate-100 focus:outline-none text-base"
              />
            </form>
            <div className="mt-3 flex justify-between items-center text-xs text-slate-500">
              <span>Press <kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">ESC</kbd> to close</span>
              <span>Quick Create Mode</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
