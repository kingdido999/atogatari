import { makeActionCreator } from '../utils'

export function resetErrorMessageIfNeeded() {
	return (dispatch, getState) => {
		const { errorMessage } = getState()

		if (errorMessage) {
			dispatch(resetErrorMessage())
		}
	}
}

export const setErrorMessage = makeActionCreator('SET_ERROR_MESSAGE', 'message')
export const resetErrorMessage = makeActionCreator('RESET_ERROR_MESSAGE')
