import { applyMiddleware } from 'redux'
import { loadingBarMiddleware } from 'react-redux-loading-bar'

import promise from 'redux-promise-middleware'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

const middlewareList = [promise(), thunk, loadingBarMiddleware()]

if (process.env.NODE_ENV !== 'production') {
	middlewareList.push(logger())
}

export default applyMiddleware(...middlewareList)
