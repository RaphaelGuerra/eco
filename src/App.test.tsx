import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Integration Tests', () => {
  describe('Component Integration', () => {
    it('should render the complete application hierarchy', () => {
      const { getByTestId } = render(<App />);

      // App container
      expect(getByTestId('app-container')).toBeInTheDocument();
      
      // ExplorationViewContainer
      expect(getByTestId('exploration-view')).toBeInTheDocument();
      
      // StatusPanelContainer within ExplorationView
      expect(getByTestId('status-panel')).toBeInTheDocument();
      expect(getByTestId('status-text')).toBeInTheDocument();
      
      // Explore Biome Button
      expect(getByTestId('explore-biome-button')).toBeInTheDocument();
    });

    it('should provide GameContext to all child components', () => {
      const { getByTestId } = render(<App />);

      // StatusPanelContainer should display default game state
      const statusText = getByTestId('status-text');
      expect(statusText).toHaveTextContent('Time: Day | Weather: Clear');
    });

    it('should have proper visual layout structure', () => {
      const { getByTestId } = render(<App />);

      const appContainer = getByTestId('app-container');
      expect(appContainer).toHaveClass('App');

      const explorationView = getByTestId('exploration-view');
      expect(explorationView).toHaveClass('min-h-screen', 'w-full', 'flex', 'flex-col');
    });
  });

  describe('Full Application Functionality', () => {
    it('should render background image for current location', () => {
      const { getByTestId } = render(<App />);

      const explorationView = getByTestId('exploration-view');
      expect(explorationView).toHaveStyle({ 
        backgroundImage: expect.stringContaining('data:image/svg+xml') 
      });
    });

    it('should display main UI elements with proper text content', () => {
      const { getByText, getByTestId } = render(<App />);

      // Main title and description
      expect(getByText('Explore the Forest')).toBeInTheDocument();
      expect(getByText('Discover the wonders of nature in this pristine biome')).toBeInTheDocument();

      // Status display
      const statusText = getByTestId('status-text');
      expect(statusText).toHaveTextContent('Time: Day | Weather: Clear');

      // Action button
      expect(getByText('Explore Biome')).toBeInTheDocument();
    });

    it('should handle Explore Biome button interaction', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      const { getByTestId } = render(<App />);

      const exploreButton = getByTestId('explore-biome-button');
      fireEvent.click(exploreButton);

      expect(consoleSpy).toHaveBeenCalledWith('Explore Biome clicked - to be implemented in future stories');
      consoleSpy.mockRestore();
    });
  });

  describe('Responsive Design', () => {
    it('should have responsive classes for different screen sizes', () => {
      const { getByText } = render(<App />);

      // Check responsive text sizing
      const title = getByText('Explore the Forest');
      expect(title).toHaveClass('text-2xl', 'sm:text-3xl', 'lg:text-4xl');

      const description = getByText('Discover the wonders of nature in this pristine biome');
      expect(description).toHaveClass('text-lg', 'sm:text-xl');
    });

    it('should have responsive layout structure', () => {
      const { container } = render(<App />);

      // Check for responsive padding classes
      const responsiveElements = container.querySelectorAll('.p-4.sm\\:p-6');
      expect(responsiveElements.length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility', () => {
    it('should have proper semantic HTML structure', () => {
      const { getByRole, getByTestId } = render(<App />);

      // Main heading
      const heading = getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('Explore the Forest');

      // Interactive button
      const button = getByTestId('explore-biome-button');
      expect(button.tagName).toBe('BUTTON');
    });

    it('should have proper test ids for testing', () => {
      const { getByTestId } = render(<App />);

      expect(getByTestId('app-container')).toBeInTheDocument();
      expect(getByTestId('exploration-view')).toBeInTheDocument();
      expect(getByTestId('status-panel')).toBeInTheDocument();
      expect(getByTestId('status-text')).toBeInTheDocument();
      expect(getByTestId('explore-biome-button')).toBeInTheDocument();
    });
  });

  describe('CSS and Styling', () => {
    it('should apply Tailwind CSS classes correctly', () => {
      const { getByTestId } = render(<App />);

      const statusPanel = getByTestId('status-panel');
      expect(statusPanel).toHaveClass('bg-gray-800', 'text-white', 'p-4', 'rounded-lg');

      const exploreButton = getByTestId('explore-biome-button');
      expect(exploreButton).toHaveClass('bg-green-600', 'text-white', 'py-3', 'px-8');
    });

    it('should have proper background styling', () => {
      const { getByTestId } = render(<App />);

      const explorationView = getByTestId('exploration-view');
      expect(explorationView).toHaveClass('bg-cover', 'bg-center', 'bg-no-repeat');
    });
  });

  describe('Error Handling', () => {
    it('should not crash when rendering', () => {
      expect(() => {
        render(<App />);
      }).not.toThrow();
    });
  });
}); 