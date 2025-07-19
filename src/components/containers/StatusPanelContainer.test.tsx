import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatusPanelContainer } from './StatusPanelContainer';
import { GameProvider } from '../../context/GameContext';

describe('StatusPanelContainer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const renderWithProvider = () => {
    return render(
      <GameProvider>
        <StatusPanelContainer />
      </GameProvider>
    );
  };

  describe('initial rendering', () => {
    it('should display initial environment state', () => {
      renderWithProvider();
      
      expect(screen.getByTestId('status-text')).toHaveTextContent('Time: Day | Weather: Clear');
      expect(screen.getByTestId('environment-icon')).toHaveTextContent('☀️');
    });

    it('should display cycling controls', () => {
      renderWithProvider();
      
      expect(screen.getByTestId('status-cycling-toggle')).toBeInTheDocument();
      expect(screen.getByTestId('status-cycling-status')).toBeInTheDocument();
    });
  });

  describe('environment icons', () => {
    it('should display sun icon for day and clear weather', () => {
      renderWithProvider();
      
      expect(screen.getByTestId('environment-icon')).toHaveTextContent('☀️');
    });
  });

  describe('accessibility', () => {
    it('should have proper ARIA labels', () => {
      renderWithProvider();
      
      const icon = screen.getByTestId('environment-icon');
      expect(icon).toHaveAttribute('role', 'img');
      expect(icon).toHaveAttribute('aria-label', 'day clear');
      
      const toggleButton = screen.getByTestId('status-cycling-toggle');
      expect(toggleButton).toHaveAttribute('aria-label');
    });

    it('should have proper live region attributes', () => {
      renderWithProvider();
      
      const statusPanel = screen.getByTestId('status-panel');
      expect(statusPanel).toHaveAttribute('role', 'status');
      expect(statusPanel).toHaveAttribute('aria-live', 'polite');
    });
  });

  describe('cycling controls', () => {
    it('should have cycling toggle button', () => {
      renderWithProvider();
      
      const toggleButton = screen.getByTestId('status-cycling-toggle');
      expect(toggleButton).toBeInTheDocument();
      expect(toggleButton.tagName).toBe('BUTTON');
    });

    it('should have cycling status indicator', () => {
      renderWithProvider();
      
      const statusIndicator = screen.getByTestId('status-cycling-status');
      expect(statusIndicator).toBeInTheDocument();
    });
  });

  describe('component structure', () => {
    it('should render all required elements', () => {
      renderWithProvider();
      
      expect(screen.getByTestId('status-panel')).toBeInTheDocument();
      expect(screen.getByTestId('status-text')).toBeInTheDocument();
      expect(screen.getByTestId('environment-icon')).toBeInTheDocument();
      expect(screen.getByTestId('status-cycling-toggle')).toBeInTheDocument();
      expect(screen.getByTestId('status-cycling-status')).toBeInTheDocument();
    });

    it('should have proper CSS classes for styling', () => {
      renderWithProvider();
      
      const panel = screen.getByTestId('status-panel');
      expect(panel).toHaveClass('bg-gray-800', 'bg-opacity-90', 'text-white', 'p-4', 'rounded-lg', 'shadow-lg');
    });

    it('should have transition classes', () => {
      renderWithProvider();
      
      const panel = screen.getByTestId('status-panel');
      expect(panel).toHaveClass('transition-all', 'duration-500');
    });
  });

  describe('text formatting', () => {
    it('should capitalize time and weather values', () => {
      renderWithProvider();
      
      const statusText = screen.getByTestId('status-text');
      const textContent = statusText.textContent || '';
      
      // Check that first letters are capitalized
      expect(textContent).toMatch(/Time: [A-Z]/);
      expect(textContent).toMatch(/Weather: [A-Z]/);
    });

    it('should use pipe separator format', () => {
      renderWithProvider();
      
      const statusText = screen.getByTestId('status-text');
      expect(statusText).toHaveTextContent(/Time: .+ \| Weather: .+/);
    });
  });
}); 