import { browserHistory } from 'react-router'
import axios from 'axios'

export function upload (data) {
  return {
    type: 'UPLOAD',
    payload: new Promise((resolve, reject) => {
      axios.post('/api/upload', data)
      .then(res => {
        browserHistory.push('/')
        resolve(res)
      })
      .catch(err => reject(err.response.data))
    })
  }
}
