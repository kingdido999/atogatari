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

  if (action.type === 'ADD_TAG_FULFILLED') {
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
  }

  if (action.type === 'DELETE_TAG_FULFILLED') {
    const { screenshotId, name } = action.payload.data
    return {
      ...state,
      [screenshotId]: {
        ...state[screenshotId],
        names: state[screenshotId].names.filter(tag => tag !== name)
      }
    }
  }

  if (action.type === 'DELETE_SCREENSHOT_FULFILLED') {
    return omit(state, action.payload.data.screenshotId)
  }

  return state
}
