import { useState, useEffect } from 'react';
import { LifeOSSettings, DEFAULT_SETTINGS } from '../types/settings';

const STORAGE_KEY = 'lifeos_user_settings_v1';

export function useSettings() {
  const [settings, setSettings] = useState<LifeOSSettings>(() => {
    if (typeof window === 'undefined') return DEFAULT_SETTINGS;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch (e) {
      console.error('Failed to load settings from storage', e);
      return DEFAULT_SETTINGS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to persist settings', e);
    }
  }, [settings]);

  const updateSettings = <K extends keyof LifeOSSettings>(
    category: K,
    updates: Partial<LifeOSSettings[K]>
  ) => {
    setSettings((prev) => ({
      ...prev,
      [category]: { ...prev[category], ...updates },
    }));
  };

  const resetSettings = () => setSettings(DEFAULT_SETTINGS);

  return { settings, updateSettings, resetSettings };
}
