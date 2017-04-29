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
    case 'ADD_FAVORITE_FULFILLED':
      return {
        ...state,
        favorites: [...state.favorites, action.payload.data._id]
      }
    case 'REMOVE_FAVORITE_FULFILLED':
      return {
        ...state,
        favorites: state.favorites.filter(id => id !== action.payload.data._id)
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
    case 'ADD_FAVORITE_FULFILLED':
      return {
        ...state,
        [action.payload.data.screenshot]: screenshot(
          state[action.payload.data.screenshot],
          action
        )
      }
    case 'REMOVE_FAVORITE_FULFILLED':
      return {
        ...state,
        [action.payload.data.screenshot]: screenshot(
          state[action.payload.data.screenshot],
          action
        )
      }
    case 'UPDATE_SCREENSHOT_FULFILLED':
      return {
        ...state,
        [action.payload.data._id]: action.payload.data
      }
    case 'DELETE_SCREENSHOT_FULFILLED':
      return omit(state, action.payload.data._id)
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
    case 'ADD_FAVORITE_FULFILLED':
      return {
        ...state,
        [action.payload.data._id]: {
          ...state[action.payload.data._id],
          ...action.payload.data
        }
      }
    case 'REMOVE_FAVORITE_FULFILLED':
      return omit(state, action.payload.data._id)
    default:
      if (get(action, 'payload.data.entities.favorites')) {
        return merge({}, state, action.payload.data.entities.favorites)
      }
      return state
  }
}

function tag(state = {}, action) {
  switch (action.type) {
    case 'DELETE_TAG_FULFILLED':
      return {
        ...state,
        screenshots: state.screenshots.filter(
          screenshotId => screenshotId !== action.payload.data.screenshotId
        )
      }
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
      if (!state[action.payload.data.name]) return state
      return {
        ...state,
        [action.payload.data.name]: tag(state[action.payload.data.name], action)
      }
    case 'DELETE_SCREENSHOT_FULFILLED':
      return omit(state, action.payload.data.tags)
    default:
      if (get(action, 'payload.data.entities.tags')) {
        return merge({}, state, action.payload.data.entities.tags)
      }
      return state
  }
}

function user(state = {}, action) {
  switch (action.type) {
    case 'ADD_FAVORITE_FULFILLED':
      return {
        ...state,
        favorites: [...state.favorites, action.payload.data._id]
      }
    case 'REMOVE_FAVORITE_FULFILLED':
      return {
        ...state,
        favorites: state.favorites.filter(id => id !== action.payload.data._id)
      }
    case 'DELETE_SCREENSHOT_FULFILLED':
      return {
        ...state,
        screenshots: state.screenshots.filter(
          id => id !== action.payload.data._id
        )
      }
    default:
      return state
  }
}

function users(state = {}, action) {
  switch (action.type) {
    case 'ADD_FAVORITE_FULFILLED':
      return {
        ...state,
        [action.payload.data.user]: user(
          state[action.payload.data.user],
          action
        )
      }
    case 'REMOVE_FAVORITE_FULFILLED':
      return {
        ...state,
        [action.payload.data.user]: user(
          state[action.payload.data.user],
          action
        )
      }
    case 'DELETE_SCREENSHOT_FULFILLED':
      return {
        ...state,
        [action.payload.data.user]: user(
          state[action.payload.data.user],
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
