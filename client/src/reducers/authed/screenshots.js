import { combineReducers } from 'redux'

export default combineReducers({
  byId: screenshotsById,
  allIds: allScreenshots
})

function screenshotsById (state = {}, action) {
  switch (action.type) {
    case 'GET_UPLOADED_SCREENSHOTS_FULFILLED':
      if (action.payload.data.result.length === 0) return state
      return action.payload.data.entities.screenshots
    default:
      return state
  }
}

function allScreenshots (state = [], action) {
  switch (action.type) {
    case 'GET_UPLOADED_SCREENSHOTS_FULFILLED':
      return action.payload.data.result
    default:
      return state
  }
}
