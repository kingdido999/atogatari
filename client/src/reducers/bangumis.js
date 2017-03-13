
const initialState = {
  isFetching: false,
  items: []
}

export default function bangumis (state = initialState, action) {
  switch (action.type) {
    case 'GET_BANGUMIS_PENDING':
      return { ...state,
        isFetching: true
      }
    case 'GET_BANGUMIS_FULFILLED':
      return { ...state,
        isFetching: false,
        items: action.payload.data.result
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
        items: [ ...state.items, action.payload.data.result ]
      }
    case 'GET_BANGUMI_REJECTED':
      return { ...state,
        isFetching: false
      }
    default:
      return state
  }
}
