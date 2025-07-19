import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { ExplorationViewContainer } from './ExplorationViewContainer';
import { GameProvider } from '../../context/GameContext';

// Test wrapper that provides GameContext
function TestWrapper({ children }: { children: React.ReactNode }) {
  return <GameProvider>{children}</GameProvider>;
}

describe('ExplorationViewContainer', () => {
  describe('Component Rendering', () => {
    it('should render the exploration view container', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <ExplorationViewContainer />
        </TestWrapper>
      );

      expect(getByTestId('exploration-view')).toBeInTheDocument();
    });

    it('should have proper CSS classes for full-screen layout', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <ExplorationViewContainer />
        </TestWrapper>
      );

      const container = getByTestId('exploration-view');
      expect(container).toHaveClass(
        'relative',
        'min-h-screen',
        'w-full',
        'bg-cover',
        'bg-center',
        'bg-no-repeat',
        'flex',
        'flex-col'
      );
    });

    it('should render background image with inline style', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <ExplorationViewContainer />
        </TestWrapper>
      );

      const container = getByTestId('exploration-view');
      expect(container).toHaveStyle({ backgroundImage: expect.stringContaining('data:image/svg+xml') });
    });

    it('should render main title and description', () => {
      const { getByText } = render(
        <TestWrapper>
          <ExplorationViewContainer />
        </TestWrapper>
      );

      expect(getByText('Explore the Forest')).toBeInTheDocument();
      expect(getByText('Discover the wonders of nature in this pristine biome')).toBeInTheDocument();
    });
  });

  describe('StatusPanelContainer Integration', () => {
    it('should render StatusPanelContainer component', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <ExplorationViewContainer />
        </TestWrapper>
      );

      expect(getByTestId('status-panel')).toBeInTheDocument();
    });

    it('should display status text from GameContext', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <ExplorationViewContainer />
        </TestWrapper>
      );

      const statusText = getByTestId('status-text');
      expect(statusText).toHaveTextContent('Time: Day | Weather: Clear');
    });

    it('should position status panel in header area', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <ExplorationViewContainer />
        </TestWrapper>
      );

      const statusPanel = getByTestId('status-panel');
      const container = statusPanel.closest('.relative.z-10.p-4');
      expect(container).toBeInTheDocument();
    });
  });

  describe('Explore Biome Button', () => {
    it('should render the explore biome button', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <ExplorationViewContainer />
        </TestWrapper>
      );

      const button = getByTestId('explore-biome-button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Explore Biome');
    });

    it('should have proper styling classes', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <ExplorationViewContainer />
        </TestWrapper>
      );

      const button = getByTestId('explore-biome-button');
      expect(button).toHaveClass(
        'bg-green-600',
        'hover:bg-green-700',
        'active:bg-green-800',
        'text-white',
        'font-semibold',
        'py-3',
        'px-8',
        'rounded-lg',
        'shadow-lg',
        'transition-colors',
        'duration-200',
        'text-lg'
      );
    });

    it('should be clickable', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <ExplorationViewContainer />
        </TestWrapper>
      );

      const button = getByTestId('explore-biome-button');
      expect(button).not.toBeDisabled();
    });

    it('should call handler when clicked', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      const { getByTestId } = render(
        <TestWrapper>
          <ExplorationViewContainer />
        </TestWrapper>
      );

      const button = getByTestId('explore-biome-button');
      fireEvent.click(button);

      expect(consoleSpy).toHaveBeenCalledWith('Explore Biome clicked - to be implemented in future stories');
      consoleSpy.mockRestore();
    });
  });

  describe('Responsive Layout', () => {
    it('should have responsive padding classes', () => {
      const { container } = render(
        <TestWrapper>
          <ExplorationViewContainer />
        </TestWrapper>
      );

      // Check for responsive padding classes
      const headerArea = container.querySelector('.p-4.sm\\:p-6');
      expect(headerArea).toBeInTheDocument();
    });

    it('should have responsive text sizing for title', () => {
      const { getByText } = render(
        <TestWrapper>
          <ExplorationViewContainer />
        </TestWrapper>
      );

      const title = getByText('Explore the Forest');
      expect(title).toHaveClass('text-2xl', 'sm:text-3xl', 'lg:text-4xl');
    });

    it('should have responsive text sizing for description', () => {
      const { getByText } = render(
        <TestWrapper>
          <ExplorationViewContainer />
        </TestWrapper>
      );

      const description = getByText('Discover the wonders of nature in this pristine biome');
      expect(description).toHaveClass('text-lg', 'sm:text-xl');
    });
  });

  describe('Layout Structure', () => {
    it('should have proper flex layout structure', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <ExplorationViewContainer />
        </TestWrapper>
      );

      const container = getByTestId('exploration-view');
      expect(container).toHaveClass('flex', 'flex-col');
    });

    it('should have background overlay for text readability', () => {
      const { container } = render(
        <TestWrapper>
          <ExplorationViewContainer />
        </TestWrapper>
      );

      const overlay = container.querySelector('.absolute.inset-0.bg-black.bg-opacity-20');
      expect(overlay).toBeInTheDocument();
    });

    it('should have proper z-index layering', () => {
      const { container } = render(
        <TestWrapper>
          <ExplorationViewContainer />
        </TestWrapper>
      );

      const zIndexElements = container.querySelectorAll('.relative.z-10');
      expect(zIndexElements).toHaveLength(3); // Header, main content, bottom action
    });

    it('should have flexible main content area', () => {
      const { container } = render(
        <TestWrapper>
          <ExplorationViewContainer />
        </TestWrapper>
      );

      const mainContent = container.querySelector('.flex-1.flex.flex-col.justify-center.items-center');
      expect(mainContent).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have semantic button element', () => {
      const { getByTestId } = render(
        <TestWrapper>
          <ExplorationViewContainer />
        </TestWrapper>
      );

      const button = getByTestId('explore-biome-button');
      expect(button.tagName).toBe('BUTTON');
    });

    it('should have proper heading hierarchy', () => {
      const { getByRole } = render(
        <TestWrapper>
          <ExplorationViewContainer />
        </TestWrapper>
      );

      const heading = getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('Explore the Forest');
    });
  });
}); 