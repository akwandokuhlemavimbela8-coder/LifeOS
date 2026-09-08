import { supabase } from './supabase';
import { Provider } from '@supabase/supabase-js';

export async function handleSocialLogin(provider: Provider) {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}`,
      },
    });

    if (error) throw error;
  } catch (error: any) {
    console.error(`Error logging in with ${provider}:`, error.message);
    throw error;
  }
}
