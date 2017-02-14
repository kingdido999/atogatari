import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'

import auth from './auth'
import file from './file'

export default combineReducers({
  auth,
  file,
  routing: routerReducer
})
