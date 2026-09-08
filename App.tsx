import React, { useState, useEffect } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { AuthScreen } from './components/AuthScreen';
import { Dashboard } from './components/Dashboard';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // 1. Check for active login session
    const savedSession = localStorage.getItem('lifeos_user_session');
    if (savedSession) {
      setUser(JSON.parse(savedSession));
    }

    // 2. Display the loading screen for 2 seconds on app launch
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Show Loading Screen first
  if (isLoading) {
    return <LoadingScreen customImageUrl="/custom-loading-bg.jpg" message="Loading your LifeOS space..." />;
  }

  // Show Auth Screen if user isn't logged in
  if (!user) {
    return <AuthScreen onAuthSuccess={(userData) => setUser(userData)} />;
  }

  // Show Main Application
  return <Dashboard user={user} />;
}
