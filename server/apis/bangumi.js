import Bangumi from '../models/Bangumi'
import { escapeRegex } from '../utils'

async function getBangumis (ctx) {
  const { search } = ctx.request.query
  const criteria = search
    ? { title: new RegExp(escapeRegex(search), 'gi') }
    : {}

  const bangumis = await Bangumi
    .find(criteria)
    .exec()

  ctx.response.body = bangumis

  ctx.status = 200
}

async function getBangumi (ctx) {
  const { id } = ctx.request.query

  const bangumi = await Bangumi
    .findById(id)
    .populate({
      path: 'screenshots',
      populate: {
        path: 'favorites'
      }
    })
    .exec()

  ctx.response.body = bangumi

  ctx.status = 200
}

export default {
  getBangumis,
  getBangumi
}
