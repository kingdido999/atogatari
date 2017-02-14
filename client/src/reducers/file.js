const initialState = {
  isUploaded: false
}

export default function file(state = initialState, action) {
  switch (action.type) {
    case 'UPLOAD_PENDING':
      return { ...state,
        isUploaded: false
      }
    case 'UPLOAD_FULFILLED':
      return { ...state,
        isUploaded: true,
        errorMessage: ''
      }
    case 'UPLOAD_REJECTED':
      return { ...state,
        isUploaded: false,
        errorMessage: action.payload
      }
    default:
      return state
  }
}
