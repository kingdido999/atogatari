import mongoose from 'mongoose'
const Schema = mongoose.Schema

const screenshotSchema = new Schema({
  bangumi_id: {
    type: ObjectId,
    required: true
  },
  episode: {
    type: Number,
    required: true
  },
  uploader_id: {
    type: ObjectId,
    required: true
  },
  timestamp: {
    type: String,
    required: false
  },
  thumbnail_url: {
    type: String,
    required: true
  },
  original_url: {
    type: String,
    required: true
  },
})

export default mongoose.model('User', screenshotSchema)
