import { combineReducers } from 'redux'

export default combineReducers({
  total,
  pages,
  page,
  limit,
  sortBy,
  nsfw
})

function total(state = 0, action) {
  switch (action.type) {
    case 'SET_TOTAL':
      return action.total
    default:
      return state
  }
}

function pages(state = 1, action) {
  switch (action.type) {
    case 'SET_PAGES':
      return action.pages
    default:
      return state
  }
}

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


