import { useContext } from 'react';
import { GameContext, GameContextType } from './gameContextTypes';

// Custom hook for using game context
export function useGameContext(): GameContextType {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
} 