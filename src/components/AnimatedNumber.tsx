import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

export function AnimatedNumber({ value }: { value: number }) {
  const spring = useSpring(0, { bounce: 0, duration: 800 });
  const display = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span>{display}</motion.span>;
}
