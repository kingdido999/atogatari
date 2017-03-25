import { SECRET } from '../../.env'
import User from '../models/User'
import { getRandomString, sha512, generateToken } from '../utils'

const TOKEN_EXPIRES_IN = '7 days'

async function signup (ctx) {
  const { email, password, username } = ctx.request.body

  let user = await User.findOne({
    $or: [{ email }, { username }]
  }).exec()

  if (user) {
    ctx.throw(400, 'User with this email or username already exists.')
  }

  const salt = getRandomString(16)
  const hash = sha512(password, salt)

  user = new User({ email, username, salt, hash })

  try {
    await user.save()
  } catch (e) {
    ctx.throw(500, e)
  }

  ctx.response.body = {
    userId: user._id,
    token: generateToken(user._id, SECRET, TOKEN_EXPIRES_IN)
  }

  ctx.status = 201
}

async function login (ctx) {
  const { email, password } = ctx.request.body

  const user = await User.findOne({
    $or: [{ email: email }, { username: email }]
  })

  if (!user) {
    ctx.throw(400, 'Invalid email/username or password.')
  }

  const actualHash = sha512(password, user.salt)
  const expectedHash = user.hash

  if (actualHash !== expectedHash) {
    ctx.throw(400, 'Invalid email/username or password.')
  }

  ctx.response.body = {
    userId: user._id,
    token: generateToken(user._id, SECRET, TOKEN_EXPIRES_IN)
  }

  ctx.status = 200
}

export default {
  signup,
  login
}
