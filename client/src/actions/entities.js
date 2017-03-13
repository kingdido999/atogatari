import { normalize } from 'normalizr'
import axios from 'axios'

import * as schemas from '../constants/schemas'

export function getBangumis (params) {
  return {
    type: 'GET_BANGUMIS',
    payload: axios.get('/api/bangumis', { params,
      transformResponse: [function (data) {
        return normalize(JSON.parse(data), schemas.bangumiListSchema)
      }]
    })
  }
}

export function getBangumi (params) {
  return {
    type: 'GET_BANGUMI',
    payload: axios.get('/api/bangumi', { params,
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

export function getScreenshot (params) {
  return {
    type: 'GET_SCREENSHOT',
    payload: axios.get('/api/screenshot', { params,
      transformResponse: [function (data) {
        return normalize(JSON.parse(data), schemas.screenshotSchema)
      }]
    })
  }
}
