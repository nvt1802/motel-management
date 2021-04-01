import { takeLatest, call, put } from "redux-saga/effects"
import * as actionTypes from '../actions/actionTypes'
import Services from '../../services'
import AuthenServices from '../../services/Authentication.Service'

export function* watcherAuthenticateSaga() {
  yield takeLatest(actionTypes.AUTHENTICATE_API_CALL_REQUEST, workerSaga)
  yield takeLatest(actionTypes.AUTHENTICATE_TOKEN_API_CALL_REQUEST, workerSaga1)
}

function fetchAccountData(username) {
  return Services.account.findAccountByUserName(username)
}

function fetchAccountDataFromToken(token) {
  AuthenServices.createJwtAuthToken(token)
  return Services.account.getAccountFromToken(token)
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

export function* workerSaga1(action) {
  try {
    const response = yield call(fetchAccountDataFromToken, action.payload)
    const data = response.data
    AuthenServices.registerSuccessFullLogin(data?.userName, AuthenServices.getJwtAuthToken().substring(7))
    yield put({ type: actionTypes.AUTHENTICATE_TOKEN_API_CALL_SUCCESS, data })
  } catch (error) {
    yield put({ type: actionTypes.AUTHENTICATE_TOKEN_API_CALL_FAILURE, error })
  }
}