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
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }]
})

export default mongoose.model('User', bangumiSchema)
