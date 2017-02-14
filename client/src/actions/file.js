import axios from 'axios'

export const upload = (data) => ({
  type: 'UPLOAD',
  payload: new Promise((resolve, reject) => {
    axios.post('/api/upload', data)
    .then(res => resolve(res))
    .catch(err => reject(err.response.data))
  })
})
