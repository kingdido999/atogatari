import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'

import user from './user'
import search from './search'
import entities from './entities'
import screenshots from './screenshots'
import tags from './tags'
import environment from './environment'
import errorMessage from './errorMessage'

export default combineReducers({
	user,
	search,
	entities,
	screenshots,
	tags,
	environment,
	errorMessage,
	routing: routerReducer
})
