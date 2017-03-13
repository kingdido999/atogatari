import { schema } from 'normalizr'

const options = {
  idAttribute: '_id'
}

export const bangumiSchema = new schema.Entity('bangumis', {}, options)
export const screenshotSchema = new schema.Entity('screenshots', {}, options)
export const favoriteSchema = new schema.Entity('favorites', {}, options)
