import { normalize } from 'normalizr'
import { ax } from '../utils'
import * as schemas from '../constants/schemas'

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
      dispatch(getAuthedUser()).catch(() => dispatch(logout()))
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
        transformResponse: [
          function(data) {
            return normalize(JSON.parse(data), schemas.userSchema)
          }
        ]
      }
    )
  }
}

export function addFavorite(screenshotId) {
  return {
    type: 'ADD_FAVORITE',
    payload: ax.post('/favorite', { screenshotId })
  }
}

export function removeFavorite(screenshotId) {
  return {
    type: 'REMOVE_FAVORITE',
    payload: ax.delete('/favorite', {
      params: { screenshotId }
    })
  }
}

export function uploadScreenshot(data) {
  return {
    type: 'UPLOAD',
    payload: ax.post('/screenshot/upload', data)
  }
}

export function deleteScreenshot(id) {
  return {
    type: 'DELETE_SCREENSHOT',
    payload: ax.delete(`/screenshot/${id}`)
  }
}

export function addTag(name, screenshotId) {
  return {
    type: 'ADD_TAG',
    payload: ax.post('/tag', { name, screenshotId })
  }
}

export function deleteTag(name, screenshotId) {
  return {
    type: 'DELETE_TAG',
    payload: ax.delete(`/tag/${name}`, {
      params: { screenshotId }
    })
  }
}

export function updateTag(name, params) {
  return {
    type: 'UPDATE_TAG',
    payload: ax.put(`/tag/${name}`, params)
  }
}
