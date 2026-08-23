import React, { useState, useEffect } from 'react';
import { UserProfile } from './types';
import { AuthService } from './services/auth';
import { AppLayout } from './components/layout/AppLayout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Goals } from './pages/Goals';
import { Planner } from './pages/Planner';
import { Money } from './pages/Money';
import { Habits } from './pages/Habits';
import { Journal } from './pages/Journal';
import { Knowledge } from './pages/Knowledge';
import { Analytics } from './pages/Analytics';
import { Settings } from './pages/Settings';

export const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    AuthService.getCurrentUser().then((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, []);

  const handleLoginSuccess = (userProfile: UserProfile) => {
    setUser(userProfile);
  };

  const handleLogout = async () => {
    await AuthService.logout();
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 text-xs">
        Initializing LifeOS...
      </div>
    );
  }

  if (!user) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <AppLayout activeTab={activeTab} setActiveTab={setActiveTab} user={user} onLogout={handleLogout}>
      {activeTab === 'dashboard' && <Dashboard user={user} />}
      {activeTab === 'goals' && <Goals />}
      {activeTab === 'planner' && <Planner />}
      {activeTab === 'money' && <Money />}
      {activeTab === 'habits' && <Habits />}
      {activeTab === 'journal' && <Journal />}
      {activeTab === 'knowledge' && <Knowledge />}
      {activeTab === 'analytics' && <Analytics />}
      {activeTab === 'settings' && <Settings user={user} />}
    </AppLayout>
  );
};

export default App;
