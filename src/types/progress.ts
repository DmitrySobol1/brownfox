// Progress tracking type definitions for Brown Fox app

export type TrainingLevel = 'beginner' | 'intermediate' | 'professional';

export interface CommandProgress {
  level: TrainingLevel;
  command: string;
  completed: boolean;
  completedAt: string; // ISO date string
}

export interface ProgressStorage {
  version: string;
  progress: CommandProgress[];
  lastUpdated: string;
}

export interface ProgressData {
  level: TrainingLevel;
  commands: {
    name: string;
    completed: boolean;
    completedAt?: string;
  }[];
  completedCount: number;
  totalCount: number;
  percentage: number;
}

export interface ProgressStats {
  totalCommands: number;
  completedCommands: number;
  overallPercentage: number;
  levelStats: ProgressData[];
}

export interface UseProgressReturn {
  isCompleted: (level: string, command: string) => boolean;
  toggleProgress: (level: string, command: string) => void;
  getProgressByLevel: (level: TrainingLevel) => ProgressData;
  getAllProgress: () => ProgressData[];
  clearAllProgress: () => void;
  getOverallStats: () => ProgressStats;
  isLoading: boolean;
}

// Command definitions for progress tracking
export const TRAINING_COMMANDS = {
  beginner: ['Сидеть', 'Ко мне', 'Нельзя'],
  intermediate: ['Место', 'Рядом', 'Лежать'],
  professional: ['Аппорт', 'Прыжок через барьер', 'Поиск предмета']
} as const;

export const LEVEL_DISPLAY_NAMES = {
  beginner: 'Новичок',
  intermediate: 'Средний',
  professional: 'Профессионал'
} as const;