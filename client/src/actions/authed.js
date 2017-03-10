import { browserHistory } from 'react-router'
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

export function upload (data) {
  return {
    type: 'UPLOAD',
    payload: new Promise((resolve, reject) => {
      axios.post('/api/upload', data)
      .then(res => {
        browserHistory.push('/')
        resolve(res)
      })
      .catch(err => reject(err.response.data))
    })
  }
}
