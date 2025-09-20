// localStorage utilities for progress tracking

import type { ProgressStorage, CommandProgress, TrainingLevel } from '../types/progress';

const STORAGE_KEY = 'brownfox_progress';
const STORAGE_VERSION = '1.0.0';

// Fallback storage for when localStorage is unavailable
let memoryStorage: ProgressStorage | null = null;

/**
 * Check if localStorage is available
 */
function isLocalStorageAvailable(): boolean {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get progress data from storage
 */
export function getProgressData(): ProgressStorage {
  const defaultData: ProgressStorage = {
    version: STORAGE_VERSION,
    progress: [],
    lastUpdated: new Date().toISOString()
  };

  if (!isLocalStorageAvailable()) {
    return memoryStorage || defaultData;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return defaultData;
    }

    const parsed = JSON.parse(stored) as ProgressStorage;

    // Validate data structure
    if (!parsed.version || !Array.isArray(parsed.progress)) {
      console.warn('Invalid progress data structure, resetting...');
      return defaultData;
    }

    // Handle version migrations if needed
    if (parsed.version !== STORAGE_VERSION) {
      // Future: implement version migration logic
      console.info('Progress data version mismatch, keeping existing data');
    }

    return parsed;
  } catch (error) {
    console.error('Error reading progress data:', error);
    return defaultData;
  }
}

/**
 * Save progress data to storage
 */
export function saveProgressData(data: ProgressStorage): boolean {
  const dataToSave = {
    ...data,
    lastUpdated: new Date().toISOString()
  };

  if (!isLocalStorageAvailable()) {
    memoryStorage = dataToSave;
    return true;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    return true;
  } catch (error) {
    console.error('Error saving progress data:', error);
    // Fallback to memory storage
    memoryStorage = dataToSave;
    return false;
  }
}

/**
 * Get progress for a specific command
 */
export function getCommandProgress(level: TrainingLevel, command: string): CommandProgress | null {
  const data = getProgressData();
  return data.progress.find(p => p.level === level && p.command === command) || null;
}

/**
 * Set progress for a specific command
 */
export function setCommandProgress(level: TrainingLevel, command: string, completed: boolean): boolean {
  const data = getProgressData();
  const existingIndex = data.progress.findIndex(p => p.level === level && p.command === command);

  const progressItem: CommandProgress = {
    level,
    command,
    completed,
    completedAt: completed ? new Date().toISOString() : ''
  };

  if (existingIndex >= 0) {
    data.progress[existingIndex] = progressItem;
  } else {
    data.progress.push(progressItem);
  }

  return saveProgressData(data);
}

/**
 * Toggle progress for a specific command
 */
export function toggleCommandProgress(level: TrainingLevel, command: string): boolean {
  const current = getCommandProgress(level, command);
  const newState = !current?.completed;
  return setCommandProgress(level, command, newState);
}

/**
 * Get all progress for a specific level
 */
export function getLevelProgress(level: TrainingLevel): CommandProgress[] {
  const data = getProgressData();
  return data.progress.filter(p => p.level === level);
}

/**
 * Clear all progress data
 */
export function clearAllProgress(): boolean {
  const defaultData: ProgressStorage = {
    version: STORAGE_VERSION,
    progress: [],
    lastUpdated: new Date().toISOString()
  };

  if (!isLocalStorageAvailable()) {
    memoryStorage = defaultData;
    return true;
  }

  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing progress data:', error);
    return false;
  }
}

/**
 * Export progress data (for future features)
 */
export function exportProgressData(): string {
  const data = getProgressData();
  return JSON.stringify(data, null, 2);
}

/**
 * Import progress data (for future features)
 */
export function importProgressData(jsonData: string): boolean {
  try {
    const parsed = JSON.parse(jsonData) as ProgressStorage;

    // Validate imported data
    if (!parsed.version || !Array.isArray(parsed.progress)) {
      throw new Error('Invalid data format');
    }

    return saveProgressData(parsed);
  } catch (error) {
    console.error('Error importing progress data:', error);
    return false;
  }
}