import Screenshot from '../models/Screenshot'

async function getScreenshot (ctx) {
  const { id } = ctx.request.query

  const screenshot = await Screenshot
    .findById(id)
    .populate('bangumi favorites')
    .exec()

  ctx.response.body = screenshot

  ctx.status = 200
}

async function getScreenshots (ctx) {
  const screenshots = await Screenshot
    .find(ctx.request.query)
    .exec()

  ctx.response.body = screenshots

  ctx.status = 200
}

export default {
  getScreenshot,
  getScreenshots
}
