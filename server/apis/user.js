import Favorite from '../models/Favorite'
import Screenshot from '../models/Screenshot'

async function getUserFavorites (ctx) {
  const favorites = await Favorite
    .find({
      user: ctx.state.uid
    })
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

  let favorite = await Favorite
    .findOne({
      user: ctx.state.uid,
      screenshot: screenshotId
    })
    .exec()

  if (favorite) {
    await favorite.remove()

    await Screenshot.update({ _id: screenshotId }, {
      $pull: { favorites: { _id: favorite._id } }
    })

    ctx.status = 202
  } else {
    favorite = new Favorite({
      user: ctx.state.uid,
      screenshot: screenshotId
    })

    await favorite.save()

    screenshot.favorites.push(favorite)
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
  getUserFavorites,
  toggleFavorite,
  getFavoriteScreenshots,
  getUploadedScreenshots
}
