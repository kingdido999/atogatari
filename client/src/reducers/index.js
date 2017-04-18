import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'

import user from './user'
import search from './search'
import entities from './entities'
import screenshots from './screenshots'
import tags from './tags'
import screenshotFavorites from './screenshotFavorites'
import screenshotTags from './screenshotTags'
import userFavorites from './userFavorites'
import userScreenshots from './userScreenshots'
import environment from './environment'
import errorMessage from './errorMessage'

export default combineReducers({
  user,
  search,
  entities,
  screenshots,
  tags,
  screenshotFavorites,
  screenshotTags,
  userFavorites,
  userScreenshots,
  environment,
  errorMessage,
  routing: routerReducer
})
