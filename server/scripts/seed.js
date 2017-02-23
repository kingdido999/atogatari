import { getRandomString, sha512 } from '../utils/index'

import Screentshot from '../models/Screenshot'
import Bangumi from '../models/Bangumi'

import faker from 'faker'

const NUM_USER = 5
const NUM_BANGUMI = 20
const NUM_SCREENSHOT = 12

async function seed () {

  const userList = []

  for (let i = 0; i < NUM_USER; i++) {
    const salt = getRandomString(16)
    const hash = sha512(faker.internet.password, salt)

    const user = new User({
      email: faker.internet.email,
      username: faker.internet.username,
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

  for (let i = 0; i < NUM_BANGUMI; i++) {
    const bangumi = new Bangumi({
      title: faker.name.title
    })

    try {
      await bangumi.save()
    } catch (e) {
      console.log(e)
    }

    for (let j = 0; j < NUM_SCREENSHOT; j++) {
      const screenshot = new Screenshot({
        bangumi_id: bangumi.id,
        episode: faker.random.number({ min: 0, max: 24 }),
        uploader_id: faker.random.arrayElement(userList).id,
        thumbnail_filename: faker.image.image(300, 300),
        original_filename: faker.image.image(1920, 1080)
      })

      try {
        await screenshot.save()
      } catch (e) {
        console.log(e)
      }
    }
  }
}

seed()
