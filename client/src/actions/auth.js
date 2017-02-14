import { browserHistory } from 'react-router'
import axios from 'axios'

export function login (creds) {
  return {
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
  }
}

export function signup (creds) {
  return {
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
  }
}

export function logout () {
  return {
    type: 'LOGOUT',
    payload: new Promise((resolve, reject) => {
      try {
        localStorage.removeItem('token')
        resolve()
      } catch(e) {
        reject(e)
      }
    })
  }
}
