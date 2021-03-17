import express, { NextFunction, Request, Response } from 'express'
import { authRequiredMW } from '../middleware/auth'
import { jsonMW, renderMW } from '../middleware/base'
import { dislikeFilmMW, getFilmDataMW, findOrCreateOpinionMW, searchFilmMW, likeFilmMW, getOpiniatedFilmsMW, deleteUserToFilmMW } from '../middleware/film'

const router = express.Router()

router.get('/',
  authRequiredMW,
  renderMW('films/form')
)

router.get('/opinionated',
  authRequiredMW,
  getOpiniatedFilmsMW,
  renderMW('films/index')
)

router.delete('/delete/:imdbID',
  authRequiredMW,
  getFilmDataMW,
  deleteUserToFilmMW,
  renderMW('films/index')
)

router.post('/',
  authRequiredMW,
  searchFilmMW, 
  renderMW('films/form')
)

router.post('/like/:imdbID',
  authRequiredMW,
  getFilmDataMW,
  findOrCreateOpinionMW,
  likeFilmMW,
  jsonMW({status:true})
)

router.post('/dislike/:imdbID',
  authRequiredMW,
  getFilmDataMW,
  findOrCreateOpinionMW,
  dislikeFilmMW,
  jsonMW({status:true})
)

export default router