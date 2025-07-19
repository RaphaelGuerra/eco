import { createContext } from 'react';
import { GameState, TimeOfDay, WeatherCondition, ResearchFocus } from '../types';

// Action types with discriminated union pattern
export const GameActionType = {
  SET_TIME: 'SET_TIME',
  SET_WEATHER: 'SET_WEATHER',
  CYCLE_TIME: 'CYCLE_TIME',
  CYCLE_WEATHER: 'CYCLE_WEATHER',
  TOGGLE_ENVIRONMENT_CYCLING: 'TOGGLE_ENVIRONMENT_CYCLING',
  SET_ENVIRONMENT_INTERVALS: 'SET_ENVIRONMENT_INTERVALS'
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

export interface CycleTimeAction {
  type: typeof GameActionType.CYCLE_TIME;
}

export interface CycleWeatherAction {
  type: typeof GameActionType.CYCLE_WEATHER;
}

export interface ToggleEnvironmentCyclingAction {
  type: typeof GameActionType.TOGGLE_ENVIRONMENT_CYCLING;
  payload: boolean;
}

export interface SetEnvironmentIntervalsAction {
  type: typeof GameActionType.SET_ENVIRONMENT_INTERVALS;
  payload: { timeInterval?: number; weatherInterval?: number };
}

export type GameAction = SetTimeAction | SetWeatherAction | CycleTimeAction | CycleWeatherAction | ToggleEnvironmentCyclingAction | SetEnvironmentIntervalsAction;

// Default game state
export const defaultGameState: GameState = {
  currentLocationId: 'forest-1',
  gameTime: TimeOfDay.Day,
  weather: WeatherCondition.Clear,
  lastEncounterTime: 0,
  activeFieldResearch: null,
  researchFocus: ResearchFocus.Plants,
  environmentCycling: {
    isActive: false,
    lastUpdate: Date.now(),
    timeInterval: 30000, // 30 seconds
    weatherInterval: 30000 // 30 seconds
  }
};

// Context type
export interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

// Create context
export const GameContext = createContext<GameContextType | null>(null); 