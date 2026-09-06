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

  return (
    <div className="p-6 bg-slate-900/60 border border-slate-800/80 rounded-2xl space-y-4">
      <h3 className="text-lg font-bold text-white">Today's Execution</h3>
      
      <div className="space-y-2">
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => toggleTask(task.id)}
            className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
              task.completed 
                ? 'bg-slate-900/30 border-slate-800/50 text-slate-500 line-through' 
                : 'bg-slate-800/40 border-slate-700/60 text-slate-100'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition ${
                task.completed ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-slate-600'
              }`}>
                {task.completed && '✓'}
              </div>
              <span className="font-medium text-sm">{task.title}</span>
            </div>
            
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700/80 text-slate-400">
              {task.category}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
