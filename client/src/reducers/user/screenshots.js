import { combineReducers } from 'redux'

export default combineReducers({
  ids: allScreenshots
})

function allScreenshots (state = [], action) {
  switch (action.type) {
    case 'GET_UPLOADED_SCREENSHOTS_FULFILLED':
      return action.payload.data.result
    case 'LOGOUT_FULFILLED':
      return []
    default:
      return state
  }
}
