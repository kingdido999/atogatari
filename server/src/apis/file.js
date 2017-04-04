import asyncBusboy from 'async-busboy'
import sizeOf from 'image-size'
import uuid from 'uuid/v4'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'
import { union } from 'lodash'

import Screenshot from '../models/Screenshot'
import Bangumi from '../models/Bangumi'
import User from '../models/User'
import Tag from '../models/Tag'

const UPLOAD_PATH = 'assets/images'
const WIDTH_MINIMUM = 1920
const WIDTH_SMALL = 384
const WIDTH_MEDIUM = 1152
const WIDTH_LARGE = 1920

async function upload (ctx) {
  const { files, fields } = await asyncBusboy(ctx.req)
  const file = files[0]
  const { bangumiTitle, episode, aliases, tags, nsfw } = fields
  const aliasList = JSON.parse(aliases)
  const tagList = JSON.parse(tags)

  if (!bangumiTitle) {
    ctx.throw(400, 'Bangumi title cannot be empty.')
  }

  if (!episode) {
    ctx.throw(400, 'Episode cannot be empty.')
  }

  let bangumi = await Bangumi.findOne({
    title: bangumiTitle
  }).exec()

  if (!bangumi) {
    bangumi = new Bangumi({
      title: bangumiTitle
    })
  }

  bangumi.aliases = union(bangumi.aliases, aliasList)

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

  if (sizeOf(fileOriginal).width < WIDTH_MINIMUM) {
    fs.unlinkSync(fileOriginal)
    ctx.throw(400, `The image width should be at least ${WIDTH_MINIMUM}px.`)
  }

  sharp(fileOriginal).resize(WIDTH_SMALL).toFile(`${UPLOAD_PATH}/${filenames.small}`)
  sharp(fileOriginal).resize(WIDTH_MEDIUM).toFile(`${UPLOAD_PATH}/${filenames.medium}`)
  sharp(fileOriginal).resize(WIDTH_LARGE).toFile(`${UPLOAD_PATH}/${filenames.large}`)

  const screenshot = new Screenshot({
    bangumi: bangumi._id,
    user: ctx.state.uid,
    episode: episode,
    file: {
      small: filenames.small,
      medium: filenames.medium,
      large: filenames.large,
      original: filenames.original
    },
    tags: tagList,
    nsfw: nsfw
  })

  const user = await User.findById(ctx.state.uid).exec()
  user.screenshots.push(screenshot)
  bangumi.screenshots.push(screenshot)

  try {
    await user.save()
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
  let tag = await Tag.findOne({ name }).exec()

  if (!tag) {
    tag = new Tag({ name })
  }

  tag.screenshots.push(screenshotId)
  await tag.save()
}

export default {
  upload
}
