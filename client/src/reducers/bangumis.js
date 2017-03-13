import { combineReducers } from 'redux'

export default combineReducers({
  byId: bangumisById,
  allIds: allBangumis
})

function bangumisById (state = {}, action) {
  switch (action.type) {
    case 'GET_BANGUMIS_FULFILLED':
    case 'GET_BANGUMI_FULFILLED':
      const { bangumis } = action.payload.data.entities
      return {
        ...state,
        ...bangumis
      }
    default:
      return state
  }
}

function allBangumis (state = [], action) {
  switch (action.type) {
    case 'GET_BANGUMIS_FULFILLED':
      console.log(action.payload.data)
      return [
        ...state,
        ...action.payload.data.result
      ]
    case 'GET_BANGUMI_FULFILLED':
      return [
        ...state,
        action.payload.data.result
      ]
    default:
      return state
  }
}
