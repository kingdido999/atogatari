import User from '../models/User'
import Favorite from '../models/Favorite'
import Screenshot from '../models/Screenshot'

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

    await User.update({ _id: ctx.state.uid }, {
      $pull: { favorites: favorite._id }
    })

    await Screenshot.update({ _id: screenshotId }, {
      $pull: { favorites: favorite._id }
    })

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
  getUserFavorites,
  toggleFavorite,
  getFavoriteScreenshots,
  getUploadedScreenshots
}
