// Custom React hook for managing progress state

import { useState, useCallback } from 'react';
import type {
  UseProgressReturn,
  ProgressData,
  ProgressStats,
  TrainingLevel
} from '../types/progress';
import { TRAINING_COMMANDS } from '../types/progress';
import {
  getCommandProgress,
  toggleCommandProgress,
  clearAllProgress,
  getProgressData
} from '../utils/progressStorage';

export function useProgress(): UseProgressReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [, forceUpdate] = useState({});

  // Force re-render function
  const refresh = useCallback(() => {
    forceUpdate({});
  }, []);

  /**
   * Check if a specific command is completed
   */
  const isCompleted = useCallback((level: string, command: string): boolean => {
    const progress = getCommandProgress(level as TrainingLevel, command);
    return progress?.completed || false;
  }, []);

  /**
   * Toggle progress for a specific command
   */
  const toggleProgress = useCallback(async (level: string, command: string): Promise<void> => {
    setIsLoading(true);
    try {
      const success = toggleCommandProgress(level as TrainingLevel, command);
      if (success) {
        refresh();
      } else {
        console.error('Failed to toggle progress');
      }
    } catch (error) {
      console.error('Error toggling progress:', error);
    } finally {
      setIsLoading(false);
    }
  }, [refresh]);

  /**
   * Get progress data for a specific level
   */
  const getProgressByLevel = useCallback((level: TrainingLevel): ProgressData => {
    const commands = TRAINING_COMMANDS[level];
    const progressData = getProgressData();

    const commandsWithProgress = commands.map(commandName => {
      const progress = progressData.progress.find(p => p.level === level && p.command === commandName);
      return {
        name: commandName,
        completed: progress?.completed || false,
        completedAt: progress?.completedAt || undefined
      };
    });

    const completedCount = commandsWithProgress.filter(cmd => cmd.completed).length;
    const totalCount = commands.length;
    const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    return {
      level,
      commands: commandsWithProgress,
      completedCount,
      totalCount,
      percentage
    };
  }, []);

  /**
   * Get progress data for all levels
   */
  const getAllProgress = useCallback((): ProgressData[] => {
    const levels: TrainingLevel[] = ['beginner', 'intermediate', 'professional'];
    return levels.map(level => getProgressByLevel(level));
  }, [getProgressByLevel]);

  /**
   * Clear all progress data
   */
  const clearAll = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      const success = clearAllProgress();
      if (success) {
        refresh();
      } else {
        console.error('Failed to clear progress');
      }
    } catch (error) {
      console.error('Error clearing progress:', error);
    } finally {
      setIsLoading(false);
    }
  }, [refresh]);

  /**
   * Get overall progress statistics
   */
  const getOverallStats = useCallback((): ProgressStats => {
    const allProgress = getAllProgress();

    const totalCommands = allProgress.reduce((sum, level) => sum + level.totalCount, 0);
    const completedCommands = allProgress.reduce((sum, level) => sum + level.completedCount, 0);
    const overallPercentage = totalCommands > 0 ? Math.round((completedCommands / totalCommands) * 100) : 0;

    return {
      totalCommands,
      completedCommands,
      overallPercentage,
      levelStats: allProgress
    };
  }, [getAllProgress]);

  return {
    isCompleted,
    toggleProgress,
    getProgressByLevel,
    getAllProgress,
    clearAllProgress: clearAll,
    getOverallStats,
    isLoading
  };
}