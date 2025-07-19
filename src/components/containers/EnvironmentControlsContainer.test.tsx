import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { EnvironmentControlsContainer } from './EnvironmentControlsContainer';
import { GameProvider } from '../../context/GameContext';

describe('EnvironmentControlsContainer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const renderWithProvider = () => {
    return render(
      <GameProvider>
        <EnvironmentControlsContainer />
      </GameProvider>
    );
  };

  describe('initial rendering', () => {
    it('should render environment controls container', () => {
      renderWithProvider();
      
      expect(screen.getByTestId('environment-controls')).toBeInTheDocument();
    });

    it('should display cycling status', () => {
      renderWithProvider();
      
      expect(screen.getByTestId('controls-cycling-status')).toBeInTheDocument();
    });

    it('should display current intervals', () => {
      renderWithProvider();
      
      expect(screen.getByTestId('time-interval-display')).toBeInTheDocument();
      expect(screen.getByTestId('weather-interval-display')).toBeInTheDocument();
    });
  });

  describe('component structure', () => {
    it('should render all required elements', () => {
      renderWithProvider();
      
      expect(screen.getByTestId('environment-controls')).toBeInTheDocument();
      expect(screen.getByTestId('controls-cycling-status')).toBeInTheDocument();
      expect(screen.getByTestId('time-interval-display')).toBeInTheDocument();
      expect(screen.getByTestId('weather-interval-display')).toBeInTheDocument();
      expect(screen.getByTestId('controls-cycling-toggle')).toBeInTheDocument();
      expect(screen.getByTestId('manual-cycle-time')).toBeInTheDocument();
      expect(screen.getByTestId('cycle-time-btn')).toBeInTheDocument();
      expect(screen.getByTestId('cycle-weather-btn')).toBeInTheDocument();
      expect(screen.getByTestId('preset-fast')).toBeInTheDocument();
      expect(screen.getByTestId('preset-normal')).toBeInTheDocument();
      expect(screen.getByTestId('preset-slow')).toBeInTheDocument();
    });

    it('should have proper CSS classes for styling', () => {
      renderWithProvider();
      
      const container = screen.getByTestId('environment-controls');
      expect(container).toHaveClass('bg-gray-700', 'bg-opacity-90', 'text-white', 'p-4', 'rounded-lg', 'shadow-lg');
    });
  });

  describe('cycling controls', () => {
    it('should have cycling toggle button', () => {
      renderWithProvider();
      
      const toggleButton = screen.getByTestId('controls-cycling-toggle');
      expect(toggleButton).toBeInTheDocument();
      expect(toggleButton.tagName).toBe('BUTTON');
    });

    it('should have manual cycle time button', () => {
      renderWithProvider();
      
      const cycleTimeButton = screen.getByTestId('manual-cycle-time');
      expect(cycleTimeButton).toBeInTheDocument();
      expect(cycleTimeButton.tagName).toBe('BUTTON');
    });
  });

  describe('manual override controls', () => {
    it('should have toggle time button', () => {
      renderWithProvider();
      
      const toggleTimeButton = screen.getByTestId('cycle-time-btn');
      expect(toggleTimeButton).toBeInTheDocument();
      expect(toggleTimeButton.tagName).toBe('BUTTON');
    });

    it('should have toggle weather button', () => {
      renderWithProvider();
      
      const toggleWeatherButton = screen.getByTestId('cycle-weather-btn');
      expect(toggleWeatherButton).toBeInTheDocument();
      expect(toggleWeatherButton.tagName).toBe('BUTTON');
    });
  });

  describe('configuration panel', () => {
    it('should have config toggle button', () => {
      renderWithProvider();
      
      const configToggle = screen.getByTestId('config-toggle');
      expect(configToggle).toBeInTheDocument();
      expect(configToggle.tagName).toBe('BUTTON');
    });

    it('should show config panel when toggle is clicked', () => {
      renderWithProvider();
      
      const configToggle = screen.getByTestId('config-toggle');
      fireEvent.click(configToggle);
      
      expect(screen.getByTestId('apply-config')).toBeInTheDocument();
      expect(screen.getByTestId('reset-config')).toBeInTheDocument();
    });
  });

  describe('quick presets', () => {
    it('should have fast preset button', () => {
      renderWithProvider();
      
      const fastPreset = screen.getByTestId('preset-fast');
      expect(fastPreset).toBeInTheDocument();
      expect(fastPreset.tagName).toBe('BUTTON');
    });

    it('should have normal preset button', () => {
      renderWithProvider();
      
      const normalPreset = screen.getByTestId('preset-normal');
      expect(normalPreset).toBeInTheDocument();
      expect(normalPreset.tagName).toBe('BUTTON');
    });

    it('should have slow preset button', () => {
      renderWithProvider();
      
      const slowPreset = screen.getByTestId('preset-slow');
      expect(slowPreset).toBeInTheDocument();
      expect(slowPreset.tagName).toBe('BUTTON');
    });
  });

  describe('accessibility', () => {
    it('should have proper button elements', () => {
      renderWithProvider();
      
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
      
      buttons.forEach(button => {
        expect(button.tagName).toBe('BUTTON');
      });
    });

    it('should have proper form controls when config is shown', () => {
      renderWithProvider();
      
      const configToggle = screen.getByTestId('config-toggle');
      fireEvent.click(configToggle);
      
      const sliders = screen.getAllByRole('slider');
      expect(sliders.length).toBe(2);
    });
  });

  describe('text content', () => {
    it('should display cycling status text', () => {
      renderWithProvider();
      
      const statusElement = screen.getByTestId('controls-cycling-status');
      expect(statusElement.textContent).toBeTruthy();
    });

    it('should display interval information', () => {
      renderWithProvider();
      
      const timeInterval = screen.getByTestId('time-interval-display');
      const weatherInterval = screen.getByTestId('weather-interval-display');
      
      expect(timeInterval.textContent).toBeTruthy();
      expect(weatherInterval.textContent).toBeTruthy();
    });

    it('should display preset button text', () => {
      renderWithProvider();
      
      const fastPreset = screen.getByTestId('preset-fast');
      const normalPreset = screen.getByTestId('preset-normal');
      const slowPreset = screen.getByTestId('preset-slow');
      
      expect(fastPreset.textContent).toContain('Fast');
      expect(normalPreset.textContent).toContain('Normal');
      expect(slowPreset.textContent).toContain('Slow');
    });
  });
}); 