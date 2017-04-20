import Tag from '../models/Tag'
import { escapeRegex } from '../utils'

async function search(ctx) {
  const { query } = ctx.request.query
  const queryRegex = new RegExp(escapeRegex(query), 'gi')

  const tags = await Tag.find({
    name: queryRegex,
    screenshots: { $gt: [] }
  })
    .select('name type screenshots')
    .exec()

  ctx.response.body = tags
  ctx.status = 200
}

export default {
  search
}
