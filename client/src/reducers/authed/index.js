import { combineReducers } from 'redux'
import screenshots from './screenshots'
import favorites from './favorites'
import upload from './upload'

export default combineReducers({
  screenshots,
  favorites,
  upload
})
