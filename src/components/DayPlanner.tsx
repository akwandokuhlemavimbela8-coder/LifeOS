import { useState } from 'react';
import { motion } from 'framer-motion';

export function DayPlanner() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Deep study session (45m)', category: 'Learning', priority: 'High', completed: true },
    { id: 2, title: '30-min workout & hydration check', category: 'Health', priority: 'Medium', completed: false },
    { id: 3, title: 'Review monthly budget and savings goals', category: 'Money', priority: 'High', completed: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  return (
    <div className="p-6 bg-slate-900/60 border border-slate-800/80 rounded-2xl space-y-4">
      <h3 className="text-lg font-bold text-white">Today's Execution</h3>
      
      <motion.div
        className="space-y-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {tasks.map((task) => (
          <motion.button
            key={task.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => toggleTask(task.id)}
            className={`w-full p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
              task.completed 
                ? 'bg-slate-900/30 border-slate-800/50 text-slate-500 line-through' 
                : 'bg-slate-800/40 border-slate-700/60 text-slate-100'
            }`}
          >
            <div className="flex items-center space-x-3">
              <motion.div
                className={`w-5 h-5 rounded-md border flex items-center justify-center transition ${
                  task.completed ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-slate-600'
                }`}
                animate={task.completed ? { scale: [1, 1.2, 1] } : {}}
              >
                {task.completed && '✓'}
              </motion.div>
              <span className="font-medium text-sm">{task.title}</span>
            </div>
            
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700/80 text-slate-400">
              {task.category}
            </span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
