import { forIn } from 'lodash'

export default function userScreenshots (state = {}, action) {
  if (action.payload && action.payload.data && action.payload.data.entities) {
    const { users } = action.payload.data.entities
    const items = {}

    forIn(users, (user, key) => {
      items[key] = {
        ids: user.screenshots
      }
    })

    return {
      ...state,
      ...items
    }
  }

  if (action.type === 'DELETE_SCREENSHOT_FULFILLED') {
          const { userId, screenshotId } = action.payload.data
      if (!state[userId]) return state

      return {
        ...state,
        [userId]: {
          ...state[userId],
          ids: state[userId].ids.filter(id => id !== screenshotId)
        }
      }
  }
  
  return state
}
