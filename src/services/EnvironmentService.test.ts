import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { EnvironmentService } from './EnvironmentService';
import { TimeOfDay, WeatherCondition } from '../types';

describe('EnvironmentService', () => {
  let service: EnvironmentService;
  let mockCallback: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    service = new EnvironmentService();
    mockCallback = vi.fn();
    vi.useFakeTimers();
  });

  afterEach(() => {
    service.destroy();
    vi.useRealTimers();
  });

  describe('constructor', () => {
    it('should initialize with default config', () => {
      expect(service.isActive()).toBe(false);
    });

    it('should initialize with custom config', () => {
      const customService = new EnvironmentService({
        timeInterval: 10000,
        weatherInterval: 20000
      });
      expect(customService.isActive()).toBe(false);
      customService.destroy();
    });
  });

  describe('startCycling', () => {
    it('should start cycling and call callback immediately', () => {
      service.startCycling(mockCallback);
      
      expect(service.isActive()).toBe(true);
      expect(mockCallback).toHaveBeenCalledWith(TimeOfDay.Day, WeatherCondition.Clear);
    });

    it('should restart cycling if already active', () => {
      service.startCycling(mockCallback);
      mockCallback.mockClear();
      
      service.startCycling(mockCallback);
      
      expect(service.isActive()).toBe(true);
      expect(mockCallback).toHaveBeenCalledWith(TimeOfDay.Day, WeatherCondition.Clear);
    });
  });

  describe('stopCycling', () => {
    it('should stop cycling', () => {
      service.startCycling(mockCallback);
      expect(service.isActive()).toBe(true);
      
      service.stopCycling();
      expect(service.isActive()).toBe(false);
    });

    it('should not throw if not active', () => {
      expect(() => service.stopCycling()).not.toThrow();
    });
  });

  describe('time cycling', () => {
    it('should cycle time every 30 seconds', () => {
      service.startCycling(mockCallback);
      mockCallback.mockClear();
      
      // Advance time by 30 seconds
      vi.advanceTimersByTime(30000);
      
      expect(mockCallback).toHaveBeenCalledWith(TimeOfDay.Night, WeatherCondition.Clear);
    });

    it('should cycle time back to day after night', () => {
      service.startCycling(mockCallback);
      mockCallback.mockClear();
      
      // Advance to night
      vi.advanceTimersByTime(30000);
      mockCallback.mockClear();
      
      // Advance to day
      vi.advanceTimersByTime(30000);
      
      expect(mockCallback).toHaveBeenCalledWith(TimeOfDay.Day, WeatherCondition.Clear);
    });
  });

  describe('weather cycling', () => {
    it('should cycle weather every 30 seconds', () => {
      service.startCycling(mockCallback);
      mockCallback.mockClear();
      
      // Advance time by 30 seconds
      vi.advanceTimersByTime(30000);
      
      expect(mockCallback).toHaveBeenCalledWith(TimeOfDay.Night, WeatherCondition.Clear);
      
      // Advance another 30 seconds for weather change
      vi.advanceTimersByTime(30000);
      
      expect(mockCallback).toHaveBeenCalledWith(TimeOfDay.Night, WeatherCondition.Rainy);
    });

    it('should cycle weather back to clear after rainy', () => {
      service.startCycling(mockCallback);
      mockCallback.mockClear();
      
      // Advance to rainy weather (60 seconds - both time and weather change)
      vi.advanceTimersByTime(60000);
      mockCallback.mockClear();
      
      // Advance to clear weather (90 seconds total - weather changes back to clear)
      vi.advanceTimersByTime(30000);
      
      expect(mockCallback).toHaveBeenCalledWith(TimeOfDay.Night, WeatherCondition.Clear);
    });
  });

  describe('updateConfig', () => {
    it('should update time interval', () => {
      service.startCycling(mockCallback);
      mockCallback.mockClear();
      
      service.updateConfig({ timeInterval: 10000 });
      
      // Advance by new interval
      vi.advanceTimersByTime(10000);
      
      expect(mockCallback).toHaveBeenCalledWith(TimeOfDay.Night, WeatherCondition.Clear);
    });

    it('should update weather interval', () => {
      service.startCycling(mockCallback);
      mockCallback.mockClear();
      
      service.updateConfig({ weatherInterval: 10000 });
      
      // Advance by new interval
      vi.advanceTimersByTime(10000);
      
      expect(mockCallback).toHaveBeenCalledWith(TimeOfDay.Day, WeatherCondition.Rainy);
    });

    it('should restart cycling with new config', () => {
      service.startCycling(mockCallback);
      mockCallback.mockClear();
      
      service.updateConfig({ timeInterval: 5000, weatherInterval: 5000 });
      
      // Advance by new intervals
      vi.advanceTimersByTime(5000);
      
      expect(mockCallback).toHaveBeenCalledWith(TimeOfDay.Night, WeatherCondition.Clear);
    });
  });

  describe('getCurrentEnvironment', () => {
    it('should return current environment state', () => {
      const env = service.getCurrentEnvironment();
      expect(env).toEqual({ time: TimeOfDay.Day, weather: WeatherCondition.Clear });
    });
  });

  describe('setCurrentEnvironment', () => {
    it('should set current environment and call callback', () => {
      service.startCycling(mockCallback);
      mockCallback.mockClear();
      
      service.setCurrentEnvironment(TimeOfDay.Night, WeatherCondition.Rainy);
      
      expect(mockCallback).toHaveBeenCalledWith(TimeOfDay.Night, WeatherCondition.Rainy);
    });

    it('should not call callback if cycling is not active', () => {
      service.setCurrentEnvironment(TimeOfDay.Night, WeatherCondition.Rainy);
      
      expect(mockCallback).not.toHaveBeenCalled();
    });
  });

  describe('destroy', () => {
    it('should cleanup resources', () => {
      service.startCycling(mockCallback);
      expect(service.isActive()).toBe(true);
      
      service.destroy();
      expect(service.isActive()).toBe(false);
    });
  });

  describe('memory management', () => {
    it('should not leak timers after destroy', () => {
      service.startCycling(mockCallback);
      service.destroy();
      
      // Advance timers - should not trigger callbacks
      vi.advanceTimersByTime(60000);
      
      expect(mockCallback).toHaveBeenCalledTimes(1); // Only initial call
    });
  });
}); 