import Favorite from '../models/Favorite'

async function getFavorites (ctx) {
  const { query } = ctx.request

  const favorites = await Favorite
    .find(query)
    .populate('user screenshot')
    .exec()

  ctx.response.body = favorites
  ctx.status = 200
}

export default {
  getFavorites
}
