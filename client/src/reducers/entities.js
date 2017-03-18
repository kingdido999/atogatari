import merge from 'lodash/merge'

const initialState = {
  bangumis: {},
  screenshots: {},
  favorites: {},
  users: {}
}

export default function entities(state = initialState, action) {
  if (action.payload && action.payload.data && action.payload.data.entities) {
    return merge({}, state, action.payload.data.entities)
  }

  return state
}
