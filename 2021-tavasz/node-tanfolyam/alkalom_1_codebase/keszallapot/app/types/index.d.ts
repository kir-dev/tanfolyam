import { Post } from '../models/post'

declare global {
  namespace Express {
    interface Request {
      posts: Post[],
      post: Post
    }
  }
}
