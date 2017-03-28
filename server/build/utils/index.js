'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRandomString = getRandomString;
exports.sha512 = sha512;
exports.generateToken = generateToken;
exports.escapeRegex = escapeRegex;
exports.convertToSlug = convertToSlug;

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Generates random string of characters, i.e salt
 * @param {number} length
 */
function getRandomString(length) {
  return _crypto2.default.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

/**
 * Hash password with sha512.
 * @param {string} password
 * @param {string} salt
 */
function sha512(password, salt) {
  const hash = _crypto2.default.createHmac('sha512', salt);
  hash.update(password);
  const value = hash.digest('hex');
  return value;
}

/**
 * Generate a Json Web Token.
 * @param  {string} uid       User ID
 * @param  {string} secret
 * @param  {string} expiresIn
 */
function generateToken(uid, secret, expiresIn) {
  const token = _jsonwebtoken2.default.sign({ uid }, secret, { expiresIn });
  return token;
}

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function convertToSlug(text) {
  return text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}