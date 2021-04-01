import { fork } from "redux-saga/effects"
import { watcherProvinceSaga } from './provinceSagas'
import { watcherDistrictSaga } from './districtSagas'
import { watcherAuthenticateSaga } from './authenticateSagas'
import { watcherAccountSaga } from './accountSagas'

export function* rootSaga() {
    yield fork(watcherProvinceSaga)
    yield fork(watcherDistrictSaga)
    yield fork(watcherAuthenticateSaga)
    yield fork(watcherAccountSaga)
}