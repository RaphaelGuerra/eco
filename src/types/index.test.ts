import { describe, it, expect } from 'vitest';
import { 
  TimeOfDay, 
  WeatherCondition, 
  ResearchFocus,
  type GameState,
  type ActiveFieldResearch 
} from './index';

describe('TimeOfDay enum', () => {
  it('should have correct day value', () => {
    expect(TimeOfDay.Day).toBe('day');
  });

  it('should have correct night value', () => {
    expect(TimeOfDay.Night).toBe('night');
  });

  it('should have exactly 2 values', () => {
    expect(Object.keys(TimeOfDay)).toHaveLength(2);
  });
});

describe('WeatherCondition enum', () => {
  it('should have correct clear value', () => {
    expect(WeatherCondition.Clear).toBe('clear');
  });

  it('should have correct rainy value', () => {
    expect(WeatherCondition.Rainy).toBe('rainy');
  });

  it('should have exactly 2 values', () => {
    expect(Object.keys(WeatherCondition)).toHaveLength(2);
  });
});

describe('ResearchFocus enum', () => {
  it('should have correct plants value', () => {
    expect(ResearchFocus.Plants).toBe('plants');
  });

  it('should have correct animals value', () => {
    expect(ResearchFocus.Animals).toBe('animals');
  });

  it('should have correct ecosystem value', () => {
    expect(ResearchFocus.Ecosystem).toBe('ecosystem');
  });

  it('should have exactly 3 values', () => {
    expect(Object.keys(ResearchFocus)).toHaveLength(3);
  });
});

describe('GameState interface', () => {
  it('should accept valid GameState object', () => {
    const gameState: GameState = {
      currentLocationId: 'forest-1',
      gameTime: TimeOfDay.Day,
      weather: WeatherCondition.Clear,
      lastEncounterTime: Date.now(),
      activeFieldResearch: null,
      researchFocus: ResearchFocus.Plants,
      environmentCycling: {
        isActive: false,
        lastUpdate: Date.now(),
        timeInterval: 30000,
        weatherInterval: 30000
      }
    };

    expect(gameState.gameTime).toBe(TimeOfDay.Day);
    expect(gameState.weather).toBe(WeatherCondition.Clear);
    expect(gameState.activeFieldResearch).toBeNull();
  });

  it('should accept GameState with active field research', () => {
    const activeResearch: ActiveFieldResearch = {
      id: 'research-1',
      startTime: Date.now(),
      duration: 30000
    };

    const gameState: GameState = {
      currentLocationId: 'forest-1',
      gameTime: TimeOfDay.Night,
      weather: WeatherCondition.Rainy,
      lastEncounterTime: Date.now(),
      activeFieldResearch: activeResearch,
      researchFocus: ResearchFocus.Ecosystem,
      environmentCycling: {
        isActive: false,
        lastUpdate: Date.now(),
        timeInterval: 30000,
        weatherInterval: 30000
      }
    };

    expect(gameState.activeFieldResearch).toEqual(activeResearch);
    expect(gameState.gameTime).toBe(TimeOfDay.Night);
    expect(gameState.weather).toBe(WeatherCondition.Rainy);
  });
});

describe('ActiveFieldResearch interface', () => {
  it('should accept valid ActiveFieldResearch object', () => {
    const research: ActiveFieldResearch = {
      id: 'test-research',
      startTime: 1234567890,
      duration: 60000
    };

    expect(research.id).toBe('test-research');
    expect(research.startTime).toBe(1234567890);
    expect(research.duration).toBe(60000);
  });
}); 