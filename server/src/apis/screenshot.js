import Screenshot from '../models/Screenshot'
import Favorite from '../models/Favorite'
import Bangumi from '../models/Bangumi'
import User from '../models/User'
import Tag from '../models/Tag'

import fs from 'fs'

const UPLOAD_PATH = 'assets/images'

async function getScreenshot (ctx) {
  const { id } = ctx.request.query

  const screenshot = await Screenshot
    .findById(id)
    .populate('bangumi user favorites')
    .exec()

  ctx.response.body = screenshot
  ctx.status = 200
}

async function getScreenshots (ctx) {
  const { query } = ctx.request

  const screenshots = await Screenshot
    .find(query)
    .sort({ 'date': -1 })
    .limit(18)
    .populate('bangumi user favorites')
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

  const { bangumi, user, favorites, file } = screenshot
  const isOwner = uid === user.toString()
  const isAdmin = authedUser.roles && authedUser.roles.includes('admin')

  if (!(isOwner || isAdmin)) {
    ctx.throw(401, 'You are not allowed to perform this action.')
  }

  await Bangumi
    .where({ _id: bangumi })
    .update({
      $pull: {
        screenshots: id
      }
    })
    .exec()

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
    bangumiId: bangumi,
    userId: user
  }
  ctx.status = 200
}

export default {
  getScreenshot,
  getScreenshots,
  deleteScreenshot
}
