import { normalize } from 'normalizr'
import { ax } from '../utils'

import * as schemas from '../constants/schemas'

export function search (params) {
  return {
    type: 'SEARCH',
    payload: ax.get('/search', { params })
  }
}

export function getBangumis (params) {
  return {
    type: 'GET_BANGUMIS',
    payload: ax.get('/bangumis', { params,
      transformResponse: [function (data) {
        return normalize(JSON.parse(data), [schemas.bangumiSchema])
      }]
    })
  }
}

export function getBangumiIfNeeded (id) {
  return (dispatch, getState) => {
    const { entities, bangumiScreenshots } = getState()
    const { bangumis } = entities

    if (!bangumis[id] || !bangumiScreenshots[id]) {
      dispatch(getBangumiById(id))
    }
  }
}

export function getBangumiById (id) {
  return {
    type: 'GET_BANGUMI',
    payload: ax.get('/bangumi', {
      params: { id },
      transformResponse: [function (data) {
        return normalize(JSON.parse(data), schemas.bangumiSchema)
      }]
    })
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

export function getScreenshots (params) {
  return {
    type: 'GET_SCREENSHOTS',
    payload: ax.get('/screenshots', { params,
      transformResponse: [function (data) {
        return normalize(JSON.parse(data), [schemas.screenshotSchema])
      }] })
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

export function setBangumiEpisode (bangumiId, episode) {
  return {
    type: 'SET_BANGUMI_EPISODE',
    bangumiId,
    episode
  }
}
