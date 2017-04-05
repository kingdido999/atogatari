import { SECRET } from '../../.env'
import { getRandomString, sha512, generateToken } from '../utils'

import User from '../models/User'
import Favorite from '../models/Favorite'
import Screenshot from '../models/Screenshot'

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
    uid: user._id,
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
    uid: user._id,
    token: generateToken(user._id, SECRET, TOKEN_EXPIRES_IN)
  }

  ctx.status = 200
}


async function getAuthedUser (ctx) {
  const user = await User
    .findById(ctx.state.uid)
    .populate('screenshots')
    .populate({
      path: 'favorites',
      populate: { path: 'screenshot' }
    })
    .exec()

    if (!user) {
      ctx.throw(401, 'Unable to get authed user details.')
    }

    ctx.response.body = user
    ctx.status = 200
}

async function getUserFavorites (ctx) {
  const favorites = await Favorite
    .find({
      user: ctx.state.uid
    })
    .populate('user screenshot')
    .exec()

  ctx.response.body = favorites

  ctx.status = 200
}

async function toggleFavorite (ctx) {
  const { screenshotId } = ctx.request.body

  const screenshot = await Screenshot
    .findById(screenshotId)
    .exec()

  if (!screenshot) {
    ctx.throw(400)
  }

  const user = await User.findById(ctx.state.uid)

  let favorite = await Favorite
    .findOne({
      user: ctx.state.uid,
      screenshot: screenshotId
    })
    .exec()

  if (favorite) {
    await favorite.remove()

    await User
      .update({ _id: ctx.state.uid }, {
        $pull: { favorites: favorite._id }
      })
      .exec()

    await Screenshot
      .update({ _id: screenshotId }, {
        $pull: { favorites: favorite._id }
      })
      .exec()

    ctx.status = 202
  } else {
    favorite = new Favorite({
      user: ctx.state.uid,
      screenshot: screenshotId
    })

    user.favorites.push(favorite)
    screenshot.favorites.push(favorite)

    await favorite.save()
    await user.save()
    await screenshot.save()

    ctx.status = 201
  }

  ctx.response.body = favorite
}

async function getFavoriteScreenshots (ctx) {
  const favorites = await Favorite
    .find({
      user: ctx.state.uid
    })
    .exec()

  const screenshots = await Screenshot
    .find()
    .where('_id')
    .in(favorites.map(favorite => favorite.screenshot))
    .populate('favorites')
    .exec()

  ctx.response.body = screenshots

  ctx.status = 200
}

async function getUploadedScreenshots (ctx) {
  const screenshots = await Screenshot
    .find({
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
  getAuthedUser,
  getUserFavorites,
  toggleFavorite,
  getFavoriteScreenshots,
  getUploadedScreenshots
}
