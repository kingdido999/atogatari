import { applyMiddleware } from 'redux'

import promise from 'redux-promise-middleware'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

const middlewareList = [ promise(), thunk ]

if (process.env.NODE_ENV !== 'production') {
  middlewareList.push(logger())
}

export default applyMiddleware(...middlewareList)
