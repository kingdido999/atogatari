import axios from 'axios'

export function addFavorite (params) {
  return {
    type: 'ADD_FAVORITE',
    payload: axios.post('/api/user/favorite', params)
  }
}

export function removeFavorite (params) {
  return {
    type: 'REMOVE_FAVORITE',
    payload: axios({
      method: 'delete',
      url: '/api/user/favorite',
      data: params
    })
  }
}

export function getFavorites (params) {
  return {
    type: 'GET_FAVORITES',
    payload: axios.post('/api/user/favorites', params)
  }
}
