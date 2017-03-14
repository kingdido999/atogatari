import { schema } from 'normalizr'

const options = {
  idAttribute: '_id'
}

const favoriteSchema = new schema.Entity('favorites', {}, options)
const screenshotSchema = new schema.Entity('screenshots', {
  favorites: [favoriteSchema]
}, options)

const bangumiSchema = new schema.Entity('bangumis', {
  screenshots: [screenshotSchema]
}, options)



export {
  bangumiSchema,
  screenshotSchema,
  favoriteSchema
}
