import { combineReducers } from 'redux'

export default combineReducers({
  byId: favoritesById,
  allIds: allFavorites
})

function favoritesById (state = {}, action) {
  switch (action.type) {
    case 'GET_BANGUMIS_FULFILLED':
    case 'GET_BANGUMI_FULFILLED':
      const { favorites } = action.payload.data.entities
      return {
        ...state,
        ...favorites
      }
    default:
      return state
  }
}

function allFavorites (state = [], action) {
  switch (action.type) {
    case 'GET_BANGUMIS_FULFILLED':
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
