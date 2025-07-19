import { useGameContext } from '../../context/gameHooks';
import { TimeOfDay, WeatherCondition } from '../../types';

// Utility function for formatting status text
function formatStatusText(gameTime: TimeOfDay, weather: WeatherCondition): string {
  const timeText = gameTime.charAt(0).toUpperCase() + gameTime.slice(1);
  const weatherText = weather.charAt(0).toUpperCase() + weather.slice(1);
  return `Time: ${timeText} | Weather: ${weatherText}`;
}

export function StatusPanelContainer() {
  const { state } = useGameContext();

  const statusText = formatStatusText(state.gameTime, state.weather);

  return (
    <div 
      className="bg-gray-800 bg-opacity-90 text-white p-4 rounded-lg shadow-lg"
      data-testid="status-panel"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center justify-center">
        <span 
          className="text-sm font-medium"
          data-testid="status-text"
        >
          {statusText}
        </span>
      </div>
    </div>
  );
} 