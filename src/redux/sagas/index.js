import { fork } from "redux-saga/effects"
import { watcherProvinceSaga } from './provinceSagas'
import { watcherDistrictSaga } from './districtSagas'
import { watcherAuthenticateSaga } from './authenticateSagas'

export function* rootSaga() {
    yield fork(watcherProvinceSaga)
    yield fork(watcherDistrictSaga)
    yield fork(watcherAuthenticateSaga)
}