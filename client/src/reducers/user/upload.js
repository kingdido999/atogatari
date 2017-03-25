const initialState = {
  isUploading: false
}

export default function upload (state = initialState, action) {
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
        isUploading: false,
      }
    default:
      return state
  }
}
