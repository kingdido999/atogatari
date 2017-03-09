import mongoose from 'mongoose'
const Schema = mongoose.Schema

const favoriteSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  screenshotId: {
    type: Schema.Types.ObjectId,
    required: true
  }
})

export default mongoose.model('Favorite', favoriteSchema)
