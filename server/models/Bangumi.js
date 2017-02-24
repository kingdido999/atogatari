import mongoose from 'mongoose'
const Schema = mongoose.Schema

const bangumiSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  episodes: [{
    index: {
      type: Number,
      required: false
    },
    title: {
      type: String,
      required: false
    }
  }],
  screenshots: [{
    type: Schema.Types.ObjectId,
    ref: 'Screenshot'
  }]
})

export default mongoose.model('Bangumi', bangumiSchema)
