
export default function bangumi (state = {
  isFetching: false,
  errorMessage: '',
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
        errorMessage: '',
        bangumis: action.payload.data.bangumis
      }
    case 'GET_BANGUMIS_REJECTED':
      return { ...state,
        isFetching: false,
        errorMessage: action.payload,
        bangumis: []
      }
    case 'GET_BANGUMI_PENDING':
      return { ...state,
        isFetching: true,
        errorMessage: '',
        bangumiItem: null
      }
    case 'GET_BANGUMI_FULFILLED':
      return { ...state,
        isFetching: false,
        errorMessage: '',
        bangumiItem: action.payload.data.bangumi
      }
    case 'GET_BANGUMI_REJECTED':
      return { ...state,
        isFetching: false,
        errorMessage: action.payload,
        bangumiItem: null
      }
    default:
      return state
  }
}
