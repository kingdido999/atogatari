import { normalize } from 'normalizr'
import { merge } from 'lodash'

import { ax, makeActionCreator } from '../utils'
import * as schemas from '../constants/schemas'

export const setTotal = makeActionCreator('SET_TOTAL', 'key', 'total')
export const setPages = makeActionCreator('SET_PAGES', 'key', 'pages')
export const setPage = makeActionCreator('SET_PAGE', 'page')
export const setLimit = makeActionCreator('SET_LIMIT', 'limit')
export const setSortBy = makeActionCreator('SET_SORT_BY', 'sortBy')
export const toggleNSFW = makeActionCreator('TOGGLE_NSFW')
export const setView = makeActionCreator('SET_VIEW', 'view')
export const setQuery = makeActionCreator('SET_QUERY', 'query')

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

export function getUserByIdIfNeeded(id) {
  return (dispatch, getState) => {
    const { entities } = getState()
    const { users } = entities
    const user = users[id]

    if (!user) {
      dispatch(getUserById(id))
    }
  }
}

export function getUserById(id) {
  return {
    type: 'GET_USER',
    payload: ax.get(`/user/${id}`, {
      transformResponse: [
        function(data) {
          return normalize(JSON.parse(data), schemas.userSchema)
        }
      ]
    })
  }
}

export function getFilteredScreenshots(params, reset) {
  return (dispatch, getState) => {
    if (reset) dispatch(resetScreenshotLists())

    const { filter, screenshotLists, routing } = getState()
    const { locationBeforeTransitions } = routing
    const { pathname } = locationBeforeTransitions
    const mergedParams = merge({}, filter, params)
    const key = JSON.stringify(merge({}, mergedParams, { pathname }))

    if (!screenshotLists[key]) {
      const url = pathname.split('/')

      if (pathname === '/') {
        dispatch(getScreenshots(mergedParams))
      } else if (pathname.match('/tag/')) {
        const name = url[url.length - 1]
        dispatch(getTagScreenshots(name, mergedParams))
      } else if (pathname.match('/favorites')) {
        const userId = url[url.length - 2]
        dispatch(getUserFavoriteScreenshots(userId, mergedParams))
      } else if (pathname.match('/uploads')) {
        const userId = url[url.length - 2]
        dispatch(getUserScreenshots(userId, mergedParams))
      }
    }
  }
}

export function getScreenshots(params) {
  return dispatch => {
    dispatch({
      type: 'GET_SCREENSHOTS_PENDING'
    })

    ax
      .get('/screenshots', { params })
      .then(res => {
        dispatch(receivePaginatedScreenshots(res.data))
      })
      .catch(err => {
        return {
          type: 'GET_SCREENSHOTS_REJECTED',
          payload: err
        }
      })
  }
}

export function getTagScreenshots(name, params) {
  return dispatch => {
    dispatch({
      type: 'GET_SCREENSHOTS_PENDING'
    })

    ax
      .get(`/tag/${name}/screenshots`, { params })
      .then(res => {
        dispatch(receivePaginatedScreenshots(res.data))
      })
      .catch(err => {
        return {
          type: 'GET_SCREENSHOTS_REJECTED',
          payload: err
        }
      })
  }
}

export function getUserScreenshots(userId, params) {
  return dispatch => {
    dispatch({
      type: 'GET_SCREENSHOTS_PENDING'
    })

    ax
      .get(`/user/${userId}/screenshots`, { params })
      .then(res => {
        dispatch(receivePaginatedScreenshots(res.data))
      })
      .catch(err => {
        return {
          type: 'GET_SCREENSHOTS_REJECTED',
          payload: err
        }
      })
  }
}

export function getUserFavoriteScreenshots(userId, params) {
  return dispatch => {
    dispatch({
      type: 'GET_SCREENSHOTS_PENDING'
    })

    ax
      .get(`/user/${userId}/favoriteScreenshots`, { params })
      .then(res => {
        dispatch(receivePaginatedScreenshots(res.data))
      })
      .catch(err => {
        return {
          type: 'GET_SCREENSHOTS_REJECTED',
          payload: err
        }
      })
  }
}

export function receivePaginatedScreenshots(data) {
  return (dispatch, getState) => {
    const { filter, routing } = getState()
    const { locationBeforeTransitions } = routing
    const { pathname } = locationBeforeTransitions
    const { sortBy, nsfw } = filter
    const { docs, total, limit, pages, page } = data
    const normalizedData = normalize(docs, [schemas.screenshotSchema])
    const key = JSON.stringify({ sortBy, nsfw, limit, page, pathname })

    dispatch(receiveScreenshots(key, { data: normalizedData }))
    dispatch(setTotal(key, total))
    dispatch(setPages(key, pages))
    dispatch(setLimit(limit))
    dispatch(setPage(page))
  }
}

export function receiveScreenshots(key, payload) {
  return {
    type: 'GET_SCREENSHOTS_FULFILLED',
    key,
    payload
  }
}

export function resetScreenshotLists() {
  return {
    type: 'RESET_SCREENSHOT_LISTS'
  }
}

export function getScreenshotIfNeeded(id) {
  return (dispatch, getState) => {
    const { entities } = getState()
    const { screenshots } = entities

    if (!screenshots[id]) {
      dispatch(getScreenshot(id))
    }
  }
}

export function getScreenshot(id) {
  return {
    type: 'GET_SCREENSHOT',
    payload: ax.get(`/screenshot/${id}`, {
      transformResponse: [
        function(data) {
          return normalize(JSON.parse(data), schemas.screenshotSchema)
        }
      ]
    })
  }
}

export function downloadScreenshot(screenshotId) {
  return {
    type: 'DOWNLOAD_SCREENSHOT',
    payload: ax.post('/screenshot/download', { screenshotId })
  }
}

export function getTags(params) {
  return {
    type: 'GET_TAGS',
    payload: ax.get('/tags', {
      params,
      transformResponse: [
        function(data) {
          return normalize(JSON.parse(data), [schemas.tagSchema])
        }
      ]
    })
  }
}

export function getTagIfNeeded(name) {
  return (dispatch, getState) => {
    const { entities } = getState()
    const { tags } = entities
    const tag = tags[name]

    if (!tag) {
      dispatch(getTag(name))
    }
  }
}

export function getTag(name) {
  return {
    type: 'GET_TAG',
    payload: ax.get(`/tag/${name}`, {
      transformResponse: [
        function(data) {
          return normalize(JSON.parse(data), schemas.tagSchema)
        }
      ]
    })
  }
}

export function search(params) {
  return {
    type: 'SEARCH',
    payload: ax.get('/search', { params })
  }
}
