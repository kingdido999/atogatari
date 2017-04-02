import mongoose from 'mongoose'
const Schema = mongoose.Schema

const bangumiSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  aliases: {
    type: [String],
    index: true
  },
  screenshots: [{
    type: Schema.Types.ObjectId,
    ref: 'Screenshot'
  }]
})

bangumiSchema.set('timestamps', true)

export default mongoose.model('Bangumi', bangumiSchema)
