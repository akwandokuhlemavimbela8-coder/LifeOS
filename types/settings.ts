export interface LifeOSSettings {
  general: {
    defaultView: 'dashboard' | 'planner' | 'zen';
    weekStartDay: 'monday' | 'sunday';
    timeFormat: '12h' | '24h';
    quickCaptureShortcut: string;
  };
  appearance: {
    theme: 'dark' | 'light' | 'system';
    enableRainbowLoader: boolean;
    enableParticles: boolean;
    soundEffectsEnabled: boolean;
    soundVolume: number; // 0 to 1
  };
  modules: {
    showFinanceTracker: boolean;
    showHabitHeatmap: boolean;
    showSecondBrain: boolean;
    showFocusTimer: boolean;
  };
  data: {
    autoBackup: boolean;
    supabaseSyncEnabled: boolean;
  };
}

export const DEFAULT_SETTINGS: LifeOSSettings = {
  general: {
    defaultView: 'dashboard',
    weekStartDay: 'monday',
    timeFormat: '24h',
    quickCaptureShortcut: 'Ctrl+K',
  },
  appearance: {
    theme: 'dark',
    enableRainbowLoader: true,
    enableParticles: true,
    soundEffectsEnabled: true,
    soundVolume: 0.8,
  },
  modules: {
    showFinanceTracker: true,
    showHabitHeatmap: true,
    showSecondBrain: true,
    showFocusTimer: true,
  },
  data: {
    autoBackup: false,
    supabaseSyncEnabled: false,
  },
};
