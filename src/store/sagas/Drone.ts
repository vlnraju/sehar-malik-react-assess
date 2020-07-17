import { takeEvery, call, put, cancel, all } from 'redux-saga/effects';

import API from '../api';
import { actions, WeatherAction, DroneAction } from '../actions';
import { delay } from '../../utilities';

function* incrementLastReceived() {
  yield delay(1000);
  yield put({ type: actions.DRONE_INCREMENT_LAST_RECEIVED });
}

function* initializeLongPolling() {
  yield put({ type: actions.DRONE_INCREMENT_LAST_RECEIVED });
  yield put({ type: actions.FETCH_DRONE });
  yield put({ type: actions.CONTINUE_LONG_POLLING });
}

function* continueLongPolling() {
  yield delay(5000);
  yield put({ type: actions.FETCH_DRONE });
  yield put({ type: actions.CONTINUE_LONG_POLLING });
}

function* watchFetchDrone() {
  const { error, data } = yield call(API.getDroneData);
  if (error) {
    console.log({ error });
    yield put({ type: actions.API_ERROR, code: error.code });
    yield cancel();
    return;
  }

  const [{ latitude, longitude }] = data;

  yield put(<WeatherAction>{
    type: actions.FETCH_WEATHER,
    payload: { latitude, longitude },
  });
  yield put(<DroneAction>{ type: actions.DRONE_DATA_RECEIVED, payload: data });
}

function* watchAppLoad() {
  yield all([
    takeEvery(actions.INITIALIZE_LONG_POLLING, initializeLongPolling),
    takeEvery(actions.CONTINUE_LONG_POLLING, continueLongPolling),
    takeEvery(actions.FETCH_DRONE, watchFetchDrone),
    takeEvery(actions.DRONE_INCREMENT_LAST_RECEIVED, incrementLastReceived),
  ]);
}

export default [watchAppLoad];
