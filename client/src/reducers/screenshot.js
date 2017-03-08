
export default function screenshot (state = {
  isFetching: false,
  screenshots: []
}, action) {
  switch (action.type) {
    case 'GET_SCREENSHOTS_PENDING':
      return { ...state,
        isFetching: true
      }
    case 'GET_SCREENSHOTS_FULFILLED':
      return { ...state,
        isFetching: false,
        screenshots: action.payload.data.screenshots
      }
    case 'GET_SCREENSHOTS_REJECTED':
      return { ...state,
        isFetching: false
      }
    default:
      return state
  }
}
