import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'

import user from './user'
import search from './search'
import entities from './entities'
import bangumis from './bangumis'
import screenshots from './screenshots'
import bangumiScreenshots from './bangumiScreenshots'
import screenshotFavorites from './screenshotFavorites'
import userFavorites from './userFavorites'
import userScreenshots from './userScreenshots'
import errorMessage from './errorMessage'

export default combineReducers({
  user,
  search,
  entities,
  bangumis,
  screenshots,
  bangumiScreenshots,
  screenshotFavorites,
  userFavorites,
  userScreenshots,
  errorMessage,
  routing: routerReducer
})
