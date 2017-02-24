import mongoose from 'mongoose'
const Schema = mongoose.Schema

const screenshotSchema = new Schema({
  bangumi: {
    type: Schema.Types.ObjectId,
    ref: 'Bangumi'
  },
  episode: {
    type: Number,
    required: false
  },
  uploader: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  timestamp: {
    type: String,
    required: false
  },
  thumbnail_filename: {
    type: String,
    required: true
  },
  original_filename: {
    type: String,
    required: true
  },
})

export default mongoose.model('Screenshot', screenshotSchema)
