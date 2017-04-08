import axios from 'axios'

const baseURL = process.env.NODE_ENV === 'production'
? 'https://api.atogatari.com'
: ''

export const ax = axios.create({
  baseURL: baseURL
})

export function isFullUrl (url) {
  return url.includes('http')
}

export function getImageUrl (filename) {
  return `${baseURL}/images/${filename}`
}

export function downloadFromUrl (url, filename) {
  const a = document.createElement('a')
  a.href = url
  a.download = filename // Set the file name.
  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

export function pluralize (singular, count) {
  return singular + (count > 1 ? 's' : '')
}

export function getAuthHeader () {
  return {
    'Authorization': localStorage.getItem('token')
  }
}

export function isLoggedIn () {
  return localStorage.getItem('token') ? true : false
}

export function requireAuth (nextState, replace) {
  if (!isLoggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

export function separator (separators) {
  return new RegExp(separators.join('|'), 'g')
}
