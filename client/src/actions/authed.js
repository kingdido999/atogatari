import { normalize } from 'normalizr'
import { ax } from '../utils'
import * as schemas from '../constants/schemas'

const config = () => {
  return {
    headers: {
      Authorization: localStorage.getItem('token')
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
    payload: ax.post('/favorite', { screenshotId }, config())
  }
}

export function removeFavorite(screenshotId) {
  return {
    type: 'REMOVE_FAVORITE',
    payload: ax.delete(
      '/favorite',
      {
        params: { screenshotId }
      },
      config()
    )
  }
}

export function uploadScreenshot(data) {
  return {
    type: 'UPLOAD',
    payload: ax.post('/screenshot/upload', data, config())
  }
}

export function deleteScreenshot(id) {
  return {
    type: 'DELETE_SCREENSHOT',
    payload: ax.delete(`/screenshot/${id}`, config())
  }
}

export function addTag(name, screenshotId) {
  return {
    type: 'ADD_TAG',
    payload: ax.post('/tag', { name, screenshotId }, config())
  }
}

export function deleteTagFromScreenshot(name, screenshotId) {
  return {
    type: 'DELETE_TAG_FROM_SCREENSHOT',
    payload: ax.delete(
      `/tag/${name}`,
      {
        params: { screenshotId }
      },
      config()
    )
  }
}

export function updateTagType(name, fromType, toType) {
  return dispatch => {
    dispatch({
      type: 'UPDATE_TAG_PENDING'
    })
    ax
      .put(`/tag/${name}`, { type: toType }, config())
      .then(res => {
        dispatch({
          type: 'UPDATE_TAG_FULFILLED',
          payload: res
        })
        dispatch(removeTagFromList(name, fromType))
        dispatch(addTagToList(name, toType))
      })
      .catch(err => dispatch({ type: 'UPDATE_TAG_REJECTED', payload: err }))
  }
}

export function updateTag(name, params) {
  return {
    type: 'UPDATE_TAG',
    payload: ax.put(`/tag/${name}`, params, config())
  }
}

export function removeTagFromList(name, tagType) {
  return {
    type: 'REMOVE_TAG_FROM_LIST',
    name,
    tagType
  }
}

export function addTagToList(name, tagType) {
  return {
    type: 'ADD_TAG_TO_LIST',
    name,
    tagType
  }
}

export function setScreenshotNSFW(screenshotId, nsfw) {
  return dispatch => dispatch(updateScreenshot(screenshotId, { nsfw }))
}

export function updateScreenshot(screenshotId, params) {
  return {
    type: 'UPDATE_SCREENSHOT',
    payload: ax.put(`/screenshot/${screenshotId}`, params, config())
  }
}
