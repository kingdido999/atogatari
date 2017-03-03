import axios from 'axios'

export function getScreenshots (params) {
  return {
    type: 'GET_SCREENSHOTS',
    payload: axios.get('/api/screenshots', { params })
  }
}
