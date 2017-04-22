import { SECRET } from '../../.env'
import { getRandomString, sha512, generateToken } from '../utils'

import User from '../models/User'
import Favorite from '../models/Favorite'
import Screenshot from '../models/Screenshot'

const PASSWORD_MIN_LENGTH = 8
const TOKEN_EXPIRES_IN = '14 days'

async function signup(ctx) {
  const { email, password, username } = ctx.request.body

  if (password.length < PASSWORD_MIN_LENGTH) {
    ctx.throw(
      400,
      `Password length must be greater than ${PASSWORD_MIN_LENGTH}`
    )
  }

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
    uid: user._id,
    token: generateToken(user._id, SECRET, TOKEN_EXPIRES_IN)
  }

  ctx.status = 201
}

async function login(ctx) {
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
    uid: user._id,
    token: generateToken(user._id, SECRET, TOKEN_EXPIRES_IN)
  }

  ctx.status = 200
}

async function getUser(ctx) {
  const { id } = ctx.params
  const user = await User.findById(id).populate('screenshots favorites').exec()

  ctx.response.body = user
  ctx.status = 200
}

async function getAuthedUser(ctx) {
  const user = await User.findById(ctx.state.uid)
    .populate('screenshots')
    .populate({
      path: 'favorites',
      populate: { path: 'screenshot' }
    })
    .exec()

  ctx.response.body = user
  ctx.status = 200
}

async function getUserFavorites(ctx) {
  const favorites = await Favorite.find({
    user: ctx.state.uid
  })
    .populate('user screenshot')
    .exec()

  ctx.response.body = favorites

  ctx.status = 200
}

async function getFavoriteScreenshots(ctx) {
  const favorites = await Favorite.find({
    user: ctx.state.uid
  }).exec()

  const screenshots = await Screenshot.find()
    .where('_id')
    .in(favorites.map(favorite => favorite.screenshot))
    .populate('favorites')
    .exec()

  ctx.response.body = screenshots

  ctx.status = 200
}

async function getUploadedScreenshots(ctx) {
  const screenshots = await Screenshot.find({
    user: ctx.state.uid
  })
    .populate('favorites')
    .exec()

  ctx.response.body = screenshots

  ctx.status = 200
}

export default {
  signup,
  login,
  getUser,
  getAuthedUser,
  getUserFavorites,
  getFavoriteScreenshots,
  getUploadedScreenshots
}
