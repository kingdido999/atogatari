
export default function favorite (state = {
  favorites: []
}, action) {
  switch (action.type) {
    case 'GET_FAVORITES_PENDING':
      return { ...state,
        favorites: []
      }
    case 'GET_FAVORITES_FULFILLED':
      return { ...state,
        favorites: action.payload.data.favorites
      }
    case 'GET_FAVORITES_REJECTED':
      return { ...state,
        favorites: []
      }
    case 'ADD_FAVORITE_FULFILLED':
      return { ...state,
        favorites: [ ...state.favorites, action.payload.data.favorite ]
      }
    case 'REMOVE_FAVORITE_FULFILLED':
      return { ...state,
        favorites: state.favorites.filter(favorite => {
          return favorite.screenshot._id !== action.payload.data.favorite.screenshot
        })
      }
    default:
      return state
  }
}
