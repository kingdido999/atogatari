import { combineReducers } from 'redux'

import { isLoggedIn } from '../utils'

export default combineReducers({
  isLoggingIn,
  isSigningUp,
  isAuthenticated,
  uid,
  isUploading
})

function isLoggingIn(state = false, action) {
  switch (action.type) {
    case 'LOGIN_PENDING':
      return true
    case 'LOGIN_FULFILLED':
    case 'LOGIN_REJECTED':
      return false
    default:
      return state
  }
}

function isSigningUp(state = false, action) {
  switch (action.type) {
    case 'SIGNUP_PENDING':
      return true
    case 'SIGNUP_FULFILLED':
    case 'SIGNUP_REJECTED':
      return false
    default:
      return state
  }
}

function isAuthenticated(state = isLoggedIn(), action) {
  switch (action.type) {
    case 'LOGIN_FULFILLED':
    case 'SIGNUP_FULFILLED':
      return true
    case 'LOGOUT_FULFILLED':
      return false
    default:
      return state
  }
}

function uid(state = null, action) {
  switch (action.type) {
    case 'LOGIN_FULFILLED':
    case 'SIGNUP_FULFILLED':
      return action.payload.data.uid
    case 'GET_AUTHED_USER_FULFILLED':
      return action.payload.data.result
    case 'LOGOUT_FULFILLED':
      return null
    default:
      return state
  }
}

function isUploading(state = false, action) {
  switch (action.type) {
    case 'UPLOAD_PENDING':
      return true
    case 'UPLOAD_FULFILLED':
      return false
    case 'UPLOAD_REJECTED':
      return false
    default:
      return state
  }
}
