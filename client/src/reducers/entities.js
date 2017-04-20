import { merge, omit, get } from 'lodash'
import { combineReducers } from 'redux'

export default combineReducers({
  screenshots,
  favorites,
  tags,
  users
})

function screenshots(state = {}, action) {
  const screenshots = get(action, 'payload.data.entities.screenshots')
  if (screenshots) {
    return merge({}, state, screenshots)
  }

  return state
}

function favorites(state = {}, action) {
  const favorites = get(action, 'payload.data.entities.favorites')
  if (favorites) {
    return merge({}, state, favorites)
  }

  switch (action.type) {
    case 'ADD_FAVORITE':
      return {
        ...state,
        [action.favorite._id]: {
          ...state[action.favorite._id],
          ...action.favorite
        }
      }
    case 'REMOVE_FAVORITE':
      return omit(state, action.favorite._id)
    default:
      return state
  }
}

function tags(state = {}, action) {
  const tags = get(action, 'payload.data.entities.tags')
  if (tags) {
    return merge({}, state, tags)
  }

  switch (action.type) {
    case 'UPDATE_TAG_FULFILLED':
      return {
        ...state,
        [action.payload.data.name]: {
          ...state[action.payload.data.name],
          ...action.payload.data
        }
      }
    default:
      return state
  }
}

function users(state = {}, action) {
  const users = get(action, 'payload.data.entities.users')
  if (users) {
    return merge({}, state, users)
  }

  return state
}
