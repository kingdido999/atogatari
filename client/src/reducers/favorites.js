import { combineReducers } from 'redux'
import { union } from 'lodash'

export default combineReducers({
  byId: favoritesById,
  allIds: allFavorites
})

function favoritesById (state = {}, action) {
  switch (action.type) {
    case 'GET_BANGUMI_FULFILLED':
      if (!action.payload.data.entities.favorites) return state

      return {
        ...state,
        ...action.payload.data.entities.favorites
      }
    case 'GET_USER_FAVORITES_FULFILLED':
      if (action.payload.data.result.length === 0) {
        return state
      }
      return {
        ...state,
        ...action.payload.data.entities.favorites
      }
    case 'ADD_FAVORITE':
      return {
        ...state,
        [action.favorite._id]: action.favorite
      }
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        [action.favorite._id]: null
      }
    default:
      return state
  }
}

function allFavorites (state = [], action) {
  switch (action.type) {
    case 'GET_BANGUMI_FULFILLED':
      if (!action.payload.data.entities.favorites) return state

      return union(state, Object.keys(action.payload.data.entities.favorites))
    case 'GET_USER_FAVORITES_FULFILLED':
      return union(state, action.payload.data.result)
    case 'ADD_FAVORITE':
      return [
        ...state,
        action.favorite._id
      ]
    case 'REMOVE_FAVORITE':
      return state.filter(favoriteId => favoriteId !== action.favorite._id)
    default:
      return state
  }
}
