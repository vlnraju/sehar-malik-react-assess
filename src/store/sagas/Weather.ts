import { takeEvery, call, put, cancel, all } from 'redux-saga/effects';

import API from '../api';
import { actions, WeatherAction } from '../actions';

function* watchWeatherIdReceived({ payload: { id } }: WeatherAction) {
  const { error, data } = yield call(API.findWeatherbyId, id);
  if (error) {
    yield put({ type: actions.API_ERROR, code: error.code });
    yield cancel();
    return;
  }
  yield put(<WeatherAction>{
    type: actions.WEATHER_DATA_RECEIVED,
    payload: { data },
  });
}

function* watchFetchWeather({
  payload: { latitude, longitude },
}: WeatherAction) {
  const { error, data } = yield call(
    API.findLocationByLatLng,
    latitude,
    longitude
  );
  if (error) {
    console.log({ error });
    yield put({ type: actions.API_ERROR, code: error.code });
    yield cancel();
    return;
  }
  const location = data[0] ? data[0].woeid : false;
  if (!location) {
    yield put({ type: actions.API_ERROR });
    yield cancel();
    return;
  }
  yield put(<WeatherAction>{
    type: actions.WEATHER_ID_RECEIVED,
    payload: { id: location },
  });
}

function* watchAppLoad() {
  yield all([
    takeEvery(actions.FETCH_WEATHER, watchFetchWeather),
    takeEvery(actions.WEATHER_ID_RECEIVED, watchWeatherIdReceived),
  ]);
}

export default [watchAppLoad];
