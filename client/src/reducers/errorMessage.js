
export default function errorMessage (state = null, action) {
  const { type, payload } = action

  if (type === 'RESET_ERROR_MESSAGE') {
    return null
  } else if (typeof payload === 'string') {
    // Assuming when error occurs, the payload is a String
    return payload
  }

  return state
}
