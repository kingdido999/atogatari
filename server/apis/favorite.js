import Favorite from '../models/Favorite'
import Screenshot from '../models/Screenshot'

async function getFavorites (ctx) {
  const favorites = await Favorite
    .find(ctx.request.query)
    .exec()

  ctx.response.body = {
    favorites: favorites.map(favorite => favorite.screenshotId)
  }

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

  let favorite = await Favorite
    .findOne({
      userId: ctx.state.uid,
      screenshotId: screenshotId
    })
    .exec()

  if (favorite) {
    screenshot.meta.favoritesCount -= 1
    await favorite.remove()
    ctx.status = 202
  } else {
    screenshot.meta.favoritesCount += 1

    favorite = new Favorite({
      userId: ctx.state.uid,
      screenshotId: screenshotId
    })

    await favorite.save()
    ctx.status = 201
  }

  await screenshot.save()

  ctx.response.body = {
    screenshotId: screenshotId
  }
}

export default {
  getFavorites,
  toggleFavorite
}
