import { combineReducers } from 'redux'
import { union } from 'lodash'

export default combineReducers({
  allIds: allScreenshots
})

function allScreenshots (state = [], action) {
  switch (action.type) {
    case 'GET_BANGUMIS_FULFILLED':
      return Object.keys(action.payload.data.entities.screenshots)
    case 'GET_BANGUMI_FULFILLED':
      return union(state, Object.keys(action.payload.data.entities.screenshots))
    case 'GET_SCREENSHOT_FULFILLED':
      return union(state, [action.payload.data.result])
    default:
      return state
  }
}
