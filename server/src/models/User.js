import mongoose from 'mongoose'
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    requried: true
  },
  salt: {
    type: String,
    required: true
  },
  hash: {
    type: String,
    required: true
  },
  roles: {
    type: [String]
  },
  screenshots: [{
    type: Schema.Types.ObjectId,
    ref: 'Screenshot'
  }],
  favorites: [{
    type: Schema.Types.ObjectId,
    ref: 'Favorite'
  }]
})

userSchema.set('timestamps', true)

export default mongoose.model('User', userSchema)
