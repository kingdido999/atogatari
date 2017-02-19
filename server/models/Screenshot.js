import mongoose from 'mongoose'
const Schema = mongoose.Schema

const screenshotSchema = new Schema({
  bangumi_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  episode: {
    type: Number,
    required: false
  },
  uploader_id: {
    type: Schema.Types.ObjectId,
    required: true
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
