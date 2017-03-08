import Screenshot from '../models/Screenshot'

async function getScreenshots (ctx) {
  const screenshots = await Screenshot
    .find({
      uploader: ctx.state.uid
    })
    .exec()

  ctx.response.body = {
    screenshots: screenshots
  }

  ctx.status = 200
}

export default {
  getScreenshots
}
