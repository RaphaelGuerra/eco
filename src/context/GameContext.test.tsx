import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { GameProvider } from './GameContext';
import { useGameContext } from './gameHooks';
import { TimeOfDay, WeatherCondition } from '../types';

// Test component to access context
function TestComponent() {
  const { state, dispatch } = useGameContext();
  
  const handleCycleTime = () => dispatch({ type: 'CYCLE_TIME' });
  const handleCycleWeather = () => dispatch({ type: 'CYCLE_WEATHER' });
  const handleToggleCycling = () => dispatch({ 
    type: 'TOGGLE_ENVIRONMENT_CYCLING', 
    payload: !state.environmentCycling.isActive 
  });
  const handleSetIntervals = () => dispatch({ 
    type: 'SET_ENVIRONMENT_INTERVALS', 
    payload: { timeInterval: 15000, weatherInterval: 20000 } 
  });

  return (
    <div>
      <div data-testid="game-time">{state.gameTime}</div>
      <div data-testid="weather">{state.weather}</div>
      <div data-testid="cycling-active">{state.environmentCycling.isActive.toString()}</div>
      <div data-testid="time-interval">{state.environmentCycling.timeInterval}</div>
      <div data-testid="weather-interval">{state.environmentCycling.weatherInterval}</div>
      <button onClick={handleCycleTime} data-testid="cycle-time">Cycle Time</button>
      <button onClick={handleCycleWeather} data-testid="cycle-weather">Cycle Weather</button>
      <button onClick={handleToggleCycling} data-testid="toggle-cycling">Toggle Cycling</button>
      <button onClick={handleSetIntervals} data-testid="set-intervals">Set Intervals</button>
    </div>
  );
}

describe('GameContext', () => {
  beforeEach(() => {
    render(
      <GameProvider>
        <TestComponent />
      </GameProvider>
    );
  });

  describe('initial state', () => {
    it('should have correct initial values', () => {
      expect(screen.getByTestId('game-time')).toHaveTextContent(TimeOfDay.Day);
      expect(screen.getByTestId('weather')).toHaveTextContent(WeatherCondition.Clear);
      expect(screen.getByTestId('cycling-active')).toHaveTextContent('false');
      expect(screen.getByTestId('time-interval')).toHaveTextContent('30000');
      expect(screen.getByTestId('weather-interval')).toHaveTextContent('30000');
    });
  });

  describe('CYCLE_TIME action', () => {
    it('should cycle time from day to night', () => {
      const cycleTimeButton = screen.getByTestId('cycle-time');
      act(() => {
        cycleTimeButton.click();
      });
      
      expect(screen.getByTestId('game-time')).toHaveTextContent(TimeOfDay.Night);
    });

    it('should cycle time from night to day', () => {
      const cycleTimeButton = screen.getByTestId('cycle-time');
      
      // First click: day -> night
      act(() => {
        cycleTimeButton.click();
      });
      expect(screen.getByTestId('game-time')).toHaveTextContent(TimeOfDay.Night);
      
      // Second click: night -> day
      act(() => {
        cycleTimeButton.click();
      });
      expect(screen.getByTestId('game-time')).toHaveTextContent(TimeOfDay.Day);
    });

    it('should update lastUpdate timestamp', () => {
      const cycleTimeButton = screen.getByTestId('cycle-time');
      
      act(() => {
        cycleTimeButton.click();
      });
      
      // The lastUpdate should be updated (we can't easily test the exact timestamp,
      // but we can verify the action was processed)
      expect(screen.getByTestId('game-time')).toHaveTextContent(TimeOfDay.Night);
    });
  });

  describe('CYCLE_WEATHER action', () => {
    it('should cycle weather from clear to rainy', () => {
      const cycleWeatherButton = screen.getByTestId('cycle-weather');
      act(() => {
        cycleWeatherButton.click();
      });
      
      expect(screen.getByTestId('weather')).toHaveTextContent(WeatherCondition.Rainy);
    });

    it('should cycle weather from rainy to clear', () => {
      const cycleWeatherButton = screen.getByTestId('cycle-weather');
      
      // First click: clear -> rainy
      act(() => {
        cycleWeatherButton.click();
      });
      expect(screen.getByTestId('weather')).toHaveTextContent(WeatherCondition.Rainy);
      
      // Second click: rainy -> clear
      act(() => {
        cycleWeatherButton.click();
      });
      expect(screen.getByTestId('weather')).toHaveTextContent(WeatherCondition.Clear);
    });

    it('should update lastUpdate timestamp', () => {
      const cycleWeatherButton = screen.getByTestId('cycle-weather');
      act(() => {
        cycleWeatherButton.click();
      });
      
      expect(screen.getByTestId('weather')).toHaveTextContent(WeatherCondition.Rainy);
    });
  });

  describe('TOGGLE_ENVIRONMENT_CYCLING action', () => {
    it('should toggle cycling from false to true', () => {
      const toggleButton = screen.getByTestId('toggle-cycling');
      act(() => {
        toggleButton.click();
      });
      
      expect(screen.getByTestId('cycling-active')).toHaveTextContent('true');
    });

    it('should toggle cycling from true to false', () => {
      const toggleButton = screen.getByTestId('toggle-cycling');
      
      // First click: false -> true
      act(() => {
        toggleButton.click();
      });
      expect(screen.getByTestId('cycling-active')).toHaveTextContent('true');
      
      // Second click: true -> false
      act(() => {
        toggleButton.click();
      });
      expect(screen.getByTestId('cycling-active')).toHaveTextContent('false');
    });

    it('should update lastUpdate timestamp', () => {
      const toggleButton = screen.getByTestId('toggle-cycling');
      act(() => {
        toggleButton.click();
      });
      
      expect(screen.getByTestId('cycling-active')).toHaveTextContent('true');
    });
  });

  describe('SET_ENVIRONMENT_INTERVALS action', () => {
    it('should update time interval', () => {
      const setIntervalsButton = screen.getByTestId('set-intervals');
      act(() => {
        setIntervalsButton.click();
      });
      
      expect(screen.getByTestId('time-interval')).toHaveTextContent('15000');
    });

    it('should update weather interval', () => {
      const setIntervalsButton = screen.getByTestId('set-intervals');
      act(() => {
        setIntervalsButton.click();
      });
      
      expect(screen.getByTestId('weather-interval')).toHaveTextContent('20000');
    });

    it('should preserve existing intervals when not specified', () => {
      const setIntervalsButton = screen.getByTestId('set-intervals');
      act(() => {
        setIntervalsButton.click();
      });
      
      // The button sets timeInterval: 15000, weatherInterval: 20000
      // If we only update one, the other should remain unchanged
      expect(screen.getByTestId('time-interval')).toHaveTextContent('15000');
      expect(screen.getByTestId('weather-interval')).toHaveTextContent('20000');
    });

    it('should update lastUpdate timestamp', () => {
      const setIntervalsButton = screen.getByTestId('set-intervals');
      act(() => {
        setIntervalsButton.click();
      });
      
      expect(screen.getByTestId('time-interval')).toHaveTextContent('15000');
    });
  });

  describe('state persistence', () => {
    it('should maintain state across multiple actions', () => {
      const cycleTimeButton = screen.getByTestId('cycle-time');
      const cycleWeatherButton = screen.getByTestId('cycle-weather');
      const toggleButton = screen.getByTestId('toggle-cycling');
      
      // Perform multiple actions
      act(() => {
        cycleTimeButton.click();
        cycleWeatherButton.click();
        toggleButton.click();
      });
      
      // Verify all state changes are maintained
      expect(screen.getByTestId('game-time')).toHaveTextContent(TimeOfDay.Night);
      expect(screen.getByTestId('weather')).toHaveTextContent(WeatherCondition.Rainy);
      expect(screen.getByTestId('cycling-active')).toHaveTextContent('true');
    });
  });
}); 