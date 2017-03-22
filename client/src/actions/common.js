export function resetErrorMessage() {
  return (dispatch, getState) => {
    const { errorMessage } = getState()

    if (typeof errorMessage === 'string') {
      dispatch({
        type: 'RESET_ERROR_MESSAGE'
      })
    }
  }
}
