import { combineReducers } from 'redux'

export default combineReducers({
  byId: bangumisById,
  allIds: allBangumis
})

function bangumisById (state = {}, action) {
  switch (action.type) {
    case 'GET_BANGUMIS_FULFILLED':
      return action.payload.data.entities.bangumis
    case 'GET_BANGUMI_FULFILLED':
      return {
        ...state,
        ...action.payload.data.entities.bangumis
      }
    default:
      return state
  }
}

function allBangumis (state = [], action) {
  switch (action.type) {
    case 'GET_BANGUMIS_FULFILLED':
      return action.payload.data.result
    case 'GET_BANGUMI_FULFILLED':
      return [
        ...state,
        action.payload.data.result
      ]
    default:
      return state
  }
}
