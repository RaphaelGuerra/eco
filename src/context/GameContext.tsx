import { useReducer, ReactNode } from 'react';
import { GameContext, GameContextType, GameAction, defaultGameState } from './gameContextTypes';
import { TimeOfDay, WeatherCondition } from '../types';

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
    case 'CYCLE_TIME':
      return {
        ...state,
        gameTime: state.gameTime === TimeOfDay.Day ? TimeOfDay.Night : TimeOfDay.Day,
        environmentCycling: {
          ...state.environmentCycling,
          lastUpdate: Date.now()
        }
      };
    case 'CYCLE_WEATHER':
      return {
        ...state,
        weather: state.weather === WeatherCondition.Clear ? WeatherCondition.Rainy : WeatherCondition.Clear,
        environmentCycling: {
          ...state.environmentCycling,
          lastUpdate: Date.now()
        }
      };
    case 'TOGGLE_ENVIRONMENT_CYCLING':
      return {
        ...state,
        environmentCycling: {
          ...state.environmentCycling,
          isActive: action.payload,
          lastUpdate: Date.now()
        }
      };
    case 'SET_ENVIRONMENT_INTERVALS':
      return {
        ...state,
        environmentCycling: {
          ...state.environmentCycling,
          timeInterval: action.payload.timeInterval ?? state.environmentCycling.timeInterval,
          weatherInterval: action.payload.weatherInterval ?? state.environmentCycling.weatherInterval,
          lastUpdate: Date.now()
        }
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