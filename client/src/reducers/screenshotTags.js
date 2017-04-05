import { forIn, omit } from 'lodash'

export default function screenshotTags (state = {}, action) {
  if (action.payload && action.payload.data && action.payload.data.entities) {
    const { screenshots } = action.payload.data.entities
    const items = {}

    forIn(screenshots, (screenshot, key) => {
      items[key] = {
        names: screenshot.tags
      }
    })

    return {
      ...state,
      ...items
    }
  }

  switch (action.type) {
    case 'ADD_TAG_FULFILLED':
      const { screenshotId, name } = action.payload.data
      return {
        ...state,
        [screenshotId]: {
          ...state[screenshotId],
          names: [
            ...state[screenshotId].names,
            name
          ]
        }
      }
    case 'DELETE_SCREENSHOT_FULFILLED':
      return omit(state, action.payload.data.screenshotId)
    default:
      return state
  }
}
