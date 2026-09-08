import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { LoadingScreen } from './components/LoadingScreen';
import { AuthScreen } from './components/AuthScreen';
import { Dashboard } from './components/Dashboard';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    // 1. Fetch current auth session on launch
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      // Give the loader a brief display duration for visual smooth boot
      setTimeout(() => setIsLoading(false), 1500);
    });

    // 2. Listen for auth changes (login, logout, sign up)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isLoading) {
    return <LoadingScreen customImageUrl="/custom-loading-bg.jpg" message="Loading your LifeOS space..." />;
  }

  if (!session) {
    return <AuthScreen />;
  }

  return <Dashboard user={session.user} />;
}
