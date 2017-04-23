import { combineReducers } from 'redux'

export default combineReducers({
  isFetching,
  ids,
  total,
  pages,
  page,
  limit,
  sortBy,
  nsfw
})

function isFetching(state = false, action) {
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

function ids(state = [], action) {
  switch (action.type) {
    case 'GET_SCREENSHOTS_FULFILLED':
      return action.payload.data.result
    case 'DELETE_SCREENSHOT_FULFILLED':
      return state.filter(id => id !== action.payload.data._id)
    default:
      return state
  }
}

function total(state = 0, action) {
  switch (action.type) {
    case 'GET_SCREENSHOTS_FULFILLED':
      return action.payload.total
    default:
      return state
  }
}

function pages(state = 1, action) {
  switch (action.type) {
    case 'GET_SCREENSHOTS_FULFILLED':
      return action.payload.pages
    default:
      return state
  }
}

function page(state = 1, action) {
  switch (action.type) {
    case 'GET_SCREENSHOTS_FULFILLED':
      return action.payload.page
    case 'SET_PAGE':
      return action.page
    default:
      return state
  }
}

function limit(state = 9, action) {
  switch (action.type) {
    case 'GET_SCREENSHOTS_FULFILLED':
      return action.payload.limit
    default:
      return state
  }
}

function sortBy(state = 'Latest', action) {
  switch (action.type) {
    case 'SET_SORT_BY':
      return action.sortBy
    default:
      return state
  }
}

function nsfw(state = false, action) {
  switch (action.type) {
    case 'TOGGLE_NSFW':
      return !state
    default:
      return state
  }
}


