import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { GameProvider } from '../context/GameContext';
import { StatusPanelContainer } from '../components/containers/StatusPanelContainer';
import { EnvironmentControlsContainer } from '../components/containers/EnvironmentControlsContainer';

describe('Environment System Integration', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const renderEnvironmentSystem = () => {
    return render(
      <GameProvider>
        <div className="space-y-4">
          <StatusPanelContainer />
          <EnvironmentControlsContainer />
        </div>
      </GameProvider>
    );
  };

  describe('complete environment workflow', () => {
    it('should display initial state correctly', () => {
      renderEnvironmentSystem();
      
      // Check status panel
      expect(screen.getByTestId('status-text')).toHaveTextContent('Time: Day | Weather: Clear');
      expect(screen.getByTestId('environment-icon')).toHaveTextContent('☀️');
      expect(screen.getByTestId('controls-cycling-status')).toHaveTextContent('⏸️ Paused');
      
      // Check controls
      expect(screen.getByTestId('controls-cycling-toggle')).toHaveTextContent('▶️ Start Cycling');
      expect(screen.getByTestId('time-interval-display')).toHaveTextContent('30s');
      expect(screen.getByTestId('weather-interval-display')).toHaveTextContent('30s');
    });

    it('should start cycling when start button is clicked', () => {
      renderEnvironmentSystem();
      
      const startButton = screen.getByTestId('controls-cycling-toggle');
      fireEvent.click(startButton);
      
      // Check that cycling status updates
      expect(screen.getByTestId('controls-cycling-status')).toHaveTextContent('🔄 Active');
      expect(screen.getByTestId('controls-cycling-toggle')).toHaveTextContent('⏸️ Pause Cycling');
    });

    it('should cycle environment automatically when active', () => {
      renderEnvironmentSystem();
      
      // Start cycling
      const startButton = screen.getByTestId('controls-cycling-toggle');
      fireEvent.click(startButton);
      
      // Advance time to trigger first cycle (30 seconds)
      act(() => {
        vi.advanceTimersByTime(30000);
      });
      
      // Check that both time and weather have cycled (both cycle every 30 seconds)
      expect(screen.getByTestId('status-text')).toHaveTextContent('Time: Night | Weather: Rainy');
      expect(screen.getByTestId('environment-icon')).toHaveTextContent('🌧️');
      
      // Advance time to trigger next cycle (another 30 seconds)
      act(() => {
        vi.advanceTimersByTime(30000);
      });
      
      // Check that both time and weather have cycled back
      expect(screen.getByTestId('status-text')).toHaveTextContent('Time: Day | Weather: Clear');
      expect(screen.getByTestId('environment-icon')).toHaveTextContent('☀️');
    });

    it('should stop cycling when pause button is clicked', () => {
      renderEnvironmentSystem();
      
      // Start cycling
      const startButton = screen.getByTestId('controls-cycling-toggle');
      fireEvent.click(startButton);
      
      // Verify it's active
      expect(screen.getByTestId('controls-cycling-status')).toHaveTextContent('🔄 Active');
      
      // Stop cycling
      const pauseButton = screen.getByTestId('controls-cycling-toggle');
      fireEvent.click(pauseButton);
      
      // Check that cycling status updates
      expect(screen.getByTestId('controls-cycling-status')).toHaveTextContent('⏸️ Paused');
      expect(screen.getByTestId('controls-cycling-toggle')).toHaveTextContent('▶️ Start Cycling');
    });

    it('should allow manual cycling when paused', () => {
      renderEnvironmentSystem();
      
      // Manual cycle time
      const cycleTimeButton = screen.getByTestId('manual-cycle-time');
      fireEvent.click(cycleTimeButton);
      
      // Check that time has cycled
      expect(screen.getByTestId('status-text')).toHaveTextContent('Time: Night | Weather: Clear');
      expect(screen.getByTestId('environment-icon')).toHaveTextContent('🌙');
      
      // Manual cycle weather
      const cycleWeatherButton = screen.getByTestId('cycle-weather-btn');
      fireEvent.click(cycleWeatherButton);
      
      // Check that weather has cycled
      expect(screen.getByTestId('status-text')).toHaveTextContent('Time: Night | Weather: Rainy');
      expect(screen.getByTestId('environment-icon')).toHaveTextContent('🌧️');
    });
  });

  describe('configuration integration', () => {
    it('should update intervals when configuration is applied', () => {
      renderEnvironmentSystem();
      
      // Show config panel
      const configToggle = screen.getByTestId('config-toggle');
      fireEvent.click(configToggle);
      
      // Change intervals
      const timeSlider = screen.getByTestId('time-interval-slider');
      const weatherSlider = screen.getByTestId('weather-interval-slider');
      
      fireEvent.change(timeSlider, { target: { value: '15' } });
      fireEvent.change(weatherSlider, { target: { value: '45' } });
      
      // Apply configuration
      const applyButton = screen.getByTestId('apply-config');
      fireEvent.click(applyButton);
      
      // Check that intervals are updated
      expect(screen.getByTestId('time-interval-display')).toHaveTextContent('15s');
      expect(screen.getByTestId('weather-interval-display')).toHaveTextContent('45s');
    });

    it('should use new intervals for cycling', () => {
      renderEnvironmentSystem();
      
      // Configure faster intervals
      const configToggle = screen.getByTestId('config-toggle');
      fireEvent.click(configToggle);
      
      const timeSlider = screen.getByTestId('time-interval-slider');
      fireEvent.change(timeSlider, { target: { value: '10' } });
      
      const applyButton = screen.getByTestId('apply-config');
      fireEvent.click(applyButton);
      
      // Start cycling
      const startButton = screen.getByTestId('controls-cycling-toggle');
      fireEvent.click(startButton);
      
      // Advance time to trigger cycle with new interval (10 seconds)
      act(() => {
        vi.advanceTimersByTime(10000);
      });
      
      // Check that time has cycled
      expect(screen.getByTestId('status-text')).toHaveTextContent('Time: Night | Weather: Clear');
    });

    it('should apply quick presets correctly', () => {
      renderEnvironmentSystem();
      
      // Apply fast preset
      const fastPreset = screen.getByTestId('preset-fast');
      fireEvent.click(fastPreset);
      
      // Check that intervals are updated
      expect(screen.getByTestId('time-interval-display')).toHaveTextContent('10s');
      expect(screen.getByTestId('weather-interval-display')).toHaveTextContent('10s');
    });
  });

  describe('performance validation', () => {
    it('should maintain performance during continuous cycling', () => {
      renderEnvironmentSystem();
      
      // Start cycling
      const startButton = screen.getByTestId('controls-cycling-toggle');
      fireEvent.click(startButton);
      
      // Simulate 10 minutes of cycling (20 cycles)
      const startTime = performance.now();
      
      act(() => {
        for (let i = 0; i < 20; i++) {
          vi.advanceTimersByTime(30000);
        }
      });
      
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // Performance should be reasonable (less than 1 second for 20 cycles)
      expect(duration).toBeLessThan(1000);
      
      // UI should still be responsive
      expect(screen.getByTestId('status-text')).toBeInTheDocument();
    });

    it('should handle rapid manual cycling without performance issues', () => {
      renderEnvironmentSystem();
      
      const cycleTimeButton = screen.getByTestId('manual-cycle-time');
      const cycleWeatherButton = screen.getByTestId('cycle-weather-btn');
      
      const startTime = performance.now();
      
      // Rapid manual cycling
      act(() => {
        for (let i = 0; i < 50; i++) {
          fireEvent.click(cycleTimeButton);
          fireEvent.click(cycleWeatherButton);
        }
      });
      
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // Performance should be reasonable (less than 500ms for 100 clicks)
      expect(duration).toBeLessThan(500);
      
      // UI should still be responsive
      expect(screen.getByTestId('status-text')).toBeInTheDocument();
    });
  });

  describe('state persistence', () => {
    it('should maintain cycling state across component re-renders', () => {
      const { rerender } = renderEnvironmentSystem();
      
      // Start cycling
      const startButton = screen.getByTestId('controls-cycling-toggle');
      fireEvent.click(startButton);
      
      // Verify it's active
      expect(screen.getByTestId('controls-cycling-status')).toHaveTextContent('🔄 Active');
      
      // Re-render the component
      rerender(
        <GameProvider>
          <div className="space-y-4">
            <StatusPanelContainer />
            <EnvironmentControlsContainer />
          </div>
        </GameProvider>
      );
      
      // Check that cycling state is maintained
      expect(screen.getByTestId('controls-cycling-status')).toHaveTextContent('🔄 Active');
    });

    it('should maintain environment state across component re-renders', () => {
      const { rerender } = renderEnvironmentSystem();
      
      // Change environment manually
      const cycleTimeButton = screen.getByTestId('manual-cycle-time');
      const cycleWeatherButton = screen.getByTestId('cycle-weather-btn');
      
      fireEvent.click(cycleTimeButton);
      fireEvent.click(cycleWeatherButton);
      
      // Verify state
      expect(screen.getByTestId('status-text')).toHaveTextContent('Time: Night | Weather: Rainy');
      
      // Re-render the component
      rerender(
        <GameProvider>
          <div className="space-y-4">
            <StatusPanelContainer />
            <EnvironmentControlsContainer />
          </div>
        </GameProvider>
      );
      
      // Check that environment state is maintained
      expect(screen.getByTestId('status-text')).toHaveTextContent('Time: Night | Weather: Rainy');
    });
  });

  describe('cleanup validation', () => {
    it('should cleanup timers when cycling is stopped', () => {
      renderEnvironmentSystem();
      
      // Start cycling
      const startButton = screen.getByTestId('controls-cycling-toggle');
      fireEvent.click(startButton);
      
      // Stop cycling
      const pauseButton = screen.getByTestId('controls-cycling-toggle');
      fireEvent.click(pauseButton);
      
      // Advance time - should not trigger any changes
      act(() => {
        vi.advanceTimersByTime(60000);
      });
      
      // Environment should remain unchanged
      expect(screen.getByTestId('status-text')).toHaveTextContent('Time: Day | Weather: Clear');
    });

    it('should cleanup timers when component unmounts', () => {
      const { unmount } = renderEnvironmentSystem();
      
      // Start cycling
      const startButton = screen.getByTestId('controls-cycling-toggle');
      fireEvent.click(startButton);
      
      // Unmount component
      unmount();
      
      // Advance time - should not cause any errors
      act(() => {
        vi.advanceTimersByTime(60000);
      });
      
      // No errors should be thrown
      expect(true).toBe(true);
    });
  });

  describe('error handling', () => {
    it('should handle invalid interval configurations gracefully', () => {
      renderEnvironmentSystem();
      
      // Show config panel
      const configToggle = screen.getByTestId('config-toggle');
      fireEvent.click(configToggle);
      
      // Try to set invalid intervals (this should be prevented by the UI)
      const timeSlider = screen.getByTestId('time-interval-slider');
      fireEvent.change(timeSlider, { target: { value: '1' } }); // Very fast interval
      
      // Apply configuration
      const applyButton = screen.getByTestId('apply-config');
      fireEvent.click(applyButton);
      
      // System should still function
      expect(screen.getByTestId('controls-cycling-toggle')).toBeInTheDocument();
    });

    it('should handle rapid start/stop cycles without issues', () => {
      renderEnvironmentSystem();
      
      const toggleButton = screen.getByTestId('controls-cycling-toggle');
      
      // Rapid start/stop cycles
      act(() => {
        for (let i = 0; i < 10; i++) {
          fireEvent.click(toggleButton); // Start
          fireEvent.click(toggleButton); // Stop
        }
      });
      
      // System should still be functional
      expect(screen.getByTestId('controls-cycling-toggle')).toBeInTheDocument();
      expect(screen.getByTestId('status-text')).toBeInTheDocument();
    });
  });
}); 