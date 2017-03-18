import { schema } from 'normalizr'

const options = {
  idAttribute: '_id'
}

const userSchema = new schema.Entity('users', {}, options)
const bangumiSchema = new schema.Entity('bangumis', {}, options)
const screenshotSchema = new schema.Entity('screenshots', {}, options)
const favoriteSchema = new schema.Entity('favorites', {}, options)

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
  bangumiSchema,
  screenshotSchema,
  favoriteSchema
}
