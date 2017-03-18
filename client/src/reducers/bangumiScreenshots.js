import { forIn } from 'lodash'

export default function bangumiScreenshots (state = {}, action) {
  switch (action.type) {
    case 'GET_BANGUMIS_FULFILLED':
      const { bangumis } = action.payload.data.entities
      const items = {}

      forIn(bangumis, (bangumi, key) => {
        items[key] = {
          ids: bangumi.screenshots
        }
      })

      return items
    case 'GET_BANGUMI_FULFILLED':
      return {
        ...state,
        [action.payload.data.result]: {
          ids: Object.keys(action.payload.data.entities.screenshots)
        }
      }
    case 'SET_BANGUMI_EPISODE':
      return {
        ...state,
        [action.bangumiId]: {
          ...state[action.bangumiId],
          episode: action.episode
        }
      }
    default:
      return state
  }
}
