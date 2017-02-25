import crypto from 'crypto'

/**
 * generates random string of characters i.e salt
 * @param {number} length - Length of the random string.
 */
export function getRandomString(length) {
  return crypto.randomBytes(Math.ceil(length/2))
    .toString('hex')
    .slice(0, length)
}

/**
 * hash password with sha512.
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
export function sha512(password, salt) {
  const hash = crypto.createHmac('sha512', salt) /** Hashing algorithm sha512 */
  hash.update(password)
  const value = hash.digest('hex')
  return value
}


export function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
}
