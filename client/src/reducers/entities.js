
const initialState = {
  isFetching: false,
  selectedBangumi: null,
  bangumis: [],
  screenshots: []
}

export default function entities (state = initialState, action) {
  switch (action.type) {
    case 'GET_BANGUMIS_PENDING':
      return { ...state,
        isFetching: true
      }
    case 'GET_BANGUMIS_FULFILLED':
      return { ...state,
        isFetching: false,
        bangumis: action.payload.data.bangumis
      }
    case 'GET_BANGUMIS_REJECTED':
      return { ...state,
        isFetching: false
      }
    case 'GET_BANGUMI_PENDING':
      return { ...state,
        isFetching: true
      }
    case 'GET_BANGUMI_FULFILLED':
      return { ...state,
        isFetching: false,
        selectedBangumi: action.payload.data.bangumi,
        screenshots: action.payload.data.bangumi.screenshots
      }
    case 'GET_BANGUMI_REJECTED':
      return { ...state,
        isFetching: false
      }
    case 'TOGGLE_FAVORITE_FULFILLED':
      const added = action.payload.status === 201
      const targetFavorite = action.payload.data.favorite

      return { ...state,
        screenshots: state.screenshots.map(screenshot => {
          if (screenshot._id !== targetFavorite.screenshot) {
            return screenshot
          }

          return {
            ...screenshot,
            favorites: added
            ? [ ...screenshot.favorites, targetFavorite ]
            : screenshot.favorites.filter(favorite => {
              return favorite._id !== targetFavorite._id
            })
          }
        })
      }
    case 'GET_FAVORITE_SCREENSHOTS_FULFILLED':
      return { ...state,
        isFetching: false,
        screenshots: action.payload.data.screenshots
      }
    case 'GET_UPLOADED_SCREENSHOTS_FULFILLED':
      return { ...state,
        isFetching: false,
        screenshots: action.payload.data.screenshots
      }
    default:
      return state
  }
}
