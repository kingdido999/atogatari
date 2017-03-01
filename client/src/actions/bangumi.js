import axios from 'axios'

export function getBangumis (params) {
  return {
    type: 'GET_BANGUMIS',
    payload: axios.get('/api/bangumis', { params })
  }
}

export function getBangumi (params) {
  return {
    type: 'GET_BANGUMI',
    payload: axios.get('/api/bangumi', { params })
  }
}
