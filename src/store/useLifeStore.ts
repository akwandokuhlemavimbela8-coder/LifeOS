import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  xpValue: number;
}

export interface Habit {
  id: string;
  name: string;
  streak: number;
  completedToday: boolean;
}

interface LifeOSState {
  xp: number;
  level: number;
  tasks: Task[];
  habits: Habit[];
  
  // Actions
  addTask: (title: string, xpValue?: number) => void;
  toggleTask: (id: string) => void;
  toggleHabit: (id: string) => void;
}

export const useLifeStore = create<LifeOSState>()(
  persist(
    (set, get) => ({
      xp: 0,
      level: 1,
      tasks: [
        { id: '1', title: 'Setup LifeOS local workspace', completed: true, xpValue: 50 },
        { id: '2', title: 'Complete first focus session', completed: false, xpValue: 100 },
      ],
      habits: [
        { id: 'h1', name: 'Drink 2L Water', streak: 3, completedToday: false },
        { id: 'h2', name: 'Read 15 mins', streak: 12, completedToday: false },
      ],

      addTask: (title, xpValue = 25) =>
        set((state) => ({
          tasks: [...state.tasks, { id: Date.now().toString(), title, completed: false, xpValue }],
        })),

      toggleTask: (id) =>
        set((state) => {
          const updatedTasks = state.tasks.map((task) => {
            if (task.id === id) {
              const newlyCompleted = !task.completed;
              const xpGain = newlyCompleted ? task.xpValue : -task.xpValue;
              
              // Calculate new XP & Level
              const newXp = Math.max(0, state.xp + xpGain);
              const newLevel = Math.floor(newXp / 200) + 1;

              return { ...task, completed: newlyCompleted };
            }
            return task;
          });

          const currentXp = updatedTasks.reduce((acc, t) => acc + (t.completed ? t.xpValue : 0), 0);
          return {
            tasks: updatedTasks,
            xp: currentXp,
            level: Math.floor(currentXp / 200) + 1,
          };
        }),

      toggleHabit: (id) =>
        set((state) => ({
          habits: state.habits.map((habit) => {
            if (habit.id === id) {
              const isDone = !habit.completedToday;
              return {
                ...habit,
                completedToday: isDone,
                streak: isDone ? habit.streak + 1 : Math.max(0, habit.streak - 1),
              };
            }
            return habit;
          }),
        })),
    }),
    {
      name: 'lifeos-storage',
    }
  )
);
