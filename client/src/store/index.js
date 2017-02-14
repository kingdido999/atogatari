import { routerReducer } from 'react-router-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import promiseMiddleware from 'redux-promise-middleware'
import reducers from '../reducers'

const middleware = [ thunk, promiseMiddleware() ];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const store = createStore(combineReducers({
  ...reducers,
  routing: routerReducer,
}),
  applyMiddleware(...middleware)
)

export default store
