import { model, Schema, Model, Document } from 'mongoose'

const PostSchema: Schema = new Schema({
  title: {
    type: String, required: true
  },
  content: {
    type: String, default: ''
  },
  thumbsUpNumber: {
    type: Number, default: 0
  },
  thumbsDownNumber: {
    type: Number, default: 0
  },
  createdAt: {
    type: Date, default: Date.now
  },
  disableThumbs: {
    type: Boolean, default: false
  }
})

export const Post: Model<IPost> = model('Post', PostSchema)

export interface IPost extends Document { 
  title: string
  content: string
  thumbsUpNumber: number
  thumbsDownNumber: number
  createdAt: Date
  disableThumbs: boolean
}
