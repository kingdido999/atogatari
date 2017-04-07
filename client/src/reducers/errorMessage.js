
export default function errorMessage (state = null, action) {
  const { type, payload, error } = action

  if (type === 'RESET_ERROR_MESSAGE') {
    return null
  }

  if (type === 'SET_ERROR_MESSAGE') {
    return action.message
  }

  if (error) {
    if (payload.response) {
      return payload.response.data
    } else if (typeof payload === 'string') {
      return payload
    } else {
      return 'Oops something went wrong...Please try again.'
    }
  }

  return state
}
