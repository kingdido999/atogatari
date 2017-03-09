import mongoose from 'mongoose'
const Schema = mongoose.Schema

const bangumiSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  meta: {
    screenshotsCount: {
      type: Number,
      default: 0
    }
  }
})

export default mongoose.model('Bangumi', bangumiSchema)
