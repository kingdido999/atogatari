
export default function errorMessage (state = null, action) {
  const { type, payload, error } = action

  if (type === 'RESET_ERROR_MESSAGE') {
    return null
  }

  if (error) {
    if (payload.response) {
      return payload.response.data
    } else {
      return 'Oops something went wrong...Please try again.'
    }
  }

  return state
}
