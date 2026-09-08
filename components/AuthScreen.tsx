import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

// Inside AuthScreen component:
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError(null);
  setLoading(true);

  try {
    if (isSignUp) {
      // 1. Handle New User Registration
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
        },
      });

      if (signUpError) throw signUpError;
      if (data.user) onAuthSuccess({ email: data.user.email!, name });
    } else {
      // 2. Handle Existing User Login
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;
      if (data.user) {
        onAuthSuccess({
          email: data.user.email!,
          name: data.user.user_metadata?.full_name || email.split('@')[0],
        });
      }
    }
  } catch (err: any) {
    setError(err.message || 'Authentication failed. Please try again.');
  } finally {
    setLoading(false);
  }
};
