import { forIn } from 'lodash'

export default function userScreenshots (state = {}, action) {
  switch (action.type) {
    case 'GET_SCREENSHOTS_FULFILLED':
    case 'GET_SCREENSHOT_FULFILLED':
      console.log(action)
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
    default:
      return state
  }
}
