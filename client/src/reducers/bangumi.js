
export default function bangumi (state = {
  isFetching: false,
  bangumis: []
}, action) {
  switch (action.type) {
    case 'GET_BANGUMIS_PENDING':
      return { ...state,
        isFetching: true,
        errorMessage: '',
        bangumis: []
      }
    case 'GET_BANGUMIS_FULFILLED':
      return { ...state,
        isFetching: false,
        bangumis: action.payload.data.bangumis
      }
    case 'GET_BANGUMIS_REJECTED':
      return { ...state,
        isFetching: false,
        bangumis: []
      }
    case 'GET_BANGUMI_PENDING':
      return { ...state,
        isFetching: true,
        bangumiItem: null
      }
    case 'GET_BANGUMI_FULFILLED':
      return { ...state,
        isFetching: false,
        bangumiItem: action.payload.data.bangumi
      }
    case 'GET_BANGUMI_REJECTED':
      return { ...state,
        isFetching: false,
        bangumiItem: null
      }
    default:
      return state
  }
}
