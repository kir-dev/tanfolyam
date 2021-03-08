import { Request, Response, NextFunction} from 'express'
import { IPost, Post } from '../models/post'

export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  const posts = await Post.find().catch((err) => {
    return next(err)
  })

  if (posts) {
    req.posts = posts
    return next()
  }
  else {
    res.render('error/not-found')
  }
}

export const getPost = async (req: Request, res: Response, next: NextFunction) => {
  const post = await Post.findById(req.params.id)
  .catch((err) => {
    return next(err)
  })

  if (post) {
    req.post = post
    return next()
  }
  else {
    res.render('error/not-found')
  }
}

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
  const post: IPost = await Post.create({
    title: req.body.post.title,
    content: req.body.post.content ?? '',
    disableThumbs: req.body.post.disableThumbs
  }).catch((err) => {
    return next(err)
  })

  req.post = post
  return next()
}

export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  const post: IPost = req.post

  post.title = req.body.post.title
  post.content = req.body.post.content ?? ''
  post.disableThumbs = req.body.post.disableThumbs

  await post.save().catch((err) => {
    return next(err)
  })
  return next()
}

export const thumbsUpPost = async (req: Request, res: Response, next: NextFunction) => {
  const post: IPost = req.post

  post.thumbsUpNumber++

  await post.save().catch((err) => {
    return next(err)
  })
  return next()
}

export const thumbsDownPost = async (req: Request, res: Response, next: NextFunction) => {
  const post: IPost = req.post

  post.thumbsDownNumber++

  await post.save().catch((err) => {
    return next(err)
  })
  return next()
}

export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  const post: IPost = req.post

  post.delete().catch((err) => {
    return next(err)
  })
  return next()
}

export const canThumb = async (req: Request, res: Response, next: NextFunction) => {
  const post: IPost = req.post

  if (post.disableThumbs) {
    res.render('error/forbidden')
  }
  else {
    return next()
  }
}

