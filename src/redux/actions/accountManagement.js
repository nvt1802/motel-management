import * as actionTypes from './actionTypes'

export const fecthListAccount = (pageCommon) => {
  return {
    type: actionTypes.ACCOUNT_LIST_API_CALL_REQUEST,
    payload: pageCommon 
  }
}