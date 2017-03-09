import Favorite from '../models/Favorite'
import Screenshot from '../models/Screenshot'

async function getFavorites (ctx) {
  const favorites = await Favorite.find({
    user: ctx.state.uid
  })
  .populate('screenshot')
  .exec()

  ctx.response.body = {
    favorites: favorites
  }

  ctx.status = 200
}

async function addFavorite (ctx) {
  const { screenshotId } = ctx.request.body

  if (!screenshotId) {
    ctx.throw(400)
  }

  const screenshot = await Screenshot.findById(screenshotId).exec()

  const favorite = new Favorite({
    user: ctx.state.uid,
    screenshot: screenshot
  })

  await favorite.save()

  screenshot.favorites.push(favorite)
  await screenshot.save()

  ctx.response.body = {
    favorite: favorite
  }
  ctx.status = 201
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

  await favorite.remove()
  ctx.response.body = {
    favorite: favorite
  }
  ctx.status = 202
}

export default {
  getFavorites,
  addFavorite,
  removeFavorite
}
