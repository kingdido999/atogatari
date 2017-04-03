import { forIn } from 'lodash'

export default function bangumiScreenshots (state = {}, action) {
  if (action.payload && action.payload.data && action.payload.data.entities) {
    const { bangumis } = action.payload.data.entities
    const items = {}

    forIn(bangumis, (bangumi, key) => {
      items[key] = {
        ids: bangumi.screenshots
      }
    })

    return {
      ...state,
      ...items
    }
  }
  
  switch (action.type) {
    case 'SET_BANGUMI_EPISODE':
      return {
        ...state,
        [action.bangumiId]: {
          ...state[action.bangumiId],
          episode: action.episode
        }
      }
    case 'DELETE_SCREENSHOT_FULFILLED':
      const { bangumiId, screenshotId } = action.payload.data
      if (!state[bangumiId]) return state

      return {
        ...state,
        [bangumiId]: {
          ...state[bangumiId],
          ids: state[bangumiId].ids.filter(id => id !== screenshotId)
        }
      }
    default:
      return state
  }
}
