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
    case 'RESET_FILTER':
      return 1
    default:
      return state
  }
}

function limit(state = 9, action) {
  switch (action.type) {
    case 'SET_LIMIT':
      return action.limit
    case 'RESET_FILTER':
      return 9
    default:
      return state
  }
}

function sortBy(state = 'Latest', action) {
  switch (action.type) {
    case 'SET_SORT_BY':
      return action.sortBy
    case 'RESET_FILTER':
      return 'Latest'
    default:
      return state
  }
}

function nsfw(state = true, action) {
  switch (action.type) {
    case 'TOGGLE_NSFW':
      return !state
    default:
      return state
  }
}
