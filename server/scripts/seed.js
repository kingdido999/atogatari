import { getRandomString, sha512 } from '../utils'

import Screenshot from '../models/Screenshot'
import Episode from '../models/Episode'
import Bangumi from '../models/Bangumi'
import User from '../models/User'
import config from '../config'

import mongoose from 'mongoose'
import faker from 'faker'

const NUM_USER = 5
const NUM_BANGUMI = 10
const NUM_EPISODE = 12
const NUM_SCREENSHOT = 5

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
  await Episode.remove({})
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
    const episodeList = []

    for (let j = 0; j < NUM_EPISODE; j++) {
      const episode = createEpisode(j, bangumi)
      episodeList.push(episode)

      const screenshotList = []

      for (let k = 0; k < NUM_SCREENSHOT; k++) {
        const randUser = faker.random.arrayElement(userList)
        const screenshot = createScreenshot(bangumi, episode, randUser)
        await screenshot.save()
        screenshotList.push(screenshot)
      }

      episode.screenshots = screenshotList
      await episode.save()
    }

    bangumi.episodes = episodeList
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

function createEpisode (index, bangumi) {
  return new Episode({
    index: index,
    title: faker.lorem.sentence(),
    bangumi: bangumi._id
  })
}

function createScreenshot (bangumi, episode, user) {
  const image = faker.image.image(300, 200)

  return new Screenshot({
    bangumi: bangumi._id,
    episode: episode._id,
    uploader: user._id,
    thumbnail_filename: image,
    original_filename: image
  })
}
