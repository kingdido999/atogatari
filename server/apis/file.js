import asyncBusboy from 'async-busboy'
import uuid from 'uuid/v4'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

import Screenshot from '../models/Screenshot'
import Bangumi from '../models/Bangumi'

function writeFile (input, output) {
  const writable = fs.createWriteStream(output)

  return new Promise((resolve, reject) => {
    input.pipe(writable)
    input.on('close', () => {
      resolve()
    })
    input.on('error', err => {
      reject(err)
    })
  })
}

async function upload (ctx) {
  const { files, fields } = await asyncBusboy(ctx.req)
  const file = files[0]
  const { bangumiTitle, episodeIndex } = fields

  let bangumi = await Bangumi.findOne({
    title: bangumiTitle
  }).exec()

  if (!bangumi) {
    bangumi = new Bangumi({
      title: bangumiTitle,
    })
  }

  const uploadPath = 'assets/screenshots'
  const filenameOriginal = uuid() + path.extname(file.filename)
  const filenameThumbnail = uuid() + '.jpg'
  const fileOriginal = `${uploadPath}/${filenameOriginal}`
  const fileThumbnail = `${uploadPath}/${filenameThumbnail}`

  try {
    await writeFile(file, fileOriginal)
  } catch (e) {
    ctx.throw(500, e)
  }

  // Save thumbnail
  sharp(fileOriginal).resize(300, 300).max().toFile(fileThumbnail)

  const screenshot = new Screenshot({
    bangumi: bangumi._id,
    user: ctx.state.uid,
    episode: episodeIndex,
    path: {
      thumbnail: filenameThumbnail,
      original: filenameOriginal
    }
  })

  bangumi.screenshots.push(screenshot)

  try {
    await bangumi.save()
    await screenshot.save()
  } catch (e) {
    ctx.throw(500, e)
  }

  ctx.status = 200
}

export default {
  upload
}
