
// TODO: change based on dev and prod
const imagePath = 'http://localhost:3001/screenshots'

export function isFullUrl (url) {
  return url.includes('http')
}

export function getImageUrl (filename) {
  if (isFullUrl(filename)) return filename

  return `${imagePath}/${filename}`
}
