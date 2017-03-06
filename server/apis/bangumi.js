import Bangumi from '../models/Bangumi'
import Episode from '../models/Episode'
import { escapeRegex } from '../utils'

async function getBangumis (ctx) {
  const { search } = ctx.request.query
  const criteria = search
    ? { title: new RegExp(escapeRegex(search), 'gi') }
    : {}

  try {
    const bangumis = await Bangumi
      .find(criteria)
      .select('title episodes')
      .populate({
        path: 'episodes',
        populate: {
          path: 'screenshots'
        }
      })
      .exec()

    ctx.response.body = {
      bangumis: bangumis
    }

    ctx.status = 200
  } catch (e) {
    ctx.throw(500, e)
  }
}

async function getBangumi (ctx) {
  const { id } = ctx.request.query

  try {
    const bangumi = await Bangumi
      .findById(id)
      .populate({
        path: 'episodes',
        populate: { path: 'screenshots' }
      })
      .exec()

    ctx.response.body = {
      bangumi: bangumi
    }

    ctx.status = 200
  } catch (e) {
    ctx.throw(500, e)
  }
}

export default {
  getBangumis,
  getBangumi
}
