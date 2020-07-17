import {
  createStore,
  applyMiddleware,
  combineReducers,
  ReducersMapObject,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import sagas from './sagas';
import { weatherReducer, WeatherState } from './reducers/Weather';
import { droneReducer, DroneState } from './reducers/Drone';

export type Store = {
  weather: WeatherState;
  drone: DroneState;
};

export default () => {
  const rootReducer = combineReducers(<ReducersMapObject<Store>>{
    weather: weatherReducer,
    drone: droneReducer,
  });

  const composeEnhancers = composeWithDevTools({});
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = applyMiddleware(sagaMiddleware);
  const store = createStore(rootReducer, composeEnhancers(middlewares));

  sagas.forEach(sagaMiddleware.run);

  return store;
};
