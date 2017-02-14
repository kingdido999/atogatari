import fs from 'fs'
import uuid from 'uuid/v4'
import sharp from 'sharp'
import asyncBusboy from 'async-busboy'

async function upload (ctx, next) {
  const { files } = await asyncBusboy(ctx.req)

  files.forEach(file => {
    const filenameOriginal = uuid() + '.jpg'
    const filenameThumbnail = uuid() + '.jpg'
    const writable = fs.createWriteStream(`assets/${filenameOriginal}`)
    file.pipe(writable)

    sharp(`assets/${filenameOriginal}`)
      .resize(300, 300)
      .max()
      .toFile(`assets/${filenameThumbnail}`)
  })

  await next()
}

export default {
  upload
}
