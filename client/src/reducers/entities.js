import { merge, omit, get } from 'lodash'
import { combineReducers } from 'redux'

export default combineReducers({
  screenshots,
  favorites,
  tags,
  users
})

function screenshot(state = {}, action) {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return {
        ...state,
        favorites: [...state.favorites, action.favorite._id]
      }
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter(id => id !== action.favorite._id)
      }
    case 'ADD_TAG_FULFILLED':
      return {
        ...state,
        tags: [...state.tags, action.payload.data.name]
      }
    case 'DELETE_TAG_FULFILLED':
      return {
        ...state,
        tags: state.tags.filter(name => name !== action.payload.data.name)
      }
    default:
      return state
  }
}

function screenshots(state = {}, action) {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return {
        ...state,
        [action.favorite.screenshot]: screenshot(
          state[action.favorite.screenshot],
          action
        )
      }
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        [action.favorite.screenshot]: screenshot(
          state[action.favorite.screenshot],
          action
        )
      }
    case 'DELETE_SCREENSHOT_FULFILLED':
      return omit(state, action.payload.data.screenshotId)
    case 'ADD_TAG_FULFILLED':
      return {
        ...state,
        [action.payload.data.screenshotId]: screenshot(
          state[action.payload.data.screenshotId],
          action
        )
      }
    case 'DELETE_TAG_FULFILLED':
      return {
        ...state,
        [action.payload.data.screenshotId]: screenshot(
          state[action.payload.data.screenshotId],
          action
        )
      }
    default:
      if (get(action, 'payload.data.entities.screenshots')) {
        return merge({}, state, action.payload.data.entities.screenshots)
      }

      return state
  }
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
      if (get(action, 'payload.data.entities.favorites')) {
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
    case 'DELETE_TAG_FULFILLED':
      return omit(state, action.payload.data.name)
    default:
      if (get(action, 'payload.data.entities.tags')) {
        return merge({}, state, action.payload.data.entities.tags)
      }
      return state
  }
}

function user(state = {}, action) {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return {
        ...state,
        favorites: [...state.favorites, action.favorite._id]
      }
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter(id => id !== action.favorite._id)
      }
    case 'DELETE_SCREENSHOT_FULFILLED':
      return {
        ...state,
        screenshots: state.screenshots.filter(
          id => id !== action.payload.data.screenshotId
        )
      }
    default:
      return state
  }
}

function users(state = {}, action) {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return {
        ...state,
        [action.favorite.user]: user(state[action.favorite.user], action)
      }
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        [action.favorite.user]: user(state[action.favorite.user], action)
      }
    case 'DELETE_SCREENSHOT_FULFILLED':
      return {
        ...state,
        [action.payload.data.userId]: user(
          state[action.payload.data.userId],
          action
        )
      }
    default:
      if (get(action, 'payload.data.entities.users')) {
        return merge({}, state, action.payload.data.entities.users)
      }

      return state
  }
}
