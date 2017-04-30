import { omit } from 'lodash'

function tagList(
  state = {
    isFetching: false,
    names: []
  },
  action
) {
  switch (action.type) {
    case 'GET_TAGS_FULFILLED':
      return {
        ...state,
        names: action.payload.data.result
      }
    case 'ADD_TAG_FULFILLED':
      return {
        ...state,
        names: [...state.names, action.payload.data.name]
      }
    case 'REMOVE_TAG_FROM_LIST':
      return {
        ...state,
        names: state.names.filter(name => name !== action.name)
      }
    case 'ADD_TAG_TO_LIST':
      return {
        ...state,
        names: [...state.names, action.name]
      }
    default:
      return state
  }
}

export default function tagLists(state = {}, action) {
  switch (action.type) {
    case 'GET_TAGS_FULFILLED':
      return {
        ...state,
        [action.tagType]: tagList(state[action.tagType], action)
      }
    case 'ADD_TAG_FULFILLED':
      return {
        ...state,
        [action.payload.data.type]: tagList(
          state[action.payload.data.type],
          action
        )
      }
    case 'REMOVE_TAG_FROM_LIST':
      return {
        ...state,
        [action.tagType]: tagList(state[action.tagType], action)
      }
    case 'ADD_TAG_TO_LIST':
      return {
        ...state,
        [action.tagType]: tagList(state[action.tagType], action)
      }
    case 'RESET_TAG_LIST':
      return omit(state, action.tagType)
    default:
      return state
  }
}
