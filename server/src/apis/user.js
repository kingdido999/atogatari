import mongoose from 'mongoose'
import { SECRET } from '../../.env'
import { getRandomString, sha512, generateToken } from '../utils'

import User from '../models/User'
import Favorite from '../models/Favorite'
import Screenshot from '../models/Screenshot'
import { sort, CONVERT_TO_SCREENSHOTS } from './common'

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

async function getScreenshots(ctx) {
  const { id } = ctx.params
  const { query } = ctx.request
  let { sortBy, nsfw, page, limit } = query
  page = page ? Number(page) : 1
  limit = limit ? Number(limit) : 9

  let aggregation = [
    {
      $match: { _id: mongoose.Types.ObjectId(id) }
    },
    {
      $unwind: '$screenshots'
    },
    {
      $lookup: {
        from: 'screenshots',
        localField: 'screenshots',
        foreignField: '_id',
        as: 'screenshots'
      }
    }
  ]

  aggregation = [...aggregation, ...CONVERT_TO_SCREENSHOTS]

  if (!(nsfw === 'true')) {
    aggregation.push({
      $match: { nsfw: false }
    })
  }

  const docs = await User.aggregate(aggregation).exec()
  const total = docs.length

  const paginatedDocs = await User.aggregate([
    ...aggregation,
    { $sort: sort(sortBy) },
    { $skip: (page - 1) * limit },
    { $limit: limit }
  ]).exec()

  const populatedDocs = await Screenshot.populate(paginatedDocs, {
    path: 'user favorites tagDocs'
  })

  const results = {
    docs: populatedDocs,
    total,
    limit,
    page,
    pages: Math.ceil(total / limit) || 1
  }

  ctx.response.body = results
  ctx.status = 200
}

async function getFavoriteScreenshots(ctx) {
  const { id } = ctx.params
  const { query } = ctx.request
  let { sortBy, nsfw, page, limit } = query
  page = page ? Number(page) : 1
  limit = limit ? Number(limit) : 9

  let aggregation = [
    {
      $match: { _id: mongoose.Types.ObjectId(id) }
    },
    {
      $unwind: '$favorites'
    },
    {
      $lookup: {
        from: 'favorites',
        localField: 'favorites',
        foreignField: '_id',
        as: 'userFavorites'
      }
    },
    {
      $project: {
        favorite: { $arrayElemAt: ['$userFavorites', 0] }
      }
    },
    {
      $lookup: {
        from: 'screenshots',
        localField: 'favorite.screenshot',
        foreignField: '_id',
        as: 'screenshots'
      }
    }
  ]

  aggregation = [...aggregation, ...CONVERT_TO_SCREENSHOTS]

  if (!(nsfw === 'true')) {
    aggregation.push({
      $match: { nsfw: false }
    })
  }

  const docs = await User.aggregate(aggregation).exec()
  const total = docs.length

  const paginatedDocs = await User.aggregate([
    ...aggregation,
    { $sort: sort(sortBy) },
    { $skip: (page - 1) * limit },
    { $limit: limit }
  ]).exec()

  const populatedDocs = await Screenshot.populate(paginatedDocs, {
    path: 'user favorites tagDocs'
  })

  const results = {
    docs: populatedDocs,
    total,
    limit,
    page,
    pages: Math.ceil(total / limit) || 1
  }

  ctx.response.body = results
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
  getScreenshots,
  getFavoriteScreenshots,
  getUploadedScreenshots
}
