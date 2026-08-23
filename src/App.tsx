import React, { useState, useEffect } from 'react';
import { UserProfile } from './types';
import { AuthService } from './services/auth';
import { AppLayout } from './components/layout/AppLayout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';

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
      {activeTab !== 'dashboard' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 text-center text-slate-400">
          <h2 className="text-lg font-bold text-slate-200 capitalize mb-2">{activeTab} Module</h2>
          <p className="text-xs">Module views coming up in the next phase!</p>
        </div>
      )}
    </AppLayout>
  );
};

export default App;
