import { combineReducers } from 'redux'
import screenshots from './screenshots'
import favorites from './favorites'
import upload from './upload'

import { isLoggedIn } from '../../utils'

export default combineReducers({
  isFetching,
  isAuthenticated,
  screenshots,
  favorites,
  upload
})

function isFetching (state = false, action) {
  switch (action.type) {
    case 'LOGIN_PENDING':
    case 'SIGNUP_PENDING':
      return true
    case 'LOGIN_FULFILLED':
    case 'SIGNUP_FULFILLED':
    case 'LOGIN_REJECTED':
    case 'SIGNUP_REJECTED':
      return false
    default:
      return state
  }
}

function isAuthenticated (state = isLoggedIn(), action) {
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
