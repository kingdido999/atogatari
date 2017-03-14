import { combineReducers } from 'redux'
import favorites from './favorites'
import upload from './upload'

export default combineReducers({
  favorites,
  upload
})
