
export default function favorite (state = {
  isFetching: false,
  favorites: []
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
    case 'ADD_FAVORITE_PENDING':
      return { ...state,
        isFetching: true
      }
    case 'ADD_FAVORITE_FULFILLED':
      return { ...state,
        isFetching: false,
        favorites: [ ...state.favorites, action.payload.data.favorite ]
      }
    case 'ADD_FAVORITE_REJECTED':
      return { ...state,
        isFetching: false
      }
    case 'REMOVE_FAVORITE_PENDING':
      return { ...state,
        isFetching: true
      }
    case 'REMOVE_FAVORITE_FULFILLED':
      return { ...state,
        isFetching: false,
        favorites: state.favorites.filter(favorite => {
          return favorite.screenshot._id !== action.payload.data.favorite.screenshot
        })
      }
    case 'REMOVE_FAVORITE_REJECTED':
      return { ...state,
        isFetching: false
      }
    default:
      return state
  }
}
