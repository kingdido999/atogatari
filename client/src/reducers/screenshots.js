import { combineReducers } from 'redux'

export default combineReducers({
  isFetching,
  ids
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
      const { screenshotId } = action.payload.data
      return state.filter(id => id !== screenshotId)
    default:
      return state
  }
}
