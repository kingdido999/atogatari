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
  }
})

export default mongoose.model('User', userSchema)
