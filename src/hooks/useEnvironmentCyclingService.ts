import { useEffect, useRef, useCallback } from 'react';
import { EnvironmentService } from '../services/EnvironmentService';
import { useGameContext } from '../context/gameHooks';
import { TimeOfDay, WeatherCondition } from '../types';

export function useEnvironmentCyclingService() {
  const { state, dispatch } = useGameContext();
  const serviceRef = useRef<EnvironmentService | null>(null);

  // Initialize service
  useEffect(() => {
    if (!serviceRef.current) {
      serviceRef.current = new EnvironmentService({
        timeInterval: state.environmentCycling.timeInterval,
        weatherInterval: state.environmentCycling.weatherInterval
      });
    }

    return () => {
      if (serviceRef.current) {
        serviceRef.current.destroy();
        serviceRef.current = null;
      }
    };
  }, [state.environmentCycling.timeInterval, state.environmentCycling.weatherInterval]);

  // Handle environment changes from service
  const handleEnvironmentChange = useCallback((time: TimeOfDay, weather: WeatherCondition) => {
    dispatch({ type: 'SET_TIME', payload: time });
    dispatch({ type: 'SET_WEATHER', payload: weather });
  }, [dispatch]);

  // Start cycling
  const startCycling = useCallback(() => {
    if (serviceRef.current && !state.environmentCycling.isActive) {
      serviceRef.current.startCycling(handleEnvironmentChange);
      dispatch({ type: 'TOGGLE_ENVIRONMENT_CYCLING', payload: true });
    }
  }, [state.environmentCycling.isActive, handleEnvironmentChange, dispatch]);

  // Stop cycling
  const stopCycling = useCallback(() => {
    if (serviceRef.current && state.environmentCycling.isActive) {
      serviceRef.current.stopCycling();
      dispatch({ type: 'TOGGLE_ENVIRONMENT_CYCLING', payload: false });
    }
  }, [state.environmentCycling.isActive, dispatch]);

  // Update intervals
  const updateIntervals = useCallback((timeInterval?: number, weatherInterval?: number) => {
    if (serviceRef.current) {
      serviceRef.current.updateConfig({ timeInterval, weatherInterval });
      dispatch({ 
        type: 'SET_ENVIRONMENT_INTERVALS', 
        payload: { timeInterval, weatherInterval } 
      });
    }
  }, [dispatch]);

  // Manual cycle time
  const cycleTime = useCallback(() => {
    dispatch({ type: 'CYCLE_TIME' });
  }, [dispatch]);

  // Manual cycle weather
  const cycleWeather = useCallback(() => {
    dispatch({ type: 'CYCLE_WEATHER' });
  }, [dispatch]);

  // Auto-start cycling if enabled in state
  useEffect(() => {
    if (state.environmentCycling.isActive && serviceRef.current) {
      serviceRef.current.startCycling(handleEnvironmentChange);
    } else if (!state.environmentCycling.isActive && serviceRef.current) {
      serviceRef.current.stopCycling();
    }
  }, [state.environmentCycling.isActive, handleEnvironmentChange]);

  // Update service config when intervals change
  useEffect(() => {
    if (serviceRef.current) {
      serviceRef.current.updateConfig({
        timeInterval: state.environmentCycling.timeInterval,
        weatherInterval: state.environmentCycling.weatherInterval
      });
    }
  }, [state.environmentCycling.timeInterval, state.environmentCycling.weatherInterval]);

  return {
    isActive: state.environmentCycling.isActive,
    startCycling,
    stopCycling,
    updateIntervals,
    cycleTime,
    cycleWeather,
    timeInterval: state.environmentCycling.timeInterval,
    weatherInterval: state.environmentCycling.weatherInterval
  };
} 