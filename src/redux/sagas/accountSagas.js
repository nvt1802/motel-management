import { takeLatest, call, put } from "redux-saga/effects"
import * as actionTypes from '../actions/actionTypes'
import Services from '../../services'

export function* watcherAccountSaga() {
  yield takeLatest(actionTypes.ACCOUNT_LIST_API_CALL_REQUEST, workerSaga)
}

function fetchListAccount(pageCommon) {
  return Services.account.finAllAccountAvailable(pageCommon)
}

export function* workerSaga(action) {
  try {
    const response = yield call(fetchListAccount, action.payload)
    const data = response.data
    yield put({ type: actionTypes.ACCOUNT_LIST_API_CALL_SUCCESS, data })
  } catch (error) {
    yield put({ type: actionTypes.ACCOUNT_LIST_API_CALL_FAILURE, error })
  }
}