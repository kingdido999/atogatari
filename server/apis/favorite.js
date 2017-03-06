import jwt from 'jsonwebtoken'
import config from '../config'

import Favorite from '../models/Favorite'

async function getFavorites (ctx) {
  const { token } = ctx.request.body

  let decoded = null

  try {
    decoded = jwt.verify(token, config.secret)
  } catch (e) {
    ctx.throw(401, e)
  }

  const favorites = await Favorite.find({
    user: decoded.uid
  }).exec()

  ctx.response.body = {
    favorites: favorites.map(favorite => {
      return favorite.screenshot
    })
  }

  ctx.status = 200
}

async function addFavorite (ctx) {
  const { screenshotId, token } = ctx.request.body

  if (!screenshotId) {
    ctx.throw(400)
  }

  let decoded = null

  try {
    decoded = jwt.verify(token, config.secret)
  } catch (e) {
    ctx.throw(401, e)
  }

  const favorite = new Favorite({
    user: decoded.uid,
    screenshot: screenshotId
  })

  try {
    favorite.save()
    ctx.response.body = {
      screenshotId: screenshotId
    }
    ctx.status = 201
  } catch (e) {
    ctx.throw(500, e)
  }
}

async function removeFavorite (ctx) {
  const { screenshotId, token } = ctx.request.body

  if (!screenshotId) {
    ctx.throw(400)
  }

  let decoded = null

  try {
    decoded = jwt.verify(token, config.secret)
  } catch (e) {
    ctx.throw(401, e)
  }

  const favorite = await Favorite.findOne({
    user: decoded.uid,
    screenshot: screenshotId
  }).exec()

  try {
    favorite.remove()
    ctx.response.body = {
      screenshotId: screenshotId
    }
    ctx.status = 202
  } catch (e) {
    ctx.throw(500, e)
  }
}

export default {
  getFavorites,
  addFavorite,
  removeFavorite
}
