
export default function auth(state = {
  isFetching: false,
  isAuthenticated: localStorage.getItem('token') ? true : false,
  uid: null
}, action) {
  switch (action.type) {
    case 'LOGIN_PENDING':
      return { ...state,
        isFetching: true
      }
    case 'LOGIN_FULFILLED':
      return { ...state,
        isFetching: false,
        isAuthenticated: true,
        uid: action.payload.data.uid
      }
    case 'LOGIN_REJECTED':
      return { ...state,
        isFetching: false
      }
    case 'SIGNUP_PENDING':
      return { ...state,
        isFetching: true
      }
    case 'SIGNUP_FULFILLED':
      return { ...state,
        isFetching: false,
        isAuthenticated: true,
        uid: action.payload.data.uid
      }
    case 'SIGNUP_REJECTED':
      return { ...state,
        isFetching: false
      }
    case 'LOGOUT_PENDING':
      return { ...state,
        isFetching: true
      }
    case 'LOGOUT_FULFILLED':
      return { ...state,
        isFetching: false,
        isAuthenticated: false,
        uid: null
      }
    case 'LOGOUT_REJECTED':
      return { ...state,
        isFetching: false
      }
    default:
      return state
  }
}
