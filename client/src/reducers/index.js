import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'

import user from './user'
import authed from './authed'
import entities from './entities'
import errorMessage from './errorMessage'

export default combineReducers({
  user,
  authed,
  entities,
  errorMessage,
  routing: routerReducer
})
