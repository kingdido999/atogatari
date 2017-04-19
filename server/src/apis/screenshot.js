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

import { writeFile } from '../utils'

const UPLOAD_PATH = 'assets/images'
const SUPPORTED_TYPES = ['image/png', 'image/jpeg']
const FILES_COUNT_MAXIMUM = 9

const WIDTH_SMALL = 384
const WIDTH_MEDIUM = 1152
const WIDTH_LARGE = 1920

const WIDTH_MINIMUM = 1920
const HEIGHT_MINIMUM = 1080

// 4K
const WIDTH_MAXIMUM = 3840
const HEIGHT_MAXIMUM = 2160

async function upload(ctx) {
  const { files, fields } = await asyncBusboy(ctx.req)

  if (files.length > FILES_COUNT_MAXIMUM) {
    ctx.throw(
      400,
      `You are trying to upload ${files.length} screenshots at a time, 
      which exceeds the limit of ${FILES_COUNT_MAXIMUM}.`
    )
  }

  const fileMap = new Map()

  for (let i = 0; i < files.length; i++) {
    await validateFile(files[i], fileMap, ctx)
  }

  const { tags, nsfw } = fields
  const tagList = JSON.parse(tags).map(tag => tag.toLowerCase())
  const userId = ctx.state.uid

  for (let i = 0; i < files.length; i++) {
    await uploadFile(files[i], fileMap, userId, tagList, nsfw)
  }

  ctx.status = 200
}

async function validateFile(file, fileMap, ctx) {
  if (!SUPPORTED_TYPES.includes(file.mime)) {
    ctx.throw(400, `${file.filename} has invalid file type ${file.mime}.`)
  }

  const filenames = {
    small: uuid() + '.jpg',
    medium: uuid() + '.jpg',
    large: uuid() + '.jpg',
    original: uuid() + path.extname(file.filename)
  }

  fileMap.set(file.filename, filenames)

  const fileOriginal = `${UPLOAD_PATH}/${filenames.original}`
  await writeFile(file, fileOriginal)
  const fileSize = sizeOf(fileOriginal)

  if (fileSize.width < WIDTH_MINIMUM && fileSize.height < HEIGHT_MINIMUM) {
    fileMap.forEach(filenames =>
      fs.unlinkSync(`${UPLOAD_PATH}/${filenames.original}`)
    )
    ctx.throw(
      400,
      `File "${file.filename}" is ${fileSize.width}x${fileSize.height} pixels. 
      Valid screenshot must have width >= ${WIDTH_MINIMUM}px or height >= ${HEIGHT_MINIMUM}px.`
    )
  }

  if (fileSize.width > WIDTH_MAXIMUM || fileSize.height > HEIGHT_MAXIMUM) {
    fileMap.forEach(filenames =>
      fs.unlinkSync(`${UPLOAD_PATH}/${filenames.original}`)
    )
    ctx.throw(
      400,
      `File "${file.filename}" is ${fileSize.width}x${fileSize.height} pixels. 
      It exceeds the maximum width ${WIDTH_MAXIMUM}px or the maximum height ${HEIGHT_MAXIMUM}px.`
    )
  }
}

async function uploadFile(file, fileMap, userId, tagList, nsfw) {
  const filenames = fileMap.get(file.filename)
  const fileOriginal = `${UPLOAD_PATH}/${filenames.original}`
  const fileSize = sizeOf(fileOriginal)

  sharp(fileOriginal)
    .resize(WIDTH_SMALL)
    .toFile(`${UPLOAD_PATH}/${filenames.small}`)

  sharp(fileOriginal)
    .resize(WIDTH_MEDIUM)
    .toFile(`${UPLOAD_PATH}/${filenames.medium}`)

  sharp(fileOriginal)
    .resize(Math.min(WIDTH_LARGE, fileSize.width))
    .toFile(`${UPLOAD_PATH}/${filenames.large}`)

  const screenshot = new Screenshot({
    user: userId,
    file: {
      small: filenames.small,
      medium: filenames.medium,
      large: filenames.large,
      original: filenames.original
    },
    tags: tagList,
    nsfw: nsfw
  })

  const user = await User.findById(userId).exec()
  user.screenshots.push(screenshot)

  await user.save()
  await screenshot.save()
  tagList.forEach(name => addTag(name, screenshot._id))
}

async function addTag(name, screenshotId) {
  let tag = await Tag.findOne({ name }).exec()

  if (!tag) {
    tag = new Tag({ name })
  }

  tag.screenshots.push(screenshotId)
  await tag.save()
}

async function getScreenshot(ctx) {
  const { id } = ctx.request.query

  const screenshot = await Screenshot.findById(id)
    .populate('user favorites tagDocs')
    .exec()

  ctx.response.body = screenshot
  ctx.status = 200
}

async function getScreenshots(ctx) {
  const { query } = ctx.request
  const { sortBy, nsfw, page, limit } = query

  let sort

  switch (sortBy) {
    case 'date':
      sort = '-createdAt'
      break
    case 'popularity':
      sort = '-favorites'
      break
    default:
      sort = '-createdAt'
  }

  const criteria = {}

  if (!(nsfw === 'true')) {
    criteria.nsfw = false
  }

  const results = await Screenshot.paginate(criteria, {
    page: page ? Number(page) : 1,
    limit: limit ? Number(limit) : 9,
    populate: 'user favorites',
    sort
  })

  ctx.response.body = results
  ctx.status = 200
}

async function deleteScreenshot(ctx) {
  const { id } = ctx.params
  const screenshot = await Screenshot.findById(id).exec()

  if (!screenshot) {
    ctx.throw(400)
  }

  const { uid } = ctx.state
  let authedUser = await User.findById(uid).exec()

  const { user, favorites, file } = screenshot
  const isOwner = uid === user.toString()
  const isAdmin = authedUser.roles && authedUser.roles.includes('admin')

  if (!(isOwner || isAdmin)) {
    ctx.throw(401, 'You are not allowed to perform this action.')
  }

  await User.where({ _id: user })
    .update({
      $pull: {
        screenshots: id
      }
    })
    .exec()

  await User.where()
    .setOptions({ multi: true })
    .update({
      $pull: {
        favorites: { $in: favorites }
      }
    })
    .exec()

  await Favorite.remove({
    _id: { $in: favorites }
  }).exec()

  await Tag.where()
    .setOptions({ multi: true })
    .update({
      $pull: { screenshots: id }
    })
    .exec()

  await Tag.remove({
    screenshots: { $exists: true, $size: 0 }
  }).exec()

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

async function download(ctx) {
  const { screenshotId } = ctx.request.body

  await Screenshot.where({ _id: screenshotId })
    .update({
      $inc: { downloadCount: 1 }
    })
    .exec()

  ctx.status = 200
}

export default {
  upload,
  getScreenshot,
  getScreenshots,
  deleteScreenshot,
  download
}
