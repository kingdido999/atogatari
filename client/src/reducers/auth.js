const initialState = {
  isFetching: false,
  isAuthenticated: localStorage.getItem('token') ? true : false
}

export default function auth(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_PENDING':
      return { ...state,
        isFetching: true,
        isAuthenticated: false
      }
    case 'LOGIN_FULFILLED':
      return { ...state,
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
      }
    case 'LOGIN_REJECTED':
      return { ...state,
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.payload
      }
    case 'SIGNUP_PENDING':
      return { ...state,
        isFetching: true,
        isAuthenticated: false
      }
    case 'SIGNUP_FULFILLED':
      return { ...state,
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
      }
    case 'SIGNUP_REJECTED':
      return { ...state,
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.payload
      }
    case 'LOGOUT_PENDING':
      return { ...state,
        isFetching: true,
        isAuthenticated: true
      }
    case 'LOGOUT_FULFILLED':
      return { ...state,
        isFetching: false,
        isAuthenticated: false,
        errorMessage: ''
      }
    case 'LOGOUT_REJECTED':
      return { ...state,
        isFetching: false,
        isAuthenticated: true,
        errorMessage: action.payload
      }
    default:
      return state
  }
}
