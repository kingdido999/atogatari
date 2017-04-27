import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading-bar'

import user from './user'
import search from './search'
import entities from './entities'
import screenshotLists from './screenshotLists'
import tags from './tags'
import ui from './ui'
import filter from './filter'
import environment from './environment'
import errorMessage from './errorMessage'

export default combineReducers({
  user,
  search,
  entities,
  screenshotLists,
  tags,
  ui,
  filter,
  environment,
  errorMessage,
  routing: routerReducer,
  loadingBar: loadingBarReducer
})
