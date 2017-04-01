import Tag from '../models/Tag'

async function getTag (ctx) {
  const { query } = ctx.request

  const tag = await Tag
    .findOne(query)
    .populate('screenshots')
    .exec()

  ctx.response.body = tag
  ctx.status = 200
}

export default {
  getTag
}
