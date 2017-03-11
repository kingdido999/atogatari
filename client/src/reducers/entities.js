
const initialState = {
  isFetching: false,
  selectedBangumi: null,
  bangumis: [],
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
        selectedBangumi: action.payload.data.bangumi
      }
    case 'GET_BANGUMI_REJECTED':
      return { ...state,
        isFetching: false
      }
    case 'TOGGLE_FAVORITE_FULFILLED':
      if (!state.selectedBangumi) return state

      const added = action.payload.status === 201
      const targetFavorite = action.payload.data.favorite

      return { ...state,
        selectedBangumi: {
          ...state.selectedBangumi,
          screenshots: state.selectedBangumi.screenshots.map(screenshot => {
            if (screenshot._id !== targetFavorite.screenshot._id) {
              return screenshot
            }

            return {
              ...screenshot,
              favorites: added
              ? [ ...screenshot.favorites, targetFavorite ]
              : screenshot.favorites.filter(favorite => {
                return favorite.screenshot._id !== targetFavorite.screenshot._id
              })
            }
          })
        }
      }
    default:
      return state
  }
}
