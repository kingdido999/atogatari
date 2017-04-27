function screenshotList(
  state = {
    isFetching: false,
    ids: [],
    total: 0,
    pages: 1
  },
  action
) {
  switch (action.type) {
    case 'GET_SCREENSHOTS_FULFILLED':
      return {
        ...state,
        ids: action.payload.data.result
      }
    case 'SET_TOTAL':
      return {
        ...state,
        total: action.total
      }
    case 'SET_PAGES':
      return {
        ...state,
        pages: action.pages
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
    case 'SET_TOTAL':
      return {
        ...state,
        [action.key]: screenshotList(state[action.key], action)
      }
    case 'SET_PAGES':
      return {
        ...state,
        [action.key]: screenshotList(state[action.key], action)
      }
    case 'RESET_SCREENSHOT_LISTS':
      return {}
    default:
      return state
  }
}
