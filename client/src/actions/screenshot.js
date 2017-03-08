import axios from 'axios'

export function getScreenshots (params) {
  return {
    type: 'GET_SCREENSHOTS',
    payload: axios.post('/api/user/screenshots', params)
  }
}
