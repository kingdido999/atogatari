import { getRandomString, sha512 } from '../utils'

import Screenshot from '../models/Screenshot'
import Favorite from '../models/Favorite'
import Bangumi from '../models/Bangumi'
import User from '../models/User'
import config from '../config'

import mongoose from 'mongoose'
import faker from 'faker'

const NUM_USER = 5
const NUM_BANGUMI = 10
const NUM_BANGUMI_SCREENSHOT = 100

mongoose.Promise = global.Promise
mongoose.connect(config.database.dev, {
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
      const screenshot = createScreenshot(bangumi, user)
      await screenshot.save()
      bangumi.screenshots.push(screenshot)
    }

    await bangumi.save()
  }
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

function createScreenshot (bangumi, user) {

  return new Screenshot({
    bangumi: bangumi._id,
    user: user._id,
    episode: faker.random.number(24),
    file: {
      small: faker.image.image(380, 214),
      medium: faker.image.image(1024, 600),
      large: faker.image.image(1920, 1080),
      original: faker.image.image(1920, 1080)
    }
  })
}
