import { normalize } from 'normalizr'
import axios from 'axios'
import { getAuthHeader } from '../utils'

import * as schemas from '../constants/schemas'

export function getUserFavoritesIfNeeded () {
  return (dispatch, getState) => {
    const { authed } = getState()
    const { favorites } = authed

    if (favorites.ids.length === 0) {
      dispatch(getUserFavorites())
    }
  }
}

export function getUserFavorites () {
  return {
    type: 'GET_USER_FAVORITES',
    payload: axios.post('/api/user/favorites', {}, {
      headers: getAuthHeader(),
      transformResponse: [function(data) {
        return normalize(JSON.parse(data), [schemas.favoriteSchema])
      }]
    })
  }
}

export function toggleFavorite (params) {
  return dispatch => {
    axios.post('/api/user/favorite', params, {
      headers: getAuthHeader()
    })
    .then(res => {
      if (res.status === 201) {
        dispatch(addFavorite(res.data))
      } else {
        dispatch(removeFavorite(res.data))
      }
    })
  }
}

export function addFavorite (favorite) {
  return {
    type: 'ADD_FAVORITE',
    favorite
  }
}

export function removeFavorite (favorite) {
  return {
    type: 'REMOVE_FAVORITE',
    favorite
  }
}

export function getFavoriteScreenshots (params) {
  return {
    type: 'GET_FAVORITE_SCREENSHOTS',
    payload: axios.post('/api/user/favoriteScreenshots', params, {
      headers: getAuthHeader()
    })
  }
}

export function getUploadedScreenshots () {
  return {
    type: 'GET_UPLOADED_SCREENSHOTS',
    payload: axios.post('/api/user/uploadedScreenshots', {}, {
      headers: getAuthHeader(),
      transformResponse: [function(data) {
        return normalize(JSON.parse(data), [schemas.screenshotSchema])
      }]
    })
  }
}

export function upload (data) {
  return {
    type: 'UPLOAD',
    payload: axios.post('/api/upload', data, {
      headers: getAuthHeader()
    })
  }
}
