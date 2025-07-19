import { useGameContext } from '../../context/gameHooks';
import { useEnvironmentCyclingService } from '../../hooks/useEnvironmentCyclingService';
import { TimeOfDay, WeatherCondition } from '../../types';
import { useState, useEffect } from 'react';

// Utility function for formatting status text
function formatStatusText(gameTime: TimeOfDay, weather: WeatherCondition): string {
  const timeText = gameTime.charAt(0).toUpperCase() + gameTime.slice(1);
  const weatherText = weather.charAt(0).toUpperCase() + weather.slice(1);
  return `Time: ${timeText} | Weather: ${weatherText}`;
}

// Utility function for getting environment icon
function getEnvironmentIcon(gameTime: TimeOfDay, weather: WeatherCondition): string {
  if (gameTime === TimeOfDay.Day) {
    return weather === WeatherCondition.Clear ? '☀️' : '🌦️';
  } else {
    return weather === WeatherCondition.Clear ? '🌙' : '🌧️';
  }
}

export function StatusPanelContainer() {
  const { state } = useGameContext();
  const { isActive, startCycling, stopCycling } = useEnvironmentCyclingService();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  // Handle environment changes with transition animation
  useEffect(() => {
    const currentUpdate = state.environmentCycling.lastUpdate;
    if (currentUpdate !== lastUpdate) {
      setIsTransitioning(true);
      setLastUpdate(currentUpdate);
      
      // Remove transition class after animation completes
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 500); // 500ms transition duration
      
      return () => clearTimeout(timer);
    }
  }, [state.environmentCycling.lastUpdate, lastUpdate]);

  const statusText = formatStatusText(state.gameTime, state.weather);
  const environmentIcon = getEnvironmentIcon(state.gameTime, state.weather);

  return (
    <div 
      className={`bg-gray-800 bg-opacity-90 text-white p-4 rounded-lg shadow-lg transition-all duration-500 ${
        isTransitioning ? 'scale-105 shadow-xl' : ''
      }`}
      data-testid="status-panel"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center justify-center space-x-3">
        <span 
          className={`text-2xl transition-transform duration-500 ${
            isTransitioning ? 'animate-pulse' : ''
          }`}
          data-testid="environment-icon"
          role="img"
          aria-label={`${state.gameTime} ${state.weather}`}
        >
          {environmentIcon}
        </span>
        <span 
          className={`text-sm font-medium transition-opacity duration-500 ${
            isTransitioning ? 'opacity-75' : 'opacity-100'
          }`}
          data-testid="status-text"
        >
          {statusText}
        </span>
        <div className="flex items-center space-x-2">
          <button
            onClick={isActive ? stopCycling : startCycling}
            className={`px-2 py-1 text-xs rounded transition-colors duration-200 ${
              isActive 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-green-600 hover:bg-green-700'
            }`}
            data-testid="status-cycling-toggle"
            aria-label={isActive ? 'Stop environment cycling' : 'Start environment cycling'}
          >
            {isActive ? '⏸️' : '▶️'}
          </button>
          <span 
            className={`text-xs ${isActive ? 'text-green-400' : 'text-gray-400'}`}
            data-testid="status-cycling-status"
          >
            {isActive ? 'Active' : 'Paused'}
          </span>
        </div>
      </div>
    </div>
  );
} 