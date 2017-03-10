
export default function authed (state = {
  isFetching: false,
  favorites: [],
  favoriteScreenshots: [],
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
      const added = action.payload.status === 201
      const targetScreenshotId = action.payload.data.screenshotId

      return { ...state,
        isFetching: false,
        favorites: added
          ? [ ...state.favorites, targetScreenshotId ]
          : state.favorites.filter(screenshotId => {
            return screenshotId !== targetScreenshotId
          }),
        favoriteScreenshots: added
          ? state.favoriteScreenshots
          : state.favoriteScreenshots.filter(screenshot => screenshot._id !== targetScreenshotId)
      }
    case 'TOGGLE_FAVORITE_REJECTED':
      return { ...state,
        isFetching: false
      }
    case 'GET_FAVORITE_SCREENSHOTS_PENDING':
      return { ...state,
        isFetching: true,
      }
    case 'GET_FAVORITE_SCREENSHOTS_FULFILLED':
      return { ...state,
        isFetching: false,
        favoriteScreenshots: action.payload.data.screenshots
      }
    case 'GET_FAVORITE_SCREENSHOTS_REJECTED':
      return { ...state,
        isFetching: false,
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
