import mongoose from 'mongoose'
const Schema = mongoose.Schema

const bangumiSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  episodes: [{
    type: Schema.Types.ObjectId,
    ref: 'Episode'
  }]
})

export default mongoose.model('Bangumi', bangumiSchema)
