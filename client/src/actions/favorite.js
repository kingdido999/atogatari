import axios from 'axios'

export function addFavorite (params) {
  return {
    type: 'ADD_FAVORITE',
    payload: axios.post('/api/favorite', params)
  }
}

export function removeFavorite (params) {
  return {
    type: 'REMOVE_FAVORITE',
    payload: axios({
      method: 'delete',
      url: '/api/favorite',
      data: params
    })
  }
}

export function getFavorites (params) {
  return {
    type: 'GET_FAVORITES',
    payload: axios.post('/api/favorites', params)
  }
}
