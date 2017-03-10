
export default function authed (state = {
  isFetching: false,
  favorites: [],
  isUploading: false
}, action) {
  switch (action.type) {
    case 'GET_FAVORITES_PENDING':
      return { ...state,
        isFetching: true,
      }
    case 'GET_FAVORITES_FULFILLED':
      return { ...state,
        isFetching: false,
        favorites: action.payload.data.favorites
      }
    case 'GET_FAVORITES_REJECTED':
      return { ...state,
        isFetching: false,
      }
    case 'TOGGLE_FAVORITE_PENDING':
      return { ...state,
        isFetching: true
      }
    case 'TOGGLE_FAVORITE_FULFILLED':
      return { ...state,
        isFetching: false,
        favorites: action.payload.status === 201
          ? [ ...state.favorites, action.payload.data.screenshotId ]
          : state.favorites.filter(screenshotId => {
            return screenshotId !== action.payload.data.screenshotId
          })
      }
    case 'TOGGLE_FAVORITE_REJECTED':
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
