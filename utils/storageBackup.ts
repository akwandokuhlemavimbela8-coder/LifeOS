import { LifeOSSettings, DEFAULT_SETTINGS } from '../types/settings';

const SETTINGS_KEY = 'lifeos_user_settings_v1';
const DATA_KEYS = [
  'lifeos_user_settings_v1',
  'lifeos_habits_data',
  'lifeos_finance_records',
  'lifeos_second_brain_notes',
  'lifeos_planner_tasks',
];

export interface LifeOSBackupPayload {
  version: string;
  exportedAt: string;
  settings: LifeOSSettings;
  data: Record<string, any>;
}

/**
 * Export all LifeOS local storage items into a single downloadable JSON file.
 */
export function exportLifeOSData(): void {
  try {
    const dataPayload: Record<string, any> = {};

    DATA_KEYS.forEach((key) => {
      const item = localStorage.getItem(key);
      if (item) {
        try {
          dataPayload[key] = JSON.parse(item);
        } catch {
          dataPayload[key] = item;
        }
      }
    });

    const settingsRaw = localStorage.getItem(SETTINGS_KEY);
    const settings: LifeOSSettings = settingsRaw ? JSON.parse(settingsRaw) : DEFAULT_SETTINGS;

    const backupPayload: LifeOSBackupPayload = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      settings,
      data: dataPayload,
    };

    const blob = new Blob([JSON.stringify(backupPayload, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `lifeos-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Failed to export LifeOS data:', error);
  }
}

/**
 * Parses and restores LifeOS data from a user-provided JSON file.
 */
export function importLifeOSData(file: File): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const backup: LifeOSBackupPayload = JSON.parse(content);

        if (!backup.version || !backup.settings) {
          throw new Error('Invalid LifeOS backup file format.');
        }

        // Restore settings
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(backup.settings));

        // Restore additional module data
        if (backup.data) {
          Object.entries(backup.data).forEach(([key, val]) => {
            const valString = typeof val === 'string' ? val : JSON.stringify(val);
            localStorage.setItem(key, valString);
          });
        }

        resolve(true);
      } catch (err) {
        console.error('Failed to import LifeOS backup file:', err);
        reject(err);
      }
    };

    reader.onerror = () => reject(new Error('Error reading the backup file.'));
    reader.readAsText(file);
  });
}
