import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { calculateLifeScore } from './utils/lifeScore';
import { Toast } from './components/Toast';

export default function App() {
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Persistent storage for domains
  const [domains, setDomains] = useLocalStorage('lifeos_domains', [
    { name: 'Health', score: 85 },
    { name: 'Money', score: 70 },
    { name: 'Learning', score: 90 },
    { name: 'Career', score: 75 },
    { name: 'Relationships', score: 80 },
    { name: 'Mindset', score: 65 },
  ]);

  // Dynamically calculated overall score
  const overallLifeScore = calculateLifeScore(domains);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="p-4 border-b border-slate-800 flex justify-between items-center">
        <h1 className="text-xl font-bold">LifeOS</h1>
        <div className="bg-indigo-600/20 text-indigo-400 px-3 py-1 rounded-full text-sm font-semibold">
          Life Score: {overallLifeScore}
        </div>
      </header>

      {/* Render components here */}

      {/* Floating Toast Notification */}
      <Toast message={toastMessage} show={showToast} />
    </div>
  );
}
