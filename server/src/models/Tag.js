import mongoose from 'mongoose'
const Schema = mongoose.Schema

const tagSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  screenshots: [{
    type: Schema.Types.ObjectId,
    ref: 'Screenshot'
  }],
})

export default mongoose.model('Tag', tagSchema)