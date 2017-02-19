
export default function file (state = {
  isUploaded: false,
  errorMessage: ''
}, action) {
  switch (action.type) {
    case 'UPLOAD_PENDING':
      return { ...state,
        isUploaded: false,
        errorMessage: ''
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
