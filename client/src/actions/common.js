export function setErrorMessage(message) {
	return {
		type: 'SET_ERROR_MESSAGE',
		message
	}
}

export function resetErrorMessageIfNeeded () {
	return (dispatch, getState) => {
		const { errorMessage } = getState()

		if (errorMessage) {
			dispatch(resetErrorMessage())
		}
	}
}

export function resetErrorMessage() {
	return {
		type: 'RESET_ERROR_MESSAGE'
	}
}
