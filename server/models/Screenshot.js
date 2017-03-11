import mongoose from 'mongoose'
const Schema = mongoose.Schema

const screenshotSchema = new Schema({
  bangumi: {
    type: Schema.Types.ObjectId,
    ref: 'Bangumi'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  episode: {
    type: Number,
    required: true
  },
  timestamp: {
    type: String,
    required: false
  },
  path: {
    thumbnail: {
      type: String,
      required: true
    },
    original: {
      type: String,
      required: true
    },
  },
  favorites: [{
    type: Schema.Types.ObjectId,
    ref: 'Favorite'
  }]
})

export default mongoose.model('Screenshot', screenshotSchema)
