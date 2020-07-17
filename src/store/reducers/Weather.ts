import { actions, WeatherAction } from '../actions';
import { toF } from '../../utilities';

export interface WeatherState {
  loading: boolean;
  weatherId: string | null;
  weather_state_name: string;
  name: string;
  temperatureinCelsius: number;
  temperatureinFahrenheit: number;
  latitude: number;
  longitude: number;
  data: any;
}

export type WeatherReducer = (
  state: WeatherState,
  action: WeatherAction
) => WeatherState;

const initialState: WeatherState = {
  loading: false,
  weatherId: null,
  name: '',
  temperatureinCelsius: 0,
  temperatureinFahrenheit: 0,
  weather_state_name: '',
  latitude: 0,
  longitude: 0,
  data: {},
};

const startLoading: WeatherReducer = state => {
  return { ...state, loading: true };
};

const weatherIDReceived: WeatherReducer = (state, { payload: { id } }) => {
  return { ...state, weatherId: id };
};

const weatherDataRecevied: WeatherReducer = (state, { payload: { data } }) => {
  if (!data['consolidated_weather']) return state;
  const weather = data.consolidated_weather[0];
  const { weather_state_name, the_temp } = weather;
  const { latt_long, title: name } = data;
  const [latitude, longitude] = latt_long.split(',');

  return {
    ...state,
    latitude,
    longitude,
    weather_state_name,
    name,
    data,
    loading: false,
    temperatureinCelsius: the_temp,
    temperatureinFahrenheit: toF(the_temp),
  };
};

const handlers = {
  [actions.FETCH_WEATHER]: startLoading,
  [actions.WEATHER_ID_RECEIVED]: weatherIDReceived,
  [actions.WEATHER_DATA_RECEIVED]: weatherDataRecevied,
};

export const weatherReducer: WeatherReducer = (
  state = initialState,
  action
) => {
  const handler = handlers[action.type as keyof typeof handlers];
  if (!handler) return state;
  return handler(state, action);
};

export default weatherReducer;
