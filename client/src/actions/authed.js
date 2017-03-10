import axios from 'axios'

export function getFavorites (params) {
  return {
    type: 'GET_FAVORITES',
    payload: axios.post('/api/user/favorites', params)
  }
}

export function toggleFavorite (params) {
  return {
    type: 'TOGGLE_FAVORITE',
    payload: axios.post('/api/user/favorite', params)
  }
}
