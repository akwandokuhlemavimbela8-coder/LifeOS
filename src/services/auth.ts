import { UserProfile } from '../types';

const STORAGE_KEY = 'lifeos_user_session';

export const AuthService = {
  async getCurrentUser(): Promise<UserProfile | null> {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    try {
      return JSON.parse(saved);
    } catch {
      return null;
    }
  },

  async login(email: string): Promise<UserProfile> {
    const user: UserProfile = {
      id: 'usr_' + Date.now(),
      name: email.split('@')[0],
      email,
      lifeScore: 78,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  async logout(): Promise<void> {
    localStorage.removeItem(STORAGE_KEY);
  }
};
