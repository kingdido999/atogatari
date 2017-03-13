import { combineReducers } from 'redux'

export default combineReducers({
  byId: screenshotsById,
  allIds: allScreenshots
})

function screenshotsById (state = {}, action) {
  switch (action.type) {
    case 'GET_BANGUMIS_FULFILLED':
    case 'GET_BANGUMI_FULFILLED':
      const { screenshots } = action.payload.data.entities
      return {
        ...state,
        ...screenshots
      }
    default:
      return state
  }
}

function allScreenshots (state = [], action) {
  switch (action.type) {
    case 'GET_BANGUMIS_FULFILLED':
    case 'GET_BANGUMI_FULFILLED':
      console.log(action.payload.data)
      const { result } = action.payload.data
      return [
        ...state,
        ...result
      ]
    default:
      return state
  }
}
