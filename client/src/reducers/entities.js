import merge from 'lodash/merge'
import { normalize } from 'normalizr'
import { favoriteSchema } from '../constants/schemas'

const initialState = {
  screenshots: {},
  favorites: {},
  tags: {},
  users: {}
}

export default function entities(state = initialState, action) {
  if (action.payload && action.payload.data && action.payload.data.entities) {
    return merge({}, state, action.payload.data.entities)
  }

  if (action.favorite) {
    return merge({}, state, normalize(action.favorite, favoriteSchema).entities)
  }

  return state
}
