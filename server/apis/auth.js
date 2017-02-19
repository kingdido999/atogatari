import jwt from 'jsonwebtoken'
import config from '../config'
import User from '../models/User'
import { getRandomString, sha512 } from '../utils/index'

async function signup (ctx, next) {
  const { email, password, username } = ctx.request.body

  const existedUser = await User.findOne({
    $or: [{ email: email }, { username: username }]
  }).exec()

  if (existedUser) {
    ctx.throw(400, 'User with this email or username already exists.')
  } else {
    const salt = getRandomString(16)
    const hash = sha512(password, salt)

    const user = new User({
      email: email,
      username: username,
      salt: salt,
      hash: hash
    })

    try {
      await user.save()

      ctx.response.body = {
        token: generateToken(user, config.secret)
      }

      ctx.status = 201
    } catch (err) {
      ctx.throw(400, err)
    }
  }
}

async function login (ctx, next) {
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
    token: generateToken(user, config.secret)
  }
  ctx.status = 200
}

function generateToken (user, secret) {
  const token = jwt.sign({
    uid: user.id
  }, secret, {
    expiresIn: '1 day'
  })

  return token
}

export default {
  signup,
  login
}
