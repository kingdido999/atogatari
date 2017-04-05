export function setErrorMessage(message) {
	return {
		type: 'SET_ERROR_MESSAGE',
		message
	}
}

export function resetErrorMessage() {
	return {
		type: 'RESET_ERROR_MESSAGE'
	}
}
