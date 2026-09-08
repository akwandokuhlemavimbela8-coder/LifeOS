import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  customImageUrl?: string;
  message?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  customImageUrl = '/custom-loading-bg.jpg', // Path relative to your public/ folder
  message = 'Initializing LifeOS Environment...',
}) => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-zinc-950 overflow-hidden">
      {/* Background Custom Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={customImageUrl}
          alt="LifeOS Background"
          className="w-full h-full object-cover opacity-30 filter blur-sm scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent" />
      </div>

      {/* Loading Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex flex-col items-center text-center space-y-6 px-4"
      >
        <div className="relative p-4 bg-zinc-900/80 border border-zinc-800 rounded-2xl shadow-2xl backdrop-blur-xl">
          <Sparkles size={36} className="text-indigo-400 animate-pulse" />
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-wider text-white">LifeOS</h1>
          <p className="text-xs text-zinc-400 font-mono tracking-wide">{message}</p>
        </div>

        {/* Loading Progress Bar */}
        <div className="w-48 h-1.5 bg-zinc-800 rounded-full overflow-hidden border border-zinc-700/50">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="w-full h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          />
        </div>
      </motion.div>
    </div>
  );
};
