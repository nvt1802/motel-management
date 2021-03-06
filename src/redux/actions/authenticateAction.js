import * as actionTypes from './actionTypes'

export const initAuthenticate = (username) => {
  return {
    type: actionTypes.AUTHENTICATE_API_CALL_REQUEST,
    payload: username
  }
}

export const initAuthenticateFromToken = (token) => {
  return {
    type: actionTypes.AUTHENTICATE_TOKEN_API_CALL_REQUEST,
    payload: token
  }
}

export const removeAuthenticate = () => {
  return {
    type: actionTypes.AUTHENTICATE_API_CALL_FAILURE
  }
}