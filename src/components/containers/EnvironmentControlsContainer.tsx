import { useState } from 'react';
import { useEnvironmentCyclingService } from '../../hooks/useEnvironmentCyclingService';

export function EnvironmentControlsContainer() {
  const {
    isActive,
    startCycling,
    stopCycling,
    updateIntervals,
    cycleTime,
    cycleWeather,
    timeInterval,
    weatherInterval
  } = useEnvironmentCyclingService();

  const [showConfig, setShowConfig] = useState(false);
  const [tempTimeInterval, setTempTimeInterval] = useState(timeInterval);
  const [tempWeatherInterval, setTempWeatherInterval] = useState(weatherInterval);

  const handleApplyConfig = () => {
    updateIntervals(tempTimeInterval, tempWeatherInterval);
    setShowConfig(false);
  };

  const handleResetConfig = () => {
    setTempTimeInterval(30000);
    setTempWeatherInterval(30000);
  };

  const formatInterval = (ms: number) => `${ms / 1000}s`;

  return (
    <div 
      className="bg-gray-700 bg-opacity-90 text-white p-4 rounded-lg shadow-lg"
      data-testid="environment-controls"
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Environment Controls</h3>
          <button
            onClick={() => setShowConfig(!showConfig)}
            className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 rounded transition-colors"
            data-testid="config-toggle"
          >
            {showConfig ? 'Hide Config' : 'Show Config'}
          </button>
        </div>

        {/* Cycling Status */}
        <div className="flex items-center justify-between p-3 bg-gray-600 rounded">
          <span className="text-sm font-medium">Cycling Status:</span>
          <span 
            className={`text-sm font-bold ${
              isActive ? 'text-green-400' : 'text-red-400'
            }`}
            data-testid="controls-cycling-status"
          >
            {isActive ? '🔄 Active' : '⏸️ Paused'}
          </span>
        </div>

        {/* Current Intervals */}
        <div className="grid grid-cols-2 gap-4 p-3 bg-gray-600 rounded">
          <div>
            <span className="text-xs text-gray-300">Time Interval:</span>
            <div className="text-sm font-medium" data-testid="time-interval-display">
              {formatInterval(timeInterval)}
            </div>
          </div>
          <div>
            <span className="text-xs text-gray-300">Weather Interval:</span>
            <div className="text-sm font-medium" data-testid="weather-interval-display">
              {formatInterval(weatherInterval)}
            </div>
          </div>
        </div>

        {/* Configuration Panel */}
        {showConfig && (
          <div className="space-y-4 p-4 bg-gray-600 rounded" data-testid="config-panel">
            <h4 className="text-md font-semibold">Configuration</h4>
            
            {/* Time Interval Config */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Time Interval (seconds):
              </label>
              <input
                type="range"
                min="5"
                max="120"
                value={tempTimeInterval / 1000}
                onChange={(e) => setTempTimeInterval(parseInt(e.target.value) * 1000)}
                className="w-full"
                data-testid="time-interval-slider"
              />
              <div className="text-sm text-gray-300 mt-1">
                {formatInterval(tempTimeInterval)}
              </div>
            </div>

            {/* Weather Interval Config */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Weather Interval (seconds):
              </label>
              <input
                type="range"
                min="5"
                max="120"
                value={tempWeatherInterval / 1000}
                onChange={(e) => setTempWeatherInterval(parseInt(e.target.value) * 1000)}
                className="w-full"
                data-testid="weather-interval-slider"
              />
              <div className="text-sm text-gray-300 mt-1">
                {formatInterval(tempWeatherInterval)}
              </div>
            </div>

            {/* Config Actions */}
            <div className="flex space-x-2">
              <button
                onClick={handleApplyConfig}
                className="px-3 py-1 text-sm bg-green-600 hover:bg-green-700 rounded transition-colors"
                data-testid="apply-config"
              >
                Apply
              </button>
              <button
                onClick={handleResetConfig}
                className="px-3 py-1 text-sm bg-yellow-600 hover:bg-yellow-700 rounded transition-colors"
                data-testid="reset-config"
              >
                Reset
              </button>
            </div>
          </div>
        )}

        {/* Control Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={isActive ? stopCycling : startCycling}
            className={`px-4 py-2 rounded font-medium transition-colors ${
              isActive 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-green-600 hover:bg-green-700'
            }`}
            data-testid="controls-cycling-toggle"
          >
            {isActive ? '⏸️ Pause Cycling' : '▶️ Start Cycling'}
          </button>
          
          <button
            onClick={cycleTime}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded font-medium transition-colors"
            data-testid="manual-cycle-time"
          >
            🔄 Cycle Time
          </button>
        </div>

        {/* Manual Override */}
        <div className="p-3 bg-gray-600 rounded">
          <h4 className="text-sm font-semibold mb-2">Manual Override</h4>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={cycleTime}
              className="px-3 py-1 text-sm bg-purple-600 hover:bg-purple-700 rounded transition-colors"
              data-testid="cycle-time-btn"
            >
              Toggle Time
            </button>
            <button
              onClick={cycleWeather}
              className="px-3 py-1 text-sm bg-purple-600 hover:bg-purple-700 rounded transition-colors"
              data-testid="cycle-weather-btn"
            >
              Toggle Weather
            </button>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="p-3 bg-gray-600 rounded">
          <h4 className="text-sm font-semibold mb-2">Quick Presets</h4>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => updateIntervals(10000, 10000)}
              className="px-2 py-1 text-xs bg-indigo-600 hover:bg-indigo-700 rounded transition-colors"
              data-testid="preset-fast"
            >
              Fast (10s)
            </button>
            <button
              onClick={() => updateIntervals(30000, 30000)}
              className="px-2 py-1 text-xs bg-indigo-600 hover:bg-indigo-700 rounded transition-colors"
              data-testid="preset-normal"
            >
              Normal (30s)
            </button>
            <button
              onClick={() => updateIntervals(60000, 60000)}
              className="px-2 py-1 text-xs bg-indigo-600 hover:bg-indigo-700 rounded transition-colors"
              data-testid="preset-slow"
            >
              Slow (60s)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 