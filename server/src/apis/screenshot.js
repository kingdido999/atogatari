import Screenshot from '../models/Screenshot'
import Favorite from '../models/Favorite'
import User from '../models/User'
import Tag from '../models/Tag'

import asyncBusboy from 'async-busboy'
import sizeOf from 'image-size'
import uuid from 'uuid/v4'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

const UPLOAD_PATH = 'assets/images'
const WIDTH_MINIMUM = 1920
const WIDTH_SMALL = 384
const WIDTH_MEDIUM = 1152
const WIDTH_LARGE = 1920

async function upload (ctx) {
  const { files, fields } = await asyncBusboy(ctx.req)
  const file = files[0]
  const { tags, nsfw } = fields
  const tagList = JSON.parse(tags).map(tag => tag.toLowerCase())

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
    user: ctx.state.uid,
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

  try {
    await user.save()
    await screenshot.save()
    tagList.forEach(name => addTag(name, screenshot._id))
  } catch (e) {
    ctx.throw(500, e)
  }

  ctx.response.body = screenshot
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


async function getScreenshot (ctx) {
  const { id } = ctx.request.query

  const screenshot = await Screenshot
    .findById(id)
    .populate('user favorites')
    .exec()

  ctx.response.body = screenshot
  ctx.status = 200
}

async function getScreenshots (ctx) {
  const { query } = ctx.request

  const screenshots = await Screenshot
    .find(query)
    .sort({ 'created_at': -1 })
    .limit(18)
    .populate('user favorites')
    .exec()

  ctx.response.body = screenshots
  ctx.status = 200
}

async function deleteScreenshot (ctx) {
  const { id } = ctx.params
  const screenshot = await Screenshot
    .findById(id)
    .exec()

  if (!screenshot) {
    ctx.throw(400)
  }

  const { uid } = ctx.state
  let authedUser = await User
    .findById(uid)
    .exec()

  const { user, favorites, file } = screenshot
  const isOwner = uid === user.toString()
  const isAdmin = authedUser.roles && authedUser.roles.includes('admin')

  if (!(isOwner || isAdmin)) {
    ctx.throw(401, 'You are not allowed to perform this action.')
  }

  await User
    .where({ _id: user })
    .update({
      $pull: {
        screenshots: id
      }
    })
    .exec()

  await User
    .where()
    .setOptions({ multi: true })
    .update({
      $pull: {
        favorites: { $in: favorites }
      }
    })
    .exec()

  await Favorite
    .remove({
      _id: { $in: favorites }
    })
    .exec()

  await Tag
    .where()
    .setOptions({ multi: true })
    .update({
      $pull: { screenshots: id }
    })
    .exec()

  await Tag
    .remove({
      screenshots: { $exists: true, $size: 0 }
    })
    .exec()

  await screenshot.remove()

  const { small, medium, large, original } = file

  fs.unlinkSync(`${UPLOAD_PATH}/${small}`)
  fs.unlinkSync(`${UPLOAD_PATH}/${medium}`)
  fs.unlinkSync(`${UPLOAD_PATH}/${large}`)
  fs.unlinkSync(`${UPLOAD_PATH}/${original}`)

  ctx.response.body = {
    screenshotId: id,
    userId: user
  }
  
  ctx.status = 200
}

export default {
  upload,
  getScreenshot,
  getScreenshots,
  deleteScreenshot
}
