import { normalize } from 'normalizr'
import axios from 'axios'
import { getAuthHeader } from '../utils'

import * as schemas from '../constants/schemas'

export function getUserFavorites () {
  return {
    type: 'GET_FAVORITES',
    payload: axios.post('/api/user/favorites', {}, {
      headers: getAuthHeader().headers,
      transformResponse: [function(data) {
        return normalize(JSON.parse(data), schemas.favoriteListSchema).entities
      }]
    })
  }
}

export function toggleFavorite (params) {
  return {
    type: 'TOGGLE_FAVORITE',
    payload: axios.post('/api/user/favorite', params, {
      headers: getAuthHeader().headers,
      transformResponse: [function(data) {
        return normalize(JSON.parse(data), schemas.favoriteSchema).entities
      }]
    })
  }
}

export function getFavoriteScreenshots (params) {
  return {
    type: 'GET_FAVORITE_SCREENSHOTS',
    payload: axios.post('/api/user/favoriteScreenshots', params, getAuthHeader())
  }
}

export function getUploadedScreenshots (params) {
  return {
    type: 'GET_UPLOADED_SCREENSHOTS',
    payload: axios.post('/api/user/uploadedScreenshots', params, getAuthHeader())
  }
}

export function upload (data) {
  return {
    type: 'UPLOAD',
    payload: axios.post('/api/upload', data, getAuthHeader())
  }
}
