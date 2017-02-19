import asyncBusboy from 'async-busboy'
import jwt from 'jsonwebtoken'
import uuid from 'uuid/v4'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

import Screenshot from '../models/Screenshot'
import Bangumi from '../models/Bangumi'
import User from '../models/User'

import config from '../config'

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

async function upload (ctx, next) {
  const { files, fields } = await asyncBusboy(ctx.req)
  const file = files[0]
  const { bangumi_title, token } = fields

  let decoded = null

  try {
    decoded = jwt.verify(token, config.secret)
  } catch (e) {
    ctx.throw(401, e)
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

  // Save bangumi if necessary
  let bangumi = null

  const existedBangumi = await Bangumi.findOne({
    title: bangumi_title
  }).exec()

  if (existedBangumi) {
    bangumi = existedBangumi
  } else {
    bangumi = new Bangumi({
      title:bangumi_title
    })

    try {
      await bangumi.save()
    } catch (e) {
      ctx.throw(500, e)
    }
  }

  // Save screenshot
  const screenshot = new Screenshot({
    bangumi_id: bangumi.id,
    uploader_id: decoded.uid,
    thumbnail_filename: filenameThumbnail,
    original_filename: filenameOriginal
  })

  try {
    await screenshot.save()
  } catch (e) {
    ctx.throw(500, e)
  }

  ctx.status = 200
}

export default {
  upload
}
