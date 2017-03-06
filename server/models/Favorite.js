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

export default mongoose.model('Favorite', favoriteSchema)
