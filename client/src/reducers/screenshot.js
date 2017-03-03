
export default function screenshot (state = {
  isFetching: false,
  errorMessage: '',
  screenshots: []
}, action) {
  switch (action.type) {
    case 'GET_ALL_SCREENSHOTS_PENDING':
      return { ...state,
        isFetching: true,
        errorMessage: '',
        screenshots: []
      }
    case 'GET_ALL_SCREENSHOTS_FULFILLED':
      return { ...state,
        isFetching: false,
        errorMessage: '',
        screenshots: action.payload.data.screenshots
      }
    case 'GET_ALL_SCREENSHOTS_REJECTED':
      return { ...state,
        isFetching: false,
        errorMessage: action.payload,
        screenshots: []
      }
    default:
      return state
  }
}
