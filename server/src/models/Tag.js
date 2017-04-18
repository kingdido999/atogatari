import mongoose from 'mongoose'
const Schema = mongoose.Schema

const tagSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
		type: String,
    default: 'General'
  },
  screenshots: [{
    type: Schema.Types.ObjectId,
    ref: 'Screenshot'
  }]
})

tagSchema.set('timestamps', true)

export default mongoose.model('Tag', tagSchema)
