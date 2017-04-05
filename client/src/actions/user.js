import { normalize } from 'normalizr'
import { ax, getAuthHeader } from '../utils'

import * as schemas from '../constants/schemas'

export function login (creds) {
  return {
    type: 'LOGIN',
    payload: new Promise((resolve, reject) => {
      ax.post('/login', creds)
      .then(res => {
        localStorage.setItem('token', res.data.token)
        resolve(res)
      })
      .catch(err => reject(err))
    })
  }
}

export function signup (creds) {
  return {
    type: 'SIGNUP',
    payload: new Promise((resolve, reject) => {
      ax.post('/signup', creds)
      .then(res => {
        localStorage.setItem('token', res.data.token)
        resolve(res)
      })
      .catch(err => reject(err))
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

export function getAuthedUserIfNeeded () {
  return (dispatch, getState) => {
    const { user } = getState()
    const { isAuthenticated, uid } = user

    if (isAuthenticated && uid === null) {
      dispatch(getAuthedUser())
    }
  }
}

export function getAuthedUser () {
  return {
    type: 'GET_AUTHED_USER',
    payload: ax.post('/user', {}, {
      headers: getAuthHeader(),
      transformResponse: [function(data) {
        return normalize(JSON.parse(data), schemas.userSchema)
      }]
    })
  }
}

export function getUserFavoritesIfNeeded () {
  return (dispatch, getState) => {
    const { user, userFavorites } = getState()
    const { isAuthenticated, uid } = user

    if (isAuthenticated && userFavorites[uid] && userFavorites[uid].ids.length === 0) {
      dispatch(getUserFavorites())
    }
  }
}

export function getUserFavorites () {
  return {
    type: 'GET_USER_FAVORITES',
    payload: ax.post('/user/favorites', {}, {
      headers: getAuthHeader(),
      transformResponse: [function(data) {
        return normalize(JSON.parse(data), [schemas.favoriteSchema])
      }]
    })
  }
}

export function toggleFavorite (params) {
  return dispatch => {
    ax.post('/user/favorite', params, {
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
    payload: ax.post('/user/favoriteScreenshots', params, {
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
    payload: ax.post('/user/uploadedScreenshots', {}, {
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
    payload: ax.post('/upload', data, {
      headers: getAuthHeader()
    })
  }
}

export function deleteScreenshot (id) {
  return {
    type: 'DELETE_SCREENSHOT',
    payload: ax.delete(`/screenshot/${id}`, {
      headers: getAuthHeader()
    })
  }
}

export function addTag (name, screenshotId) {
  return {
    type: 'ADD_TAG',
    payload: ax.post('/tag', { name, screenshotId }, {
      headers: getAuthHeader()
    })
  }
}

export function removeTag (name) {
  return {
    type: 'REMOVE_TAG',
    payload: ax.delete(`/tag/${name}`, {
      headers: getAuthHeader()
    })
  }
}
