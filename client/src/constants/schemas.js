import { schema } from 'normalizr'

const options = {
  idAttribute: '_id'
}

const userSchema = new schema.Entity('users', {}, options)
const bangumiSchema = new schema.Entity('bangumis', {}, options)
const screenshotSchema = new schema.Entity('screenshots', {}, options)
const favoriteSchema = new schema.Entity('favorites', {}, options)

userSchema.define({
  screenshots: [screenshotSchema],
  favorites: [favoriteSchema]
})

bangumiSchema.define({
  screenshots: [screenshotSchema]
})

screenshotSchema.define({
  bangumi: bangumiSchema,
  favorites: [favoriteSchema],
  user: userSchema
})

favoriteSchema.define({
  user: userSchema,
  screenshot: screenshotSchema
})

export {
  userSchema,
  bangumiSchema,
  screenshotSchema,
  favoriteSchema
}
