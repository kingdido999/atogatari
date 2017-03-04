
export default function file (state = {
  isUploaded: false
}, action) {
  switch (action.type) {
    case 'UPLOAD_PENDING':
      return { ...state,
        isUploaded: false,
      }
    case 'UPLOAD_FULFILLED':
      return { ...state,
        isUploaded: true,
      }
    case 'UPLOAD_REJECTED':
      return { ...state,
        isUploaded: false,
      }
    default:
      return state
  }
}
