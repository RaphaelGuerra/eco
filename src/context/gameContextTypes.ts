import { createContext } from 'react';
import { GameState, TimeOfDay, WeatherCondition, ResearchFocus } from '../types';

// Action types with discriminated union pattern
export const GameActionType = {
  SET_TIME: 'SET_TIME',
  SET_WEATHER: 'SET_WEATHER'
} as const;

export type GameActionType = typeof GameActionType[keyof typeof GameActionType];

// Action interfaces with proper discriminated union
export interface SetTimeAction {
  type: typeof GameActionType.SET_TIME;
  payload: TimeOfDay;
}

export interface SetWeatherAction {
  type: typeof GameActionType.SET_WEATHER;
  payload: WeatherCondition;
}

export type GameAction = SetTimeAction | SetWeatherAction;

// Default game state
export const defaultGameState: GameState = {
  currentLocationId: 'forest-1',
  gameTime: TimeOfDay.Day,
  weather: WeatherCondition.Clear,
  lastEncounterTime: 0,
  activeFieldResearch: null,
  researchFocus: ResearchFocus.Plants
};

// Context type
export interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

// Create context
export const GameContext = createContext<GameContextType | null>(null); 