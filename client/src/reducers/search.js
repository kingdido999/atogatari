import { combineReducers } from 'redux'

export default combineReducers({
  isFetching,
  results
})

function isFetching(state = false, action) {
  switch (action.type) {
    case 'SEARCH_PENDING':
      return true
    case 'SEARCH_FULFILLED':
    case 'SEARCH_REJECTED':
      return false
    default:
      return state
  }
}

function results(state = {}, action) {
  switch (action.type) {
    case 'SEARCH_FULFILLED':
      return action.payload.data
    // case 'DELETE_TAG_FULFILLED':
    //   return state.filter(({ name }) => name !== action.payload.data.name)
    default:
      return state
  }
}
