import mongoose from 'mongoose'
const Schema = mongoose.Schema

const favoriteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  screenshot: {
    type: Schema.Types.ObjectId,
    ref: 'Screenshot'
  }
})

favoriteSchema.set('timestamps', true)

export default mongoose.model('Favorite', favoriteSchema)
