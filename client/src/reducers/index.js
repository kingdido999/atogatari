import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'

import user from './user'
import entities from './entities'
import bangumis from './bangumis'
import bangumiScreenshots from './bangumiScreenshots'
import screenshotFavorites from './screenshotFavorites'
import userFavorites from './userFavorites'
import errorMessage from './errorMessage'

export default combineReducers({
  user,
  entities,
  bangumis,
  bangumiScreenshots,
  screenshotFavorites,
  userFavorites,
  errorMessage,
  routing: routerReducer
})
