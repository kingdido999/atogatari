import { normalize } from 'normalizr'
import { ax } from '../utils'

import * as schemas from '../constants/schemas'

export function search (params) {
  return {
    type: 'SEARCH',
    payload: ax.get('/search', { params })
  }
}

export function getScreenshotsByUserIdIfNeeded (userId) {
  return (dispatch, getState) => {
    const { userScreenshots } = getState()

    if (!userScreenshots[userId]) {
      dispatch(getScreenshotsByUserId(userId))
    }
  }
}

export function getScreenshotsByUserId (userId) {
  return getScreenshots({ user: userId })
}

export function getFilteredScreenshots () {
  return (dispatch, getState) => {
    const { screenshots } = getState()
    const { sortBy, nsfw, page, limit } = screenshots
    dispatch(getScreenshots({ sortBy, nsfw, page, limit }))
  }
}

export function getScreenshots (params) {
  return dispatch => {
    dispatch({
      type: 'GET_SCREENSHOT_PENDING'
    })

    ax.get('/screenshots', { params })
    .then(res => {
      const { docs } = res.data
      const normalizedData = normalize(docs, [schemas.screenshotSchema])
      dispatch(receiveScreenshots({ data: normalizedData, ...res.data }))
    })
    .catch(err => {
      return {
        type: 'GET_SCREENSHOTS_REJECTED',
        payload: err
      }
    })
  }
}

export function receiveScreenshots (payload) {
  return {
    type: 'GET_SCREENSHOTS_FULFILLED',
    payload
  }
}

export function getScreenshotIfNeeded (id) {
  return (dispatch, getState) => {
    const { entities } = getState()
    const { screenshots } = entities

    if (!screenshots[id]) {
      dispatch(getScreenshotById(id))
    }
  }
}

export function getScreenshotById (id) {
  return {
    type: 'GET_SCREENSHOT',
    payload: ax.get('/screenshot', {
      params: { id },
      transformResponse: [function (data) {
        return normalize(JSON.parse(data), schemas.screenshotSchema)
      }]
    })
  }
}

export function setSortBy (sortBy) {
  return {
    type: 'SET_SORT_BY',
    sortBy
  }
}

export function toggleNSFW () {
  return {
    type: 'TOGGLE_NSFW'
  }
}

export function setView (view) {
  return {
    type: 'SET_VIEW',
    view
  }
}

export function firstPage () {
  return dispatch => dispatch(setPage(1))
}

export function prevPage () {
  return (dispatch, getState) => {
    const { screenshots } = getState()
    const { page } = screenshots

    if (page > 1) {
      dispatch(setPage(page - 1))
    }
  }
}

export function nextPage () {
  return (dispatch, getState) => {
    const { screenshots } = getState()
    const { page, pages } = screenshots

    if (page < pages) {
      dispatch(setPage(page + 1))
    }
  }
}

export function lastPage () {
  return (dispatch, getState) => {
    const { screenshots } = getState()
    const { pages } = screenshots

    dispatch(setPage(pages))
  }
}

export function setPage (page) {
  return {
    type: 'SET_PAGE',
    page
  }
}

export function setLimit (limit) {
  return {
    type: 'SET_LIMIT',
    limit
  }
}

export function getFavoritesByUserIdIfNeeded (userId) {
  return (dispatch, getState) => {
    const { userFavorites } = getState()

    if (!userFavorites[userId]) {
      dispatch(getFavoritesByUserId(userId))
    }
  }
}

export function getFavoritesByUserId (userId) {
  return getFavorites({ user: userId })
}

export function getFavorites (params) {
  return {
    type: 'GET_FAVORITES',
    payload: ax.get('/favorites', { params,
      transformResponse: [function (data) {
        return normalize(JSON.parse(data), [schemas.favoriteSchema])
      }]
    })
  }
}

export function getTagByNameIfNeeded (name) {
  return (dispatch, getState) => {
    const { entities } = getState()
    const { tags } = entities

    if (!tags[name]) {
      dispatch(getTag({ name }))
    }
  }
}

export function getTag (params) {
  return {
    type: 'GET_TAG',
    payload: ax.get('/tag', {
      params,
      transformResponse: [function (data) {
        return normalize(JSON.parse(data), schemas.tagSchema)
      }]
    })
  }
}

export function downloadScreenshot (screenshotId) {
  return {
    type: 'DOWNLOAD_SCREENSHOT',
    payload: ax.post('/screenshot/download', { screenshotId })
  }
}