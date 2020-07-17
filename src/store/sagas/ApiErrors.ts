import { takeEvery, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { actions, ApiAction } from '../actions';

function* apiErrorReceived(action: ApiAction) {
  yield call(toast.error, `Error Received: ${action.code}`);
}

function* watchApiError() {
  yield takeEvery(actions.API_ERROR, apiErrorReceived);
}

export default [watchApiError];
