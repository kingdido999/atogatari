import { getRandomString, sha512 } from '../utils'

import Screenshot from '../models/Screenshot'
import Bangumi from '../models/Bangumi'
import User from '../models/User'
import config from '../config'

import mongoose from 'mongoose'
import faker from 'faker'

const NUM_USER = 5
const NUM_BANGUMI = 20
const NUM_SCREENSHOT = 12

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
      console.log('user saved');
    } catch (e) {
      console.log(e)
    }

    userList.push(user)
  }

  console.log('Creating bangumis...')
  for (let i = 0; i < NUM_BANGUMI; i++) {
    const bangumi = new Bangumi({
      title: faker.name.title()
    })

    try {
      await bangumi.save()
    } catch (e) {
      console.log(e)
    }

    console.log('Creating screenshots...');
    for (let j = 0; j < NUM_SCREENSHOT; j++) {
      const image = faker.image.image(300, 200)

      const screenshot = new Screenshot({
        bangumi_id: bangumi.id,
        episode: faker.random.number({ min: 0, max: 24 }),
        uploader_id: faker.random.arrayElement(userList).id,
        thumbnail_filename: image,
        original_filename: image
      })

      try {
        await screenshot.save()
      } catch (e) {
        console.log(e)
      }
    }
  }

  return new Promise((resolve, reject) => {
    resolve()
  })
}
