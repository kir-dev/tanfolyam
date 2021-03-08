import { Router, Request, Response } from 'express'
import { canThumb, createPost, deletePost, getPost, getPosts, thumbsDownPost, thumbsUpPost, updatePost } from '../middlewares/posts.middlewares'
const router: Router = Router()

router.get('/', 
  getPosts,
  (req: Request, res: Response) => { 
  res.render('posts/index', {
    posts: req.posts
  })
})

router.get('/new',
  (req: Request, res: Response) => { 
  res.render('posts/editnew')
})

router.post('/new', 
  createPost,
  (req: Request, res: Response) => { 
  res.redirect('/posts')
})

router.get('/:id', 
  getPost,
  (req: Request, res: Response) => { 
  res.render('posts/show', {
    post: req.post
  })
})

router.get('/:id/edit', 
  getPost,
  (req: Request, res: Response) => { 
  res.render('posts/editnew', {
    post: req.post
  })
})

router.post('/:id/edit', 
  getPost,
  updatePost,
  (req: Request, res: Response) => { 
  res.redirect(`/posts/${req.params.id}`)
})

router.post('/:id/up', 
  getPost,
  canThumb,
  thumbsUpPost,
  (req: Request, res: Response) => { 
  res.redirect(`/posts/${req.params.id}`)
})

router.post('/:id/down', 
  getPost,
  canThumb,
  thumbsDownPost,
  (req: Request, res: Response) => { 
  res.redirect(`/posts/${req.params.id}`)
})

router.delete('/:id', 
  getPost,
  deletePost,
  (req: Request, res: Response) => { 
  res.redirect('/posts')
})

export const PostsController: Router = router
