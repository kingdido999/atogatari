import crypto from 'crypto'
import jwt from 'jsonwebtoken'

/**
 * Generates random string of characters, i.e salt
 * @param {number} length
 */
export function getRandomString (length) {
  return crypto.randomBytes(Math.ceil(length/2))
    .toString('hex')
    .slice(0, length)
}

/**
 * Hash password with sha512.
 * @param {string} password
 * @param {string} salt
 */
export function sha512 (password, salt) {
  const hash = crypto.createHmac('sha512', salt)
  hash.update(password)
  const value = hash.digest('hex')
  return value
}

/**
 * Generate a Json Web Token.
 * @param  {string} uid       User ID
 * @param  {string} secret
 * @param  {string} expiresIn
 */
export function generateToken (uid, secret, expiresIn) {
  const token = jwt.sign({ uid }, secret, { expiresIn })
  return token
}


export function escapeRegex (text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

export function convertToSlug (text) {
  return text
    .toLowerCase()
    .replace(/ /g,'-')
    .replace(/[^\w-]+/g,'')
}
