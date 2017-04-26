import { combineReducers } from 'redux'

export default combineReducers({
  isFetching,
  names
})

function isFetching(state = false, action) {
  switch (action.type) {
    case 'GET_TAGS_PENDING':
      return true
    case 'GET_TAGS_FULFILLED':
    case 'GET_TAGS_REJECTED':
      return false
    default:
      return state
  }
}

function names(state = [], action) {
  switch (action.type) {
    case 'GET_TAGS_FULFILLED':
      return action.payload.data.result
    default:
      return state
  }
}
