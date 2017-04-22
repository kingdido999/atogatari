import { combineReducers } from 'redux'

const ITEM_WIDTH = 380
const MAX_ITEMS_PER_ROW = 3

export default combineReducers({
  view,
  itemsPerRow
})

function view(state = 'grid', action) {
  switch (action.type) {
    case 'SET_VIEW':
      return action.view
    default:
      return state
  }
}

function itemsPerRow(state = MAX_ITEMS_PER_ROW, action) {
  switch (action.type) {
    case 'CHANGE_WIDTH_AND_HEIGHT':
      return Math.min(Math.floor(action.width / ITEM_WIDTH), MAX_ITEMS_PER_ROW)
    default:
      return state
  }
}
