import { motion } from 'framer-motion';

interface AnimatedNumberProps {
  value: number;
}

export function AnimatedNumber({ value }: AnimatedNumberProps) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      key={Math.round(value)}
    >
      {Math.round(value)}
    </motion.span>
  );
}