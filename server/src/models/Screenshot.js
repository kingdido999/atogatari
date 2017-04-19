import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'

const Schema = mongoose.Schema

const screenshotSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    nsfw: {
      type: Boolean
    },
    file: {
      small: {
        type: String,
        required: true
      },
      medium: {
        type: String,
        required: true
      },
      large: {
        type: String,
        required: true
      },
      original: {
        type: String,
        required: true
      }
    },
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Favorite'
      }
    ],
    tags: {
      type: [String]
    },
    downloadCount: {
      type: Number,
      default: 0
    }
  },
  { toJSON: { virtuals: true } }
)

screenshotSchema.virtual('tagDocs', {
  ref: 'Tag',
  localField: 'tags',
  foreignField: 'name'
})

screenshotSchema.set('timestamps', true)
screenshotSchema.plugin(mongoosePaginate)

export default mongoose.model('Screenshot', screenshotSchema)
