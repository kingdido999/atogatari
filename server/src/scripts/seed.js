import { getRandomString, sha512 } from '../utils'

import Screenshot from '../models/Screenshot'
import Favorite from '../models/Favorite'
import Bangumi from '../models/Bangumi'
import User from '../models/User'
import Tag from '../models/Tag'
import { DATABASE } from '../../.env'

import mongoose from 'mongoose'
import faker from 'faker'

const NUM_USER = 5
const NUM_BANGUMI = 10
const NUM_BANGUMI_SCREENSHOT = 100

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

  for (let i = 0; i < NUM_USER; i++) {
    const user = createUser()
    await user.save()
    userList.push(user)
  }

  for (let i = 0; i < NUM_BANGUMI; i++) {
    const bangumi = createBangumi()

    for (let j = 0; j < NUM_BANGUMI_SCREENSHOT; j++) {
      const user = faker.random.arrayElement(userList)
      const tags = createRandomTags(faker.random.number(10))
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

function createRandomTags (count) {
  const tags = []

  for (let i = 0; i < count; i++) {
    tags.push(faker.hacker.noun())
  }

  return tags
}

function createUser () {
  const salt = getRandomString(16)
  const hash = sha512(faker.internet.password(), salt)

  return new User({
    email: faker.internet.email(),
    username: faker.internet.userName(),
    salt: salt,
    hash: hash
  })
}

function createBangumi () {
  return new Bangumi({
    title: faker.lorem.words()
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
    tags: tags
  })
}

async function createTag (name, screenshotId) {
  const tag = new Tag({
    name: name,
  })

  tag.screenshots.push(screenshotId)
  await tag.save()
}
