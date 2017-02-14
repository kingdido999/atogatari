import axios from 'axios'
import { browserHistory } from 'react-router'

export const login = (creds) => ({
  type: 'LOGIN',
  payload: new Promise((resolve, reject) => {
    axios.post('/api/login', creds)
    .then(res => {
      localStorage.setItem('token', res.data.token)
      browserHistory.push('/')
      resolve(res)
    })
    .catch(err => {
      reject(err.response.data)
    })
  })
})

export const signup = (creds) => ({
  type: 'SIGNUP',
  payload: new Promise((resolve, reject) => {
    axios.post('/api/signup', creds)
    .then(res => {
      localStorage.setItem('token', res.data.token)
      browserHistory.push('/')
      resolve(res)
    })
    .catch(err => {
      reject(err.response.data)
    })
  })
})

export const logout = () => ({
  type: 'LOGOUT',
  payload: new Promise((resolve, reject) => {
    try {
      localStorage.removeItem('token')
      resolve()
    } catch(e) {
      reject(e)
    }
  })
})
