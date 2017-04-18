import { makeActionCreator } from '../utils'

export const setErrorMessage = makeActionCreator('SET_ERROR_MESSAGE', 'message')
export const resetErrorMessage = makeActionCreator('RESET_ERROR_MESSAGE')

export function resetErrorMessageIfNeeded() {
	return (dispatch, getState) => {
		const { errorMessage } = getState()

		if (errorMessage) {
			dispatch(resetErrorMessage())
		}
	}
}

