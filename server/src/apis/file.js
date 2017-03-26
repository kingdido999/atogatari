import asyncBusboy from 'async-busboy'
import uuid from 'uuid/v4'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

import Screenshot from '../models/Screenshot'
import Bangumi from '../models/Bangumi'
import Tag from '../models/Tag'

import { convertToSlug } from '../utils'

const UPLOAD_PATH = 'assets/images'
const WIDTH_SMALL = 384
const WIDTH_MEDIUM = 1152
const WIDTH_LARGE = 1920

async function upload (ctx) {
  const { files, fields } = await asyncBusboy(ctx.req)
  const file = files[0]
  const { bangumiTitle, episodeIndex, tags } = fields
  const tagList = JSON.parse(tags)
  console.log(tagList)

  if (!bangumiTitle) {
    ctx.throw(400, 'Bangumi title cannot be empty.')
  }

  if (!episodeIndex) {
    ctx.throw(400, 'Episode cannot be empty.')
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
    },
    tags: tagList
  })

  bangumi.screenshots.push(screenshot)

  try {
    await bangumi.save()
    await screenshot.save()
    tagList.forEach(name => addTag(name, screenshot._id))
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

async function addTag (name, screenshotId) {
  const slug = convertToSlug(name)
  let tag = await Tag.findOne({
    slug: slug
  }).exec()

  if (!tag) {
    tag = new Tag({
      name: name,
      slug: slug
    })
  }

  tag.screenshots.push(screenshotId)
  await tag.save()
}

export default {
  upload
}
