import { getRandomString, sha512 } from '../utils'

import Screenshot from '../models/Screenshot'
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
    const bangumi = createBangumi(NUM_BANGUMI_SCREENSHOT)

    for (let j = 0; j < NUM_BANGUMI_SCREENSHOT; j++) {
      const randUser = faker.random.arrayElement(userList)
      const screenshot = createScreenshot(bangumi, randUser)
      await screenshot.save()
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

function createBangumi (screenshotsCount) {
  return new Bangumi({
    title: faker.lorem.words(),
    meta: {
      screenshotsCount: screenshotsCount
    }
  })
}

function createScreenshot (bangumi, user) {
  const image = faker.image.image(300, 200)

  return new Screenshot({
    bangumiId: bangumi._id,
    userId: user._id,
    episode: faker.random.number(24),
    path: {
      thumbnail: image,
      original: image
    }
  })
}
