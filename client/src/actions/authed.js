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

export function getFavoriteScreenshots (params) {
  return {
    type: 'GET_FAVORITE_SCREENSHOTS',
    payload: axios.post('/api/user/favoriteScreenshots', params)
  }
}

export function getUploadedScreenshots (params) {
  return {
    type: 'GET_UPLOADED_SCREENSHOTS',
    payload: axios.post('/api/user/uploadedScreenshots', params)
  }
}

export function removeScreenshot (id) {
  return {
    type: 'REMOVE_SCREENSHOT',
    payload: id
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
