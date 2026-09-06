import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocalStorage } from './hooks/useLocalStorage';
import { calculateLifeScore } from './utils/lifeScore';
import { Toast } from './components/Toast';
import { LifeOrbit } from './components/LifeOrbit';
import { DayPlanner } from './components/DayPlanner';
import { MoneyHub } from './components/MoneyHub';
import { Goals } from './components/Goals';
import { SecondBrain } from './components/SecondBrain';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const [domains] = useLocalStorage('lifeos_domains', [
    { name: 'Health', score: 85 },
    { name: 'Money', score: 70 },
    { name: 'Learning', score: 90 },
    { name: 'Career', score: 75 },
    { name: 'Relationships', score: 80 },
    { name: 'Mindset', score: 65 },
  ]);

  const overallLifeScore = calculateLifeScore(domains);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'life-orbit', label: 'Life Orbit' },
    { id: 'goals', label: 'Goals' },
    { id: 'day-planner', label: 'Day Planner' },
    { id: 'money-hub', label: 'Money Hub' },
    { id: 'second-brain', label: 'Second Brain' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-800/80 px-4 py-3 sm:px-8 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
            OS
          </div>
          <span className="font-bold text-lg tracking-wide text-white">LifeOS</span>
        </div>

        {/* Tab Navigation */}
        <nav className="hidden lg:flex items-center space-x-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Overall Score Badge */}
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 px-3 py-1 rounded-full text-xs font-bold tracking-wider">
            SCORE: {overallLifeScore}
          </div>
        </div>
      </header>

      {/* Main Content View Switcher */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                <LifeOrbit />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <DayPlanner />
                  <MoneyHub onSuccess={triggerToast} />
                </div>
              </div>
            )}

            {activeTab === 'life-orbit' && <LifeOrbit />}
            {activeTab === 'goals' && <Goals onSuccess={triggerToast} />}
            {activeTab === 'day-planner' && <DayPlanner />}
            {activeTab === 'money-hub' && <MoneyHub onSuccess={triggerToast} />}
            {activeTab === 'second-brain' && <SecondBrain onSuccess={triggerToast} />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Toast message={toastMessage} show={showToast} />
    </div>
  );
}
