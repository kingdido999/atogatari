import axios from 'axios'

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

export function upload (data) {
  return {
    type: 'UPLOAD',
    payload: axios.post('/api/upload', data)
  }
}
