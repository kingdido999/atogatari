import { schema } from 'normalizr'

const options = {
  idAttribute: '_id'
}

export const favoriteSchema = new schema.Entity('favorites', {}, options)
export const favoriteListSchema = [favoriteSchema]

export const screenshotSchema = new schema.Entity('screenshots', {
  favorites: favoriteListSchema
}, options)
export const screenshotListSchema = [screenshotSchema]

export const bangumiSchema = new schema.Entity('bangumis', {
  screenshots: screenshotListSchema
}, options)
export const bangumiListSchema = [bangumiSchema]
