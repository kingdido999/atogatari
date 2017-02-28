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

seed()
.then(res => {
  console.log('Seed successfully!')
  process.exit()
})
.catch(err => {
  console.log(err)
  process.exit()
})

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

async function seed () {

  const userList = []

  for (let i = 0; i < NUM_USER; i++) {
    const user = createUser()
    await user.save()
    userList.push(user)
  }

  for (let i = 0; i < NUM_BANGUMI; i++) {
    const bangumi = createBangumi()
    await bangumi.save()
    const episodeList = []

    for (let j = 0; j < NUM_EPISODE; j++) {
      const episode = createEpisode(j, bangumi)
      await episode.save()
      episodeList.push(episode)
      const screenshotList = []

      for (let k = 0; k < NUM_SCREENSHOT; k++) {
        const screenshot = createScreenshot(bangumi, episode, faker.random.arrayElement(userList))
        await screenshot.save()
        screenshotList.push(screenshot)
      }

      episode.screenshots = screenshotList
    }

    bangumi.episodes = episodeList
    await bangumi.save()
  }

  return new Promise((resolve, reject) => {
    resolve()
  })
}
