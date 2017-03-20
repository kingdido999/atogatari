import asyncBusboy from 'async-busboy'
import uuid from 'uuid/v4'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

import Screenshot from '../models/Screenshot'
import Bangumi from '../models/Bangumi'

const UPLOAD_PATH = 'assets/screenshots'
const WIDTH_SMALL = 384
const WIDTH_MEDIUM = 1152
const WIDTH_LARGE = 1920

async function upload (ctx) {
  const { files, fields } = await asyncBusboy(ctx.req)
  const file = files[0]
  const { bangumiTitle, episodeIndex } = fields

  if (!bangumiTitle) {
    ctx.throw(400, 'Bangumi title cannot be empty.')
  }

  let bangumi = await Bangumi.findOne({
    title: bangumiTitle
  }).exec()

  if (!bangumi) {
    bangumi = new Bangumi({
      title: bangumiTitle,
    })
  }

  const filenames = {
    small: uuid() + '.jpg',
    medium: uuid() + '.jpg',
    large: uuid() + '.jpg',
    original: uuid() + path.extname(file.filename)
  }

  const fileOriginal = `${UPLOAD_PATH}/${filenames.original}`

  try {
    await writeFile(file, fileOriginal)
  } catch (e) {
    ctx.throw(500, e)
  }

  sharp(fileOriginal).resize(WIDTH_SMALL).toFile(`${UPLOAD_PATH}/${filenames.small}`)
  sharp(fileOriginal).resize(WIDTH_MEDIUM).toFile(`${UPLOAD_PATH}/${filenames.medium}`)
  sharp(fileOriginal).resize(WIDTH_LARGE).toFile(`${UPLOAD_PATH}/${filenames.large}`)

  const screenshot = new Screenshot({
    bangumi: bangumi._id,
    user: ctx.state.uid,
    episode: episodeIndex,
    file: {
      small: filenames.small,
      medium: filenames.medium,
      large: filenames.large,
      original: filenames.original
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

function writeFile (input, output) {
  const writable = fs.createWriteStream(output)

  return new Promise((resolve, reject) => {
    input.pipe(writable)
    input.on('close', () => resolve())
    input.on('error', err => reject(err))
  })
}

export default {
  upload
}
