
const initialState = {
  isFetching: false,
  items: []
}

export default function screenshots (state = initialState, action) {
  switch (action.type) {
    case 'GET_SCREENSHOTS_PENDING':
      return { ...state,
        isFetching: true
      }
    case 'GET_SCREENSHOTS_FULFILLED':
      return { ...state,
        isFetching: false,
        items: action.payload.data.result
      }
    case 'GET_SCREENSHOTS_REJECTED':
      return { ...state,
        isFetching: false
      }
    default:
      return state
  }
}
