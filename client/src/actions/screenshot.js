import axios from 'axios'

export function getAllScreenshots () {
  return {
    type: 'GET_ALL_SCREENSHOTS',
    payload: axios.get('/api/screenshots')
  }
}

export function screenshotRendered () {
  return {
    type: 'SCREENSHOT_RENDERED'
  }
}
