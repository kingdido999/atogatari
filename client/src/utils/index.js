
// TODO: change based on dev and prod
const screenshotPath = 'http://localhost:3001/screenshots'

export function isFullUrl (url) {
  return url.includes('http')
}

export function getScreenshotUrl (filename) {
  if (isFullUrl(filename)) return filename

  return `${screenshotPath}/${filename}`
}
