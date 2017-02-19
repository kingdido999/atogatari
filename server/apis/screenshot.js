import Screenshot from '../models/Screenshot'

async function getAllScreenshots (ctx, next) {
  try {
    const screenshots = await Screenshot.find({}).exec()

    ctx.response.body = {
      screenshots: screenshots
    }

    ctx.status = 200
  } catch (e) {
    ctx.throw(500, e)
  }
}

export default {
  getAllScreenshots
}
