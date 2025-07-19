import { describe, it, expect, vi } from 'vitest';
import { render, act } from '@testing-library/react';
import { StatusPanelContainer } from './StatusPanelContainer';
import { GameProvider } from '../../context/GameContext';
import { useGameContext } from '../../context/gameHooks';
import { gameActions } from '../../context/gameActions';
import { TimeOfDay, WeatherCondition } from '../../types';

// Test wrapper that provides GameContext
function TestWrapper({ children }: { children: React.ReactNode }) {
  return <GameProvider>{children}</GameProvider>;
}

// Helper component to test with different states
function StatusPanelWithActions() {
  const { dispatch } = useGameContext();
  
  return (
    <div>
      <StatusPanelContainer />
      <button 
        data-testid="set-night"
        onClick={() => dispatch(gameActions.setTime(TimeOfDay.Night))}
      >
        Set Night
      </button>
      <button 
        data-testid="set-rainy"
        onClick={() => dispatch(gameActions.setWeather(WeatherCondition.Rainy))}
      >
        Set Rainy
      </button>
    </div>
  );
}

describe('StatusPanelContainer', () => {
  describe('Component Rendering', () => {
    it('should render status panel container', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <StatusPanelContainer />
        </TestWrapper>
      );

      expect(getByTestId('status-panel')).toBeInTheDocument();
    });

    it('should render status text element', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <StatusPanelContainer />
        </TestWrapper>
      );

      expect(getByTestId('status-text')).toBeInTheDocument();
    });

    it('should have correct CSS classes for styling', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <StatusPanelContainer />
        </TestWrapper>
      );

      const panel = getByTestId('status-panel');
      expect(panel).toHaveClass('bg-gray-800', 'bg-opacity-90', 'text-white', 'p-4', 'rounded-lg', 'shadow-lg');
    });
  });

  describe('State Consumption', () => {
    it('should display default game state correctly', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <StatusPanelContainer />
        </TestWrapper>
      );

      const statusText = getByTestId('status-text');
      expect(statusText).toHaveTextContent('Time: Day | Weather: Clear');
    });

    it('should update when game time changes', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <StatusPanelWithActions />
        </TestWrapper>
      );

      const statusText = getByTestId('status-text');
      const nightButton = getByTestId('set-night');

      // Initial state
      expect(statusText).toHaveTextContent('Time: Day | Weather: Clear');

      // Change to night
      act(() => {
        nightButton.click();
      });

      expect(statusText).toHaveTextContent('Time: Night | Weather: Clear');
    });

    it('should update when weather changes', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <StatusPanelWithActions />
        </TestWrapper>
      );

      const statusText = getByTestId('status-text');
      const rainyButton = getByTestId('set-rainy');

      // Initial state
      expect(statusText).toHaveTextContent('Time: Day | Weather: Clear');

      // Change to rainy
      act(() => {
        rainyButton.click();
      });

      expect(statusText).toHaveTextContent('Time: Day | Weather: Rainy');
    });

    it('should update when both time and weather change', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <StatusPanelWithActions />
        </TestWrapper>
      );

      const statusText = getByTestId('status-text');
      const nightButton = getByTestId('set-night');
      const rainyButton = getByTestId('set-rainy');

      // Change both
      act(() => {
        nightButton.click();
        rainyButton.click();
      });

      expect(statusText).toHaveTextContent('Time: Night | Weather: Rainy');
    });
  });

  describe('Text Formatting', () => {
    it('should capitalize time and weather values', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <StatusPanelContainer />
        </TestWrapper>
      );

      const statusText = getByTestId('status-text');
      const textContent = statusText.textContent || '';
      
      // Check that first letters are capitalized
      expect(textContent).toMatch(/Time: [A-Z]/);
      expect(textContent).toMatch(/Weather: [A-Z]/);
    });

    it('should use pipe separator format', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <StatusPanelContainer />
        </TestWrapper>
      );

      const statusText = getByTestId('status-text');
      expect(statusText).toHaveTextContent(/Time: .+ \| Weather: .+/);
    });
  });

  describe('Error Handling', () => {
    it('should throw error when used outside GameProvider', () => {
      // Suppress console.error for this test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      expect(() => {
        render(<StatusPanelContainer />);
      }).toThrow('useGameContext must be used within a GameProvider');
      
      consoleSpy.mockRestore();
    });
  });
}); 