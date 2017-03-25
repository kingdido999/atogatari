
export default function errorMessage (state = null, action) {
  const { type, payload, error } = action

  if (type === 'RESET_ERROR_MESSAGE') {
    return null
  }

  if (error) {
    return payload.response.data
  }

  return state
}
