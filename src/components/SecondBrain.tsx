import { motion } from 'framer-motion';

interface SecondBrainProps {
  onSuccess?: (message: string) => void;
}

export function SecondBrain({ onSuccess }: SecondBrainProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-2xl p-8 shadow-lg shadow-indigo-500/5"
    >
      <h2 className="text-2xl font-bold text-white mb-4">Second Brain</h2>
      <p className="text-slate-400">
        Capture, organize, and retrieve your thoughts and knowledge.
      </p>
    </motion.div>
  );
}