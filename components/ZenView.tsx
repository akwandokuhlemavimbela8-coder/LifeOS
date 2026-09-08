import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Play, Pause, RotateCcw, Maximize2 } from 'lucide-react';

interface ZenViewProps {
  onExit?: () => void;
}

export const ZenView: React.FC<ZenViewProps> = ({ onExit }) => {
  const [activeTask, setActiveTask] = useState('Deep Work Session: Core Application Logic');
  const [isCompleted, setIsCompleted] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(1500); // 25 min
  const [isRunning, setIsRunning] = useState(false);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timerSeconds > 0) {
      interval = setInterval(() => setTimerSeconds((s) => s - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timerSeconds]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[450px] h-[450px] bg-indigo-600 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 max-w-xl w-full space-y-8 bg-zinc-900/60 backdrop-blur-xl p-8 border border-zinc-800/80 rounded-3xl shadow-2xl"
      >
        <div className="flex items-center justify-between text-xs text-zinc-500 font-mono tracking-wider uppercase">
          <span className="flex items-center gap-1.5">
            <Sparkles size={14} className="text-indigo-400" /> Zen Focus Active
          </span>
          {onExit && (
            <button
              onClick={onExit}
              className="hover:text-zinc-300 transition-colors"
            >
              Exit Zen Mode
            </button>
          )}
        </div>

        {/* Timer Display */}
        <div className="space-y-2">
          <div className="text-7xl font-extrabold text-white tracking-tight font-mono">
            {formatTime(timerSeconds)}
          </div>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="p-3 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
            >
              {isRunning ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <button
              onClick={() => {
                setIsRunning(false);
                setTimerSeconds(1500);
              }}
              className="p-3 rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            >
              <RotateCcw size={18} />
            </button>
          </div>
        </div>

        {/* Focus Task Card */}
        <div
          onClick={() => setIsCompleted(!isCompleted)}
          className={`cursor-pointer group flex items-center gap-4 p-5 rounded-2xl border transition-all ${
            isCompleted
              ? 'bg-emerald-950/20 border-emerald-800/50 text-zinc-400 line-through'
              : 'bg-zinc-950/50 border-zinc-800 hover:border-zinc-700 text-white'
          }`}
        >
          <div
            className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
              isCompleted
                ? 'bg-emerald-500 border-emerald-500 text-black'
                : 'border-zinc-600 group-hover:border-zinc-400'
            }`}
          >
            {isCompleted && <Check size={14} strokeWidth={3} />}
          </div>
          <span className="text-base font-medium flex-1 text-left">{activeTask}</span>
        </div>
      </motion.div>
    </div>
  );
};
