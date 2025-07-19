import { TimeOfDay, WeatherCondition } from '../types';

export interface EnvironmentCyclingConfig {
  timeInterval: number; // milliseconds
  weatherInterval: number; // milliseconds
}

export interface EnvironmentCyclingState {
  isActive: boolean;
  lastUpdate: number;
  timeInterval: number;
  weatherInterval: number;
}

export type EnvironmentChangeCallback = (time: TimeOfDay, weather: WeatherCondition) => void;

export class EnvironmentService {
  private timeTimer: number | null = null;
  private weatherTimer: number | null = null;
  private config: EnvironmentCyclingConfig;
  private onChangeCallback: EnvironmentChangeCallback | null = null;
  private currentTime: TimeOfDay = TimeOfDay.Day;
  private currentWeather: WeatherCondition = WeatherCondition.Clear;

  constructor(config: EnvironmentCyclingConfig = { timeInterval: 30000, weatherInterval: 30000 }) {
    this.config = config;
  }

  /**
   * Start environment cycling
   */
  startCycling(onChange: EnvironmentChangeCallback): void {
    if (this.timeTimer || this.weatherTimer) {
      this.stopCycling();
    }

    this.onChangeCallback = onChange;

    // Start time cycling
    this.timeTimer = setInterval(() => {
      this.cycleTime();
    }, this.config.timeInterval);

    // Start weather cycling with offset to avoid simultaneous changes
    this.weatherTimer = setInterval(() => {
      this.cycleWeather();
    }, this.config.weatherInterval);

    // Trigger initial callback
    this.onChangeCallback(this.currentTime, this.currentWeather);
  }

  /**
   * Stop environment cycling
   */
  stopCycling(): void {
    if (this.timeTimer) {
      clearInterval(this.timeTimer);
      this.timeTimer = null;
    }

    if (this.weatherTimer) {
      clearInterval(this.weatherTimer);
      this.weatherTimer = null;
    }

    this.onChangeCallback = null;
  }

  /**
   * Update cycling configuration
   */
  updateConfig(config: Partial<EnvironmentCyclingConfig>): void {
    const wasActive = this.isActive();
    const currentCallback = this.onChangeCallback;
    
    if (wasActive) {
      this.stopCycling();
    }

    this.config = { ...this.config, ...config };

    if (wasActive && currentCallback) {
      this.startCycling(currentCallback);
    }
  }

  /**
   * Check if cycling is currently active
   */
  isActive(): boolean {
    return this.timeTimer !== null || this.weatherTimer !== null;
  }

  /**
   * Get current environment state
   */
  getCurrentEnvironment(): { time: TimeOfDay; weather: WeatherCondition } {
    return {
      time: this.currentTime,
      weather: this.currentWeather
    };
  }

  /**
   * Set current environment state
   */
  setCurrentEnvironment(time: TimeOfDay, weather: WeatherCondition): void {
    this.currentTime = time;
    this.currentWeather = weather;
    
    if (this.onChangeCallback) {
      this.onChangeCallback(this.currentTime, this.currentWeather);
    }
  }

  /**
   * Cycle time between day and night
   */
  private cycleTime(): void {
    this.currentTime = this.currentTime === TimeOfDay.Day ? TimeOfDay.Night : TimeOfDay.Day;
    
    if (this.onChangeCallback) {
      this.onChangeCallback(this.currentTime, this.currentWeather);
    }
  }

  /**
   * Cycle weather between clear and rainy
   */
  private cycleWeather(): void {
    this.currentWeather = this.currentWeather === WeatherCondition.Clear ? WeatherCondition.Rainy : WeatherCondition.Clear;
    
    if (this.onChangeCallback) {
      this.onChangeCallback(this.currentTime, this.currentWeather);
    }
  }

  /**
   * Cleanup resources
   */
  destroy(): void {
    this.stopCycling();
  }
} 