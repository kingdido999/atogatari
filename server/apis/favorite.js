import Favorite from '../models/Favorite'

async function getFavorites (ctx) {
  const favorites = await Favorite.find({
    user: ctx.state.uid
  })
  .exec()

  ctx.response.body = {
    favorites: favorites.map(favorite => {
      return favorite.screenshot
    })
  }

  ctx.status = 200
}

async function addFavorite (ctx) {
  const { screenshotId } = ctx.request.body

  if (!screenshotId) {
    ctx.throw(400)
  }

  const favorite = new Favorite({
    user: ctx.state.uid,
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
  const { screenshotId } = ctx.request.body

  if (!screenshotId) {
    ctx.throw(400)
  }

  const favorite = await Favorite.findOne({
    user: ctx.state.uid,
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
