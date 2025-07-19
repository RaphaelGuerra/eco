import { TimeOfDay, WeatherCondition } from '../types';
import { GameActionType, SetTimeAction, SetWeatherAction } from './gameContextTypes';

// Action creators for convenience
export const gameActions = {
  setTime: (time: TimeOfDay): SetTimeAction => ({
    type: GameActionType.SET_TIME,
    payload: time
  }),
  
  setWeather: (weather: WeatherCondition): SetWeatherAction => ({
    type: GameActionType.SET_WEATHER,
    payload: weather
  })
}; 