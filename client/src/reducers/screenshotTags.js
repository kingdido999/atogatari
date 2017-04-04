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
    case 'ADD_TAG_TO_SCREENSHOT':
      return {
        ...state,
        [action.screenshotId]: {
          ...state[action.screenshotId],
          names: [
            ...state[action.screenshotId].names,
            action.name
          ]
        }
      }
    case 'DELETE_SCREENSHOT_FULFILLED':
      const { screenshotId } = action.payload.data
      return omit(state, screenshotId)
    default:
      return state
  }
}
