import { motion } from 'framer-motion';

const domains = [
  { name: 'Health', score: 85, color: 'from-emerald-500 to-teal-400' },
  { name: 'Money', score: 70, color: 'from-blue-500 to-cyan-400' },
  { name: 'Learning', score: 90, color: 'from-indigo-500 to-purple-400' },
  { name: 'Career', score: 75, color: 'from-amber-500 to-orange-400' },
  { name: 'Relationships', score: 80, color: 'from-pink-500 to-rose-400' },
  { name: 'Mindset', score: 65, color: 'from-violet-500 to-fuchsia-400' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

export function LifeOrbit() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-slate-100 tracking-tight">Life Orbit</h2>
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {domains.map((item) => (
          <motion.div
            key={item.name}
            variants={cardVariants}
            whileHover={{ y: -2, scale: 1.01 }}
            className="p-4 bg-slate-900/60 border border-slate-800/80 rounded-2xl hover:border-slate-700 transition duration-300 cursor-pointer"
          >
            <span className="text-xs font-medium text-slate-400">{item.name}</span>
            <div className="text-2xl font-black text-white my-1">{item.score}%</div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${item.score}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
