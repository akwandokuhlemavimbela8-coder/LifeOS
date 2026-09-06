import { motion, AnimatePresence } from 'framer-motion';

interface ToastProps {
  message: string;
  show: boolean;
}

export function Toast({ message, show }: ToastProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          className="fixed bottom-6 right-24 z-50 px-4 py-2.5 bg-slate-900 border border-slate-700 text-slate-100 rounded-xl shadow-2xl flex items-center space-x-2 text-sm font-medium"
        >
          <span className="text-emerald-400">✓</span>
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
