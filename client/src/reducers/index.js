import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'

import user from './user'
import authed from './authed'
import entities from './entities'
import bangumis from './bangumis'
import favorites from './favorites'
import bangumiScreenshots from './bangumiScreenshots'
import screenshotFavorites from './screenshotFavorites'
import errorMessage from './errorMessage'

export default combineReducers({
  user,
  authed,
  entities,
  bangumis,
  favorites,
  bangumiScreenshots,
  screenshotFavorites,
  errorMessage,
  routing: routerReducer
})
