import { takeLatest, call, put } from "redux-saga/effects"
import * as actionTypes from '../actions/actionTypes'
import Services from '../../services'

export function* watcherAuthenticateSaga() {
  yield takeLatest(actionTypes.AUTHENTICATE_API_CALL_REQUEST, workerSaga)
}

function fetchAccountData(username) {
  return Services.account.findAccountByUserName(username)
}

export function* workerSaga(action) {
  try {
    const response = yield call(fetchAccountData, action.payload)
    const data = response.data
    yield put({ type: actionTypes.AUTHENTICATE_API_CALL_SUCCESS, data })
  } catch (error) {
    yield put({ type: actionTypes.AUTHENTICATE_API_CALL_FAILURE, error })
  }
}