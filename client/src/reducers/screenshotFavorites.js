import { forIn, omit } from 'lodash'

export default function screenshotFavorites (state = {}, action) {
  if (action.payload && action.payload.data && action.payload.data.entities) {
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
  }

  switch (action.type) {
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
    case 'DELETE_SCREENSHOT_FULFILLED': 
      return omit(state, action.payload.data.screenshotId)
    default:
      return state
  }
}
