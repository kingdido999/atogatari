function screenshotList(
  state = {
    isFetching: false,
    ids: []
  },
  action
) {
  switch (action.type) {
    case 'GET_SCREENSHOTS_FULFILLED':
      return {
        ...state,
        ids: action.payload.data.result
      }
    default:
      return state
  }
}

export default function screenshotLists(state = {}, action) {
  switch (action.type) {
    case 'GET_SCREENSHOTS_FULFILLED':
      return {
        ...state,
        [action.key]: screenshotList(state[action.key], action)
      }
    default:
      return state
  }
}
