import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'

import user from './user'
import authed from './authed'
import bangumis from './bangumis'
import screenshots from './screenshots'
import errorMessage from './errorMessage'

export default combineReducers({
  user,
  authed,
  bangumis,
  screenshots,
  errorMessage,
  routing: routerReducer
})
