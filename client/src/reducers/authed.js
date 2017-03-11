
const initialState = {
  isUploading: false
}

export default function authed (state = initialState, action) {
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
