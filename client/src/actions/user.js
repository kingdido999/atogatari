import { normalize } from 'normalizr'
import { getAuthHeader } from '../utils'
import axios from 'axios'

import * as schemas from '../constants/schemas'

export function login (creds) {
  return {
    type: 'LOGIN',
    payload: new Promise((resolve, reject) => {
      axios.post('/login', creds)
      .then(res => {
        localStorage.setItem('token', res.data.token)
        resolve(res)
      })
      .catch(err => {
        reject(err.response.data)
      })
    })
  }
}

export function signup (creds) {
  return {
    type: 'SIGNUP',
    payload: new Promise((resolve, reject) => {
      axios.post('/signup', creds)
      .then(res => {
        localStorage.setItem('token', res.data.token)
        resolve(res)
      })
      .catch(err => {
        reject(err.response.data)
      })
    })
  }
}

export function logout () {
  return {
    type: 'LOGOUT',
    payload: new Promise((resolve, reject) => {
      try {
        localStorage.removeItem('token')
        resolve()
      } catch(e) {
        reject(e)
      }
    })
  }
}

export function getUserFavoritesIfNeeded () {
  return (dispatch, getState) => {
    const { user } = getState()
    const { isAuthenticated, favorites } = user

    if (isAuthenticated && favorites.ids.length === 0) {
      dispatch(getUserFavorites())
    }
  }
}

export function getUserFavorites () {
  return {
    type: 'GET_USER_FAVORITES',
    payload: axios.post('/user/favorites', {}, {
      headers: getAuthHeader(),
      transformResponse: [function(data) {
        return normalize(JSON.parse(data), [schemas.favoriteSchema])
      }]
    })
  }
}

export function toggleFavorite (params) {
  return dispatch => {
    axios.post('/user/favorite', params, {
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
    payload: axios.post('/user/favoriteScreenshots', params, {
      headers: getAuthHeader()
    })
  }
}

export function getUploadedScreenshotsIfNeeded () {
  return (dispatch, getState) => {
    const { user } = getState()
    const { isAuthenticated, screenshots } = user

    if (isAuthenticated && screenshots.ids.length === 0) {
      dispatch(getUploadedScreenshots())
    }
  }
}

export function getUploadedScreenshots () {
  return {
    type: 'GET_UPLOADED_SCREENSHOTS',
    payload: axios.post('/user/uploadedScreenshots', {}, {
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
    payload: axios.post('/upload', data, {
      headers: getAuthHeader()
    })
  }
}
