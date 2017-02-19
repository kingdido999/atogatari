
export default function screenshot (state = {
  isFetching: false,
  errorMessage: '',
  screenshots: [],
  numRendered: 0
}, action) {
  switch (action.type) {
    case 'GET_ALL_SCREENSHOTS_PENDING':
      return { ...state,
        isFetching: true,
        errorMessage: '',
        screenshots: [],
        numRendered: 0
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
    case 'SCREENSHOT_RENDERED':
      return { ...state,
        numRendered: state.numRendered + 1
      }
    default:
      return state
  }
}
