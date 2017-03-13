import { omit } from 'lodash'

const initialState = {
  isUploading: false,
  favorites: {}
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
    case 'GET_FAVORITES_PENDING':
      return { ...state,
      }
    case 'GET_FAVORITES_FULFILLED':
      console.log(action.payload.data)
      return { ...state,
        favorites: action.payload.data.favorites
      }
    case 'GET_FAVORITES_REJECTED':
      return { ...state,
      }
    case 'TOGGLE_FAVORITES_PENDING':
      return { ...state,
      }
    case 'TOGGLE_FAVORITES_FULFILLED':
      const added = action.payload.status === 201
      console.log(action.payload.data)

      return { ...state,
        favorites: added
        ? Object.assign({}, state.favorites, action.payload.data.favorite)
        : omit(state.favorites, action.payload.data.favorite.screenshot)
      }
    case 'TOGGLE_FAVORITES_REJECTED':
      return { ...state,
      }
    default:
      return state
  }
}
