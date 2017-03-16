import { normalize } from 'normalizr'
import axios from 'axios'

import * as schemas from '../constants/schemas'

export function getBangumis (params) {
  return {
    type: 'GET_BANGUMIS',
    payload: axios.get('/api/bangumis', { params,
      transformResponse: [function (data) {
        return normalize(JSON.parse(data), [schemas.bangumiSchema])
      }]
    })
  }
}

export function getBangumiIfNeeded (id) {
  return (dispatch, getState) => {
    const { bangumis } = getState()

    if (!bangumis.byId[id]) {
      dispatch(getBangumiById(id))
    }
  }
}

export function getBangumiById (id) {
  return {
    type: 'GET_BANGUMI',
    payload: axios.get('/api/bangumi', {
      params: { id },
      transformResponse: [function (data) {
        return normalize(JSON.parse(data), schemas.bangumiSchema)
      }]
    })
  }
}

export function getScreenshots (params) {
  return {
    type: 'GET_SCREENSHOTS',
    payload: axios.get('/api/screenshots', { params,
      transformResponse: [function (data) {
        return normalize(JSON.parse(data), schemas.screenshotListSchema)
      }] })
  }
}

export function getScreenshotIfNeeded (id) {
  return (dispatch, getState) => {
    const { screenshots } = getState()

    if (!screenshots.byId[id]) {
      dispatch(getScreenshotById(id))
    }
  }
}

export function getScreenshotById (id) {
  return {
    type: 'GET_SCREENSHOT',
    payload: axios.get('/api/screenshot', {
      params: { id },
      transformResponse: [function (data) {
        return normalize(JSON.parse(data), schemas.screenshotSchema)
      }]
    })
  }
}
