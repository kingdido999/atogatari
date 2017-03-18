import { combineReducers } from 'redux'

export default combineReducers({
  ids: allFavorites
})

function allFavorites (state = [], action) {
  switch (action.type) {
    case 'GET_USER_FAVORITES_FULFILLED':
      return action.payload.data.result
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
