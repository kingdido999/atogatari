import { combineReducers } from 'redux'

export default combineReducers({
  byId: screenshotsById,
  allIds: allScreenshots
})

function screenshotsById (state = {}, action) {
  switch (action.type) {
    case 'GET_BANGUMIS_FULFILLED':
      return action.payload.data.entities.screenshots
    case 'GET_BANGUMI_FULFILLED':
      return {
        ...state,
        ...action.payload.data.entities.screenshots
      }
    default:
      return state
  }
}

function allScreenshots (state = [], action) {
  switch (action.type) {
    case 'GET_BANGUMIS_FULFILLED':
      return Object.keys(action.payload.data.entities.screenshots)
    case 'GET_BANGUMI_FULFILLED':
      return [
        ...state,
        ...Object.keys(action.payload.data.entities.screenshots)
      ]
    default:
      return state
  }
}
