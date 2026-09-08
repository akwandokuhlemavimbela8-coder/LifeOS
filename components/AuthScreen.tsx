import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { handleSocialLogin } from '../lib/authHelpers';

interface AuthScreenProps {
  onAuthSuccess: (user: { email: string; name?: string }) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSocialClick = async (provider: 'google' | 'github') => {
    setError(null);
    try {
      await handleSocialLogin(provider);
    } catch (err: any) {
      setError(err.message || `Failed to sign in with ${provider}`);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-zinc-950 p-4">
      <div className="absolute w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md bg-zinc-900/90 border border-zinc-800 p-8 rounded-3xl shadow-2xl backdrop-blur-2xl"
      >
        <div className="flex flex-col items-center text-center space-y-2 mb-6">
          <div className="p-3 bg-zinc-800/80 border border-zinc-700/50 rounded-2xl">
            <Sparkles size={24} className="text-indigo-400" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-wide">
            {isSignUp ? 'Create your LifeOS Account' : 'Welcome back to LifeOS'}
          </h2>
          <p className="text-xs text-zinc-400">
            {isSignUp ? 'Sign up to sync your habits, notes, and tasks.' : 'Enter your credentials to access your dashboard.'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-950/40 border border-red-800/50 text-red-300 text-xs rounded-xl">
            {error}
          </div>
        )}

        {/* Social Login Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            onClick={() => onSocialClick('google')}
            className="flex items-center justify-center gap-2 py-2.5 px-4 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-medium text-zinc-200 hover:bg-zinc-800 hover:border-zinc-700 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.2 9 5 12 5z"
              />
              <path
                fill="#4285F4"
                d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
              />
              <path
                fill="#FBBC05"
                d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12.5s.7 2.8 1.9 5.2l3.7-2.9z"
              />
              <path
                fill="#34A853"
                d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.2-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"
              />
            </svg>
            Google
          </button>

          <button
            type="button"
            onClick={() => onSocialClick('github')}
            className="flex items-center justify-center gap-2 py-2.5 px-4 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-medium text-zinc-200 hover:bg-zinc-800 hover:border-zinc-700 transition-colors"
          >
            <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center mb-6">
          <div className="w-full border-t border-zinc-800" />
          <span className="absolute bg-zinc-900 px-3 text-[10px] text-zinc-500 uppercase tracking-widest font-mono">
            Or continue with email
          </span>
        </div>

        {/* Standard Email/Password Form */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs text-zinc-400 font-medium">Email Address</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-3 text-zinc-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@lifeos.app"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-400 font-medium">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-3 text-zinc-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs rounded-xl transition-colors shadow-lg shadow-indigo-600/20 mt-2"
          >
            {loading ? 'Processing...' : isSignUp ? 'Create Account' : 'Sign In'}
            <ArrowRight size={14} />
          </button>
        </form>
      </motion.div>
    </div>
  );
};
