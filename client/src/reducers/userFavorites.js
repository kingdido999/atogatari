import { forIn } from 'lodash'

export default function userFavorites (state = {}, action) {
  switch (action.type) {
    case 'GET_BANGUMIS_FULFILLED':
    case 'GET_BANGUMI_FULFILLED':
    case 'GET_SCREENSHOT_FULFILLED':
    case 'GET_FAVORITES_FULFILLED':
    case 'GET_USER_FAVORITES_FULFILLED':
    case 'GET_AUTHED_USER_FULFILLED':
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
