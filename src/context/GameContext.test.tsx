import { describe, it, expect, vi } from 'vitest';
import { render, renderHook, act } from '@testing-library/react';
import { ReactNode } from 'react';
import { GameProvider } from './GameContext';
import { GameActionType } from './gameContextTypes';
import { useGameContext } from './gameHooks';
import { gameActions } from './gameActions';
import { TimeOfDay, WeatherCondition, ResearchFocus } from '../types';

// Test wrapper component
function TestWrapper({ children }: { children: ReactNode }) {
  return <GameProvider>{children}</GameProvider>;
}

describe('GameContext', () => {
  describe('GameProvider', () => {
    it('should provide default game state', () => {
      const { result } = renderHook(() => useGameContext(), {
        wrapper: TestWrapper
      });

      expect(result.current.state).toEqual({
        currentLocationId: 'forest-1',
        gameTime: TimeOfDay.Day,
        weather: WeatherCondition.Clear,
        lastEncounterTime: 0,
        activeFieldResearch: null,
        researchFocus: ResearchFocus.Plants
      });
    });

    it('should provide dispatch function', () => {
      const { result } = renderHook(() => useGameContext(), {
        wrapper: TestWrapper
      });

      expect(typeof result.current.dispatch).toBe('function');
    });
  });

  describe('useGameContext hook', () => {
    it('should throw error when used outside provider', () => {
      // Suppress console.error for this test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      expect(() => {
        renderHook(() => useGameContext());
      }).toThrow('useGameContext must be used within a GameProvider');
      
      consoleSpy.mockRestore();
    });

    it('should return context when used within provider', () => {
      const { result } = renderHook(() => useGameContext(), {
        wrapper: TestWrapper
      });

      expect(result.current.state).toBeDefined();
      expect(result.current.dispatch).toBeDefined();
    });
  });

  describe('Game Actions', () => {
    it('should update game time with SET_TIME action', () => {
      const { result } = renderHook(() => useGameContext(), {
        wrapper: TestWrapper
      });

      act(() => {
        result.current.dispatch(gameActions.setTime(TimeOfDay.Night));
      });

      expect(result.current.state.gameTime).toBe(TimeOfDay.Night);
      expect(result.current.state.weather).toBe(WeatherCondition.Clear); // other state unchanged
    });

    it('should update weather with SET_WEATHER action', () => {
      const { result } = renderHook(() => useGameContext(), {
        wrapper: TestWrapper
      });

      act(() => {
        result.current.dispatch(gameActions.setWeather(WeatherCondition.Rainy));
      });

      expect(result.current.state.weather).toBe(WeatherCondition.Rainy);
      expect(result.current.state.gameTime).toBe(TimeOfDay.Day); // other state unchanged
    });

    it('should handle multiple actions in sequence', () => {
      const { result } = renderHook(() => useGameContext(), {
        wrapper: TestWrapper
      });

      act(() => {
        result.current.dispatch(gameActions.setTime(TimeOfDay.Night));
        result.current.dispatch(gameActions.setWeather(WeatherCondition.Rainy));
      });

      expect(result.current.state.gameTime).toBe(TimeOfDay.Night);
      expect(result.current.state.weather).toBe(WeatherCondition.Rainy);
    });
  });

  describe('Action Creators', () => {
    it('should create SET_TIME action correctly', () => {
      const action = gameActions.setTime(TimeOfDay.Night);
      
      expect(action).toEqual({
        type: GameActionType.SET_TIME,
        payload: TimeOfDay.Night
      });
    });

    it('should create SET_WEATHER action correctly', () => {
      const action = gameActions.setWeather(WeatherCondition.Rainy);
      
      expect(action).toEqual({
        type: GameActionType.SET_WEATHER,
        payload: WeatherCondition.Rainy
      });
    });
  });

  describe('GameProvider component rendering', () => {
    it('should render children correctly', () => {
      const TestChild = () => <div data-testid="test-child">Test Content</div>;
      
      const { getByTestId } = render(
        <GameProvider>
          <TestChild />
        </GameProvider>
      );

      expect(getByTestId('test-child')).toHaveTextContent('Test Content');
    });
  });
}); 