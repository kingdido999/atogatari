import Screenshot from '../models/Screenshot'
import { escapeRegex } from '../utils'

async function getScreenshots (ctx, next) {
  const { search } = ctx.request.query

  const populate = search
    ? {
      path: 'bangumi',
      match: { title: new RegExp(escapeRegex(search), 'gi') }
    }
    : 'bangumi'

  try {
    const screenshots = await Screenshot
      .find({})
      .populate(populate)
      .exec()

    ctx.response.body = {
      screenshots: screenshots
    }

    ctx.status = 200
  } catch (e) {
    ctx.throw(500, e)
  }
}

export default {
  getScreenshots
}
