
// TODO: change based on dev and prod
const imagePath = '/images'

export function isFullUrl (url) {
  return url.includes('http')
}

export function getImageUrl (filename) {
  return `${imagePath}/${filename}`
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
