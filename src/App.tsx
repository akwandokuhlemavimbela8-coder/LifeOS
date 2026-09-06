import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

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
        <nav className="hidden md:flex items-center space-x-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
          {['Dashboard', 'Life Orbit', 'Goals', 'Day Planner', 'Money Hub'].map((tab) => {
            const key = tab.toLowerCase().replace(' ', '-');
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </nav>

        <button className="px-3 py-1.5 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 rounded-lg transition">
          Sign Out
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {/* Render Active Component Here */}
      </main>
    </div>
  );
}
