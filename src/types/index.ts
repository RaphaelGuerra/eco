// Core enums for game state
export enum TimeOfDay {
  Day = 'day',
  Night = 'night'
}

export enum WeatherCondition {
  Clear = 'clear',
  Rainy = 'rainy'
}

// Core interfaces for application state
export interface ActiveFieldResearch {
  id: string;
  startTime: number;
  duration: number;
}

export enum ResearchFocus {
  Plants = 'plants',
  Animals = 'animals',
  Ecosystem = 'ecosystem'
}

export interface GameState {
  currentLocationId: string;
  gameTime: TimeOfDay;
  weather: WeatherCondition;
  lastEncounterTime: number;
  activeFieldResearch: ActiveFieldResearch | null;
  researchFocus: ResearchFocus;
} 