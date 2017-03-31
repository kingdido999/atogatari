import { forIn } from 'lodash'

export default function screenshotFavorites (state = {}, action) {
  switch (action.type) {
    case 'GET_BANGUMIS_FULFILLED':
    case 'GET_BANGUMI_FULFILLED':
    case 'GET_FAVORITES_FULFILLED':
    case 'GET_USER_FAVORITES_FULFILLED':
    case 'GET_AUTHED_USER_FULFILLED':
    case 'GET_UPLOADED_SCREENSHOTS_FULFILLED':
    case 'GET_SCREENSHOT_FULFILLED':
    case 'GET_SCREENSHOTS_FULFILLED':
      const { screenshots } = action.payload.data.entities
      const items = {}

      forIn(screenshots, (screenshot, key) => {
        items[key] = {
          ids: screenshot.favorites
        }
      })

      return {
        ...state,
        ...items
      }
    case 'ADD_FAVORITE':
      return {
        ...state,
        [action.favorite.screenshot]: {
          ids: [
            ...state[action.favorite.screenshot].ids,
            action.favorite._id
          ]
        }
      }
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        [action.favorite.screenshot]: {
          ids: state[action.favorite.screenshot].ids
          .filter(favoriteId => favoriteId !== action.favorite._id)
        }
      }
    default:
      return state
  }
}
