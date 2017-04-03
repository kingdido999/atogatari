import { getRandomString, sha512 } from '../utils'

import Screenshot from '../models/Screenshot'
import Favorite from '../models/Favorite'
import Bangumi from '../models/Bangumi'
import User from '../models/User'
import Tag from '../models/Tag'
import { DATABASE } from '../../.env'

import mongoose from 'mongoose'
import faker from 'faker'
import { uniq } from 'lodash'

const NUM_USER = 5
const NUM_BANGUMI = 6
const NUM_BANGUMI_SCREENSHOT = 30

mongoose.Promise = global.Promise
mongoose.connect(DATABASE, {
  promiseLibrary: global.Promise
})

run()

async function run () {
  await purge()
  await seed()
  process.exit()
}

async function purge () {
  console.log('Removing current data...')

  await Tag.remove({})
  await User.remove({})
  await Bangumi.remove({})
  await Favorite.remove({})
  await Screenshot.remove({})
}

async function seed () {
  console.log('Seeding new data...')

  const userList = []
  const admin = createUser(
    'test@bu.edu',
    'test',
    '123456',
    ['admin']
  )
  await admin.save()
  userList.push(admin)

  for (let i = 0; i < NUM_USER; i++) {
    const user = createUser()
    await user.save()
    userList.push(user)
  }

  for (let i = 0; i < NUM_BANGUMI; i++) {
    const bangumi = createBangumi()

    for (let j = 0; j < NUM_BANGUMI_SCREENSHOT; j++) {
      const user = faker.random.arrayElement(userList)
      const tags = createRandomWords(faker.random.number(10))
      const screenshot = createScreenshot(bangumi, user, tags)
      await screenshot.save()

      tags.forEach(tag => createTag(tag, screenshot._id))

      user.screenshots.push(screenshot)
      await user.save()
      bangumi.screenshots.push(screenshot)
    }

    await bangumi.save()
  }
}

function createRandomWords (count) {
  const tags = []

  for (let i = 0; i < count; i++) {
    tags.push(faker.hacker.noun())
  }

  return uniq(tags)
}

function createUser (
  email = faker.internet.email(),
  username = faker.internet.userName(),
  password = faker.internet.password(),
  roles = []
) {
  const salt = getRandomString(16)
  const hash = sha512(password, salt)

  return new User({
    email,
    username,
    salt,
    hash,
    roles
  })
}

function createBangumi (
  title = faker.lorem.words(),
  aliases = createRandomWords(faker.random.number(3))
) {
  return new Bangumi({
    title,
    aliases
  })
}

function createScreenshot (bangumi, user, tags) {
  return new Screenshot({
    bangumi: bangumi._id,
    user: user._id,
    episode: faker.random.number(24),
    file: {
      small: 'small.jpg',
      medium: 'medium.jpg',
      large: 'large.jpg',
      original: 'original.png'
    },
    tags
  })
}

async function createTag (name, screenshotId) {
  let tag = await Tag.findOne({ name }).exec()

  if (!tag) {
    tag = new Tag({ name })
  }

  tag.screenshots.push(screenshotId)
  await tag.save()
}
