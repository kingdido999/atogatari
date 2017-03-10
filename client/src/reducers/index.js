import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'

import auth from './auth'
import file from './file'
import authed from './authed'
import entities from './entities'

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
  authed,
  entities,
  errorMessage,
  routing: routerReducer
})
