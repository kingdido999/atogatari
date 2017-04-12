import { combineReducers } from 'redux'

export default combineReducers({
  isFetching,
  ids,
  sortBy,
  nsfw,
  view
})

function isFetching (state = false, action) {
  switch (action.type) {
    case 'GET_SCREENSHOTS_PENDING':
      return true
    case 'GET_SCREENSHOTS_FULFILLED':
    case 'GET_SCREENSHOTS_REJECTED':
      return false
    default:
      return state
  }
}

function ids (state = [], action) {
  switch (action.type) {
    case 'GET_SCREENSHOTS_FULFILLED':
      return action.payload.data.result
    case 'DELETE_SCREENSHOT_FULFILLED':
      return state.filter(id => id !== action.payload.data.screenshotId)
    default:
      return state
  }
}

function sortBy (state = 'date', action) {
  switch (action.type) {
    case 'SET_SORT_BY':
      return action.sortBy
    default:
      return state
  }
}

function nsfw (state = false, action) {
  switch (action.type) {
    case 'TOGGLE_NSFW':
      return !state
    default:
      return state
  }
}

function view (state = 'grid', action) {
  switch (action.type) {
    case 'SET_VIEW':
      return action.view
    case 'CHANGE_IS_MOBILE':
      if (state === 'single') return state
      return action.isMobile ? 'single' : state
    case 'CHANGE_WIDTH_AND_HEIGHT':
      if (state === 'single') return state
      return action.width <= 992 ? 'single' : state
    default:
      return state
  }
}