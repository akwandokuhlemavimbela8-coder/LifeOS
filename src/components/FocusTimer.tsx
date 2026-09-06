'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLifeStore } from '@/store/useLifeStore';

export default function FocusTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const { addTask } = useLifeStore();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      addTask('🎯 Completed 25-min Deep Work Session', 100);
      setTimeLeft(25 * 60);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, addTask]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 p-6 rounded-2xl backdrop-blur-sm flex flex-col items-center justify-center space-y-4">
      <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Deep Work Engine</span>
      <div className="text-5xl font-black font-mono text-slate-100 tracking-wider">
        {formatTime(timeLeft)}
      </div>
      <div className="flex gap-3">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={toggleTimer}
          className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
            isActive ? 'bg-amber-600 hover:bg-amber-500 text-white' : 'bg-indigo-600 hover:bg-indigo-500 text-white'
          }`}
        >
          {isActive ? 'Pause' : 'Start Focus (+100 XP)'}
        </motion.button>
        <button
          onClick={resetTimer}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-xl text-sm font-semibold transition-all"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
