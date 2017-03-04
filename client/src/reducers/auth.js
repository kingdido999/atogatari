
export default function auth(state = {
  isFetching: false,
  isAuthenticated: localStorage.getItem('token') ? true : false
}, action) {
  switch (action.type) {
    case 'LOGIN_PENDING':
      return { ...state,
        isFetching: true,
        isAuthenticated: false
      }
    case 'LOGIN_FULFILLED':
      return { ...state,
        isFetching: false,
        isAuthenticated: true
      }
    case 'LOGIN_REJECTED':
      return { ...state,
        isFetching: false,
        isAuthenticated: false
      }
    case 'SIGNUP_PENDING':
      return { ...state,
        isFetching: true,
        isAuthenticated: false
      }
    case 'SIGNUP_FULFILLED':
      return { ...state,
        isFetching: false,
        isAuthenticated: true
      }
    case 'SIGNUP_REJECTED':
      return { ...state,
        isFetching: false,
        isAuthenticated: false
      }
    case 'LOGOUT_PENDING':
      return { ...state,
        isFetching: true,
        isAuthenticated: true
      }
    case 'LOGOUT_FULFILLED':
      return { ...state,
        isFetching: false,
        isAuthenticated: false
      }
    case 'LOGOUT_REJECTED':
      return { ...state,
        isFetching: false,
        isAuthenticated: true
      }
    default:
      return state
  }
}
