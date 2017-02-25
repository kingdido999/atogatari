
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
    default:
      return state
  }
}
