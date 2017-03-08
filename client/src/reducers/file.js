
export default function file (state = {
  isUploading: false
}, action) {
  switch (action.type) {
    case 'UPLOAD_PENDING':
      return { ...state,
        isUploading: true,
      }
    case 'UPLOAD_FULFILLED':
      return { ...state,
        isUploading: false,
      }
    case 'UPLOAD_REJECTED':
      return { ...state,
        isUploading: true,
      }
    default:
      return state
  }
}
