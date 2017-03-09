import mongoose from 'mongoose'
const Schema = mongoose.Schema

const screenshotSchema = new Schema({
  bangumiId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true
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
  meta: {
    favoritesCount: {
      type: Number,
      default: 0
    }
  }
})

export default mongoose.model('Screenshot', screenshotSchema)
