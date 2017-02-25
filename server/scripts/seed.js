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

async function seed () {

  const userList = []

  console.log('Creating users...')
  for (let i = 0; i < NUM_USER; i++) {
    const salt = getRandomString(16)
    const hash = sha512(faker.internet.password(), salt)

    const user = new User({
      email: faker.internet.email(),
      username: faker.internet.userName(),
      salt: salt,
      hash: hash
    })

    try {
      await user.save()
    } catch (e) {
      console.log(e)
    }

    userList.push(user)
  }

  console.log('Creating bangumis...')
  for (let i = 0; i < NUM_BANGUMI; i++) {
    const bangumi = new Bangumi({
      title: faker.lorem.words()
    })

    try {
      await bangumi.save()
    } catch (e) {
      console.log(e)
    }

    const episodeList = []

    console.log('Creating episodes...')
    for (let j = 0; j < NUM_EPISODE; j++) {
      const episode = new Episode({
        index: j,
        title: faker.lorem.sentence(),
        bangumi: bangumi._id
      })

      try {
        await episode.save()
      } catch (e) {
        console.log(e)
      }

      episodeList.push(episode)

      const screenshotList = []

      console.log('Creating screenshots...')
      for (let k = 0; k < NUM_SCREENSHOT; k++) {
        const image = faker.image.image(300, 200)

        const screenshot = new Screenshot({
          bangumi: bangumi._id,
          episode: episode._id,
          uploader: faker.random.arrayElement(userList)._id,
          thumbnail_filename: image,
          original_filename: image
        })

        try {
          await screenshot.save()
        } catch (e) {
          console.log(e)
        }

        screenshotList.push(screenshot)
      }

      try {
        episode.screenshots = screenshotList
        await episode.save()
      } catch (e) {
        console.log(e)
      }
    }

    try {
      bangumi.episodes = episodeList
      await bangumi.save()
    } catch (e) {
      console.log(e)
    }
  }

  return new Promise((resolve, reject) => {
    resolve()
  })
}
