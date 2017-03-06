import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'

import auth from './auth'
import file from './file'
import bangumi from './bangumi'
import favorite from './favorite'
import screenshot from './screenshot'

const errorMessage = (state = null, action) => {
  const { type, payload } = action

  if (type === 'RESET_ERROR_MESSAGE') {
    return null
  } else if (typeof payload === 'string') {
    // Assuming when error occurs, the payload is a String
    return payload
  }

  return state
}

export default combineReducers({
  auth,
  file,
  bangumi,
  favorite,
  screenshot,
  errorMessage,
  routing: routerReducer
})
