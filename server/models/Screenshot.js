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
  file: {
    small: {
      type: String,
      required: true
    },
    medium: {
      type: String,
      required: true
    },
    large: {
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
  }],
  tags: {
    type: [String],
    index: true
  }
})

export default mongoose.model('Screenshot', screenshotSchema)
