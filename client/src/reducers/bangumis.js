import { combineReducers } from 'redux'

export default combineReducers({
  isFetching: isFetching,
  ids: allBangumis
})

function isFetching (state = false, action) {
  switch (action.type) {
    case 'GET_BANGUMI_PENDING':
    case 'GET_BANGUMIS_PENDING':
      return true
    case 'GET_BANGUMI_FULFILLED':
    case 'GET_BANGUMIS_FULFILLED':
    case 'GET_BANGUMI_REJECTED':
    case 'GET_BANGUMIS_REJECTED':
      return false
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
