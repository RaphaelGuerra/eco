import { useReducer, ReactNode } from 'react';
import { GameContext, GameContextType, GameAction, defaultGameState } from './gameContextTypes';

// Game reducer
function gameReducer(state: GameContextType['state'], action: GameAction): GameContextType['state'] {
  switch (action.type) {
    case 'SET_TIME':
      return {
        ...state,
        gameTime: action.payload
      };
    case 'SET_WEATHER':
      return {
        ...state,
        weather: action.payload
      };
    default:
      return state;
  }
}

// Provider component
interface GameProviderProps {
  children: ReactNode;
}

export function GameProvider({ children }: GameProviderProps) {
  const [state, dispatch] = useReducer(gameReducer, defaultGameState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
} 