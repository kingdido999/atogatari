import axios from 'axios'

const baseURL = process.env.NODE_ENV === 'production'
  ? 'https://api.atogatari.com'
  : ''

export const ax = axios.create({
  baseURL
})

export function getImageUrl(filename) {
  return `${baseURL}/images/${filename}`
}

export function downloadFromUrl(url, filename) {
  const a = document.createElement('a')
  a.href = url
  a.download = filename // Set the file name.
  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

export function pluralize(singular, count) {
  return singular + (count > 1 ? 's' : '')
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function isLoggedIn() {
  return localStorage.getItem('token') ? true : false
}

export function requireAuth(nextState, replace) {
  if (!isLoggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

export function separator(separators) {
  return new RegExp(separators.join('|'), 'g')
}

export function makeActionCreator(type, ...argNames) {
  return function(...args) {
    let action = { type }
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]
    })
    return action
  }
}
