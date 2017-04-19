import { merge, omit } from 'lodash'
import { combineReducers } from 'redux'

export default combineReducers({
  screenshots,
  favorites,
  tags,
  users
})

function screenshots(state = {}, action) {
  if (
    action.payload &&
    action.payload.data &&
    action.payload.data.entities &&
    action.payload.data.entities.screenshots
  ) {
    return merge({}, state, action.payload.data.entities.screenshots)
  }

  return state
}

function favorites(state = {}, action) {
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
      if (
        action.payload &&
        action.payload.data &&
        action.payload.data.entities &&
        action.payload.data.entities.favorites
      ) {
        return merge({}, state, action.payload.data.entities.favorites)
      }
      return state
  }
}

function tags(state = {}, action) {
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
      if (
        action.payload &&
        action.payload.data &&
        action.payload.data.entities &&
        action.payload.data.entities.tags
      ) {
        return merge({}, state, action.payload.data.entities.tags)
      }
      return state
  }
}

function users(state = {}, action) {
  if (
    action.payload &&
    action.payload.data &&
    action.payload.data.entities &&
    action.payload.data.entities.users
  ) {
    return merge({}, state, action.payload.data.entities.users)
  }

  return state
}
