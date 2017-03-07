import jwt from 'jsonwebtoken'
import config from '../config'
import User from '../models/User'
import { getRandomString, sha512 } from '../utils/index'

async function signup (ctx) {
  const { email, password, username } = ctx.request.body

  let user = await User.findOne({
    $or: [{ email: email }, { username: username }]
  }).exec()

  if (user) {
    ctx.throw(400, 'User with this email or username already exists.')
  }

  const salt = getRandomString(16)
  const hash = sha512(password, salt)

  user = new User({
    email: email,
    username: username,
    salt: salt,
    hash: hash
  })

  await user.save()

  ctx.response.body = {
    uid: user._id,
    token: generateToken(user, config.secret)
  }

  ctx.status = 201
}

async function login (ctx) {
  const { email, password } = ctx.request.body

  const user = await User.findOne({
    email: email
  })

  if (!user) {
    ctx.throw(400, 'Wrong email or/and password.')
  }

  const actualHash = sha512(password, user.salt)
  const expectedHash = user.hash

  if (actualHash !== expectedHash) {
    ctx.throw(400, 'Wrong email or/and password.')
  }

  ctx.response.body = {
    uid: user._id,
    token: generateToken(user, config.secret)
  }

  ctx.status = 200
}

function generateToken (user, secret) {
  const token = jwt.sign({
    uid: user.id
  }, secret, {
    expiresIn: '7 day'
  })

  return token
}

export default {
  signup,
  login
}
