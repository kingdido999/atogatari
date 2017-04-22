import { normalize } from 'normalizr'
import { ax, getAuthHeader } from '../utils'

import * as schemas from '../constants/schemas'

export function login(creds) {
  return {
    type: 'LOGIN',
    payload: new Promise((resolve, reject) => {
      ax
        .post('/user/login', creds)
        .then(res => {
          localStorage.setItem('token', res.data.token)
          resolve(res)
        })
        .catch(err => reject(err))
    })
  }
}

export function signup(creds) {
  return {
    type: 'SIGNUP',
    payload: new Promise((resolve, reject) => {
      ax
        .post('/user/signup', creds)
        .then(res => {
          localStorage.setItem('token', res.data.token)
          resolve(res)
        })
        .catch(err => reject(err))
    })
  }
}

export function logoutIfNeeded() {
  return (dispatch, getState) => {
    const { user } = getState()
    const { isAuthenticated, uid } = user

    if (isAuthenticated && uid === null) {
      dispatch(logout())
    }
  }
}

export function logout() {
  return {
    type: 'LOGOUT',
    payload: new Promise((resolve, reject) => {
      try {
        localStorage.removeItem('token')
        resolve()
      } catch (e) {
        reject(e)
      }
    })
  }
}

export function getAuthedUserIfNeeded() {
  return (dispatch, getState) => {
    const { user } = getState()
    const { isAuthenticated, uid } = user

    if (isAuthenticated && uid === null) {
      dispatch(getAuthedUser()).then(() => {}).catch(() => dispatch(logout()))
    }
  }
}

export function getAuthedUser() {
  return {
    type: 'GET_AUTHED_USER',
    payload: ax.post(
      '/user',
      {},
      {
        headers: getAuthHeader(),
        transformResponse: [
          function(data) {
            return normalize(JSON.parse(data), schemas.userSchema)
          }
        ]
      }
    )
  }
}

export function getUserFavorites() {
  return {
    type: 'GET_USER_FAVORITES',
    payload: ax.post(
      '/user/favorites',
      {},
      {
        headers: getAuthHeader(),
        transformResponse: [
          function(data) {
            return normalize(JSON.parse(data), [schemas.favoriteSchema])
          }
        ]
      }
    )
  }
}

export function addFavorite(screenshotId) {
  return {
    type: 'ADD_FAVORITE',
    payload: ax.post(
      '/favorite',
      { screenshotId },
      {
        headers: getAuthHeader()
      }
    )
  }
}

export function removeFavorite(screenshotId) {
  return {
    type: 'REMOVE_FAVORITE',
    payload: ax.delete('/favorite', {
      params: { screenshotId },
      headers: getAuthHeader()
    })
  }
}

export function upload(data) {
  return {
    type: 'UPLOAD',
    payload: ax.post('/screenshot/upload', data, {
      headers: getAuthHeader()
    })
  }
}

export function deleteScreenshot(id) {
  return {
    type: 'DELETE_SCREENSHOT',
    payload: ax.delete(`/screenshot/${id}`, {
      headers: getAuthHeader()
    })
  }
}

export function addTag(name, screenshotId) {
  return {
    type: 'ADD_TAG',
    payload: ax.post(
      '/tag',
      { name, screenshotId },
      {
        headers: getAuthHeader()
      }
    )
  }
}

export function deleteTag(name, screenshotId) {
  return {
    type: 'DELETE_TAG',
    payload: ax.delete(`/tag/${name}`, {
      params: { screenshotId },
      headers: getAuthHeader()
    })
  }
}

export function updateTag(name, params) {
  return {
    type: 'UPDATE_TAG',
    payload: ax.put(`/tag/${name}`, params, {
      headers: getAuthHeader()
    })
  }
}
