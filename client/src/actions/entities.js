import { normalize } from 'normalizr'
import { ax } from '../utils'

import { makeActionCreator } from '../utils'
import * as schemas from '../constants/schemas'

export const setTotal = makeActionCreator('SET_TOTAL', 'total')
export const setPages = makeActionCreator('SET_PAGES', 'pages')
export const setPage = makeActionCreator('SET_PAGE', 'page')
export const setLimit = makeActionCreator('SET_LIMIT', 'limit')
export const setSortBy = makeActionCreator('SET_SORT_BY', 'sortBy')
export const toggleNSFW = makeActionCreator('TOGGLE_NSFW')
export const setView = makeActionCreator('SET_VIEW', 'view')

export function search(params) {
  return {
    type: 'SEARCH',
    payload: ax.get('/search', { params })
  }
}

export function getScreenshotsByUserIdIfNeeded(userId) {
  return (dispatch, getState) => {
    const { entities } = getState()
    const { users } = entities

    if (!users[userId]) {
      dispatch(getScreenshotsByUserId(userId))
    }
  }
}

export function getScreenshotsByUserId(userId) {
  return getScreenshots({ user: userId })
}

export function getFilteredScreenshots() {
  return (dispatch, getState) => {
    const { filter, screenshotLists } = getState()
    const { sortBy, nsfw, total, pages, page, limit } = filter
    const key = JSON.stringify({ sortBy, nsfw, total, limit, pages, page })

    if (!screenshotLists[key]) {
      dispatch(getScreenshots({ sortBy, nsfw, page, limit }))
    }
  }
}

export function getScreenshots(params) {
  return (dispatch, getState) => {
    dispatch({
      type: 'GET_SCREENSHOTS_PENDING'
    })

    ax
      .get('/screenshots', { params })
      .then(res => {
        const { filter } = getState()
        const { sortBy, nsfw } = filter
        const { docs, total, limit, pages, page } = res.data
        const normalizedData = normalize(docs, [schemas.screenshotSchema])
        const key = JSON.stringify({ sortBy, nsfw, total, limit, pages, page })

        dispatch(receiveScreenshots(key, { data: normalizedData }))
        dispatch(setTotal(total))
        dispatch(setLimit(limit))
        dispatch(setPages(pages))
        dispatch(setPage(page))
      })
      .catch(err => {
        return {
          type: 'GET_SCREENSHOTS_REJECTED',
          payload: err
        }
      })
  }
}

export function receiveScreenshots(key, payload) {
  return {
    type: 'GET_SCREENSHOTS_FULFILLED',
    key,
    payload
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

export function getFavoritesByUserId(userId) {
  return getFavorites({ user: userId })
}

export function getFavorites(params) {
  return {
    type: 'GET_FAVORITES',
    payload: ax.get('/favorites', {
      params,
      transformResponse: [
        function(data) {
          return normalize(JSON.parse(data), [schemas.favoriteSchema])
        }
      ]
    })
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

export function downloadScreenshot(screenshotId) {
  return {
    type: 'DOWNLOAD_SCREENSHOT',
    payload: ax.post('/screenshot/download', { screenshotId })
  }
}

export function getUserByIdIfNeeded(id) {
  return (dispatch, getState) => {
    const { entities } = getState()
    const { users } = entities

    if (!users[id]) {
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

export function firstPage() {
  return dispatch => dispatch(setPage(1))
}

export function prevPage() {
  return (dispatch, getState) => {
    const { filter } = getState()
    const { page } = filter

    if (page > 1) {
      dispatch(setPage(page - 1))
    }
  }
}

export function nextPage() {
  return (dispatch, getState) => {
    const { filter } = getState()
    const { page, pages } = filter

    if (page < pages) {
      dispatch(setPage(page + 1))
    }
  }
}

export function lastPage() {
  return (dispatch, getState) => {
    const { filter } = getState()
    const { pages } = filter

    dispatch(setPage(pages))
  }
}
