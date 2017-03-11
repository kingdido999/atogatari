
export default function authed (state = {
  isFetching: false,
  favoriteScreenshots: [],
  isUploading: false
}, action) {
  switch (action.type) {
    case 'TOGGLE_FAVORITE_PENDING':
      return { ...state,
        isFetching: true
      }
    case 'TOGGLE_FAVORITE_FULFILLED':
      const added = action.payload.status === 201
      const targetFavorite = action.payload.data.favorite

      return { ...state,
        isFetching: false,
        favoriteScreenshots: added
          ? [ ...state.favoriteScreenshots, targetFavorite.screenshot ]
          : state.favoriteScreenshots.filter(screenshot => {
            return screenshot._id !== targetFavorite.screenshot._id
          })
      }
    case 'TOGGLE_FAVORITE_REJECTED':
      return { ...state,
        isFetching: false
      }
    case 'GET_FAVORITE_SCREENSHOTS_FULFILLED':
      return { ...state,
        isFetching: false,
        favoriteScreenshots: action.payload.data.screenshots
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
