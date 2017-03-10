
const initialState = {
  isFetching: false,
  selectedBangumi: null,
  bangumis: [],
  screenshots: [],
}

export default function entities (state = initialState, action) {
  switch (action.type) {
    case 'GET_BANGUMIS_PENDING':
      return { ...state,
        isFetching: true
      }
    case 'GET_BANGUMIS_FULFILLED':
      return { ...state,
        isFetching: false,
        bangumis: action.payload.data.bangumis
      }
    case 'GET_BANGUMIS_REJECTED':
      return { ...state,
        isFetching: false
      }
    case 'GET_BANGUMI_PENDING':
      return { ...state,
        isFetching: true
      }
    case 'GET_BANGUMI_FULFILLED':
      return { ...state,
        isFetching: false,
        selectedBangumi: action.payload.data.bangumi
      }
    case 'GET_BANGUMI_REJECTED':
      return { ...state,
        isFetching: false
      }
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
