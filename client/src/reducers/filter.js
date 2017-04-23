import { combineReducers } from 'redux'

export default combineReducers({
  sortBy,
  nsfw,
  limit,
  page
})

function page(state = 1, action) {
  switch (action.type) {
    case 'SET_PAGE':
      return action.page
    default:
      return state
  }
}

function limit(state = 9, action) {
  switch (action.type) {
    case 'SET_LIMIT':
      return action.limit
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
