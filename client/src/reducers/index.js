import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'

import auth from './auth'
import file from './file'
import screenshot from './screenshot'

export default combineReducers({
  auth,
  file,
  screenshot,
  routing: routerReducer
})
