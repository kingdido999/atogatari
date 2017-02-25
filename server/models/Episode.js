import mongoose from 'mongoose'
const Schema = mongoose.Schema

const episodeSchema = new Schema({
  index: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  bangumi: {
    type: Schema.Types.ObjectId,
    ref: 'Bangumi'
  },
  screenshots: [{
    type: Schema.Types.ObjectId,
    ref: 'Screenshot'
  }]
})

export default mongoose.model('Episode', episodeSchema)
