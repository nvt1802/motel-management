import province from './province'
import district from './district'
import authenticate from './authenticate'
import accountManagement from './accountManagement'
import { combineReducers } from 'redux'

const rootReducers = combineReducers({ province, district, authenticate, accountManagement })

export default rootReducers