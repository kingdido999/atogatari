import Tag from '../models/Tag'
import { escapeRegex } from '../utils'

async function search (ctx, next) {
  const { query } = ctx.request.query

  if (!query) {
    ctx.response.body = []
    await next()
  }

  const queryRegex = new RegExp(escapeRegex(query), 'gi')

  const tags = await Tag
    .find({
      name: queryRegex
    })
    .select('_id name')
    .exec()

  ctx.response.body = tags
  ctx.status = 200
}

export default {
  search
}
