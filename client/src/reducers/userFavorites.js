import { forIn } from 'lodash'

export default function userFavorites (state = {}, action) {
  if (action.payload && action.payload.data && action.payload.data.entities) {
    const { users } = action.payload.data.entities
    const items = {}

    forIn(users, (user, key) => {
      items[key] = {
        ids: user.favorites
      }
    })

    return {
      ...state,
      ...items
    }
  }
  
  switch (action.type) {
    case 'ADD_FAVORITE':
      return {
        ...state,
        [action.favorite.user]: {
          ids: [
            ...state[action.favorite.user].ids,
            action.favorite._id
          ]
        }
      }
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        [action.favorite.user]: {
          ids: state[action.favorite.user].ids
          .filter(favoriteId => favoriteId !== action.favorite._id)
        }
      }
    default:
      return state
  }
}
