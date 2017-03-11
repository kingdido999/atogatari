
export default function authed (state = {
  isFetching: false,
  isUploading: false
}, action) {
  switch (action.type) {
    case 'TOGGLE_FAVORITE_PENDING':
      return { ...state,
        isFetching: true
      }
    case 'TOGGLE_FAVORITE_FULFILLED':
      return { ...state,
        isFetching: false
      }
    case 'TOGGLE_FAVORITE_REJECTED':
      return { ...state,
        isFetching: false
      }
    case 'GET_FAVORITE_SCREENSHOTS_FULFILLED':
      return { ...state,
        isFetching: false
      }
    case 'GET_UPLOADED_SCREENSHOTS_FULFILLED':
      return { ...state,
        isFetching: false
      }
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
