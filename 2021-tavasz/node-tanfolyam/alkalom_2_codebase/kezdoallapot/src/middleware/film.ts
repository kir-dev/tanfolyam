import { NextFunction, Request, Response } from 'express'
import { Film } from '../entity/Film'
import { User } from '../entity/User'
import { UserToFilm } from '../entity/UserToFilm'
import { OMDB_Api } from '../service/OMDB'

export const searchFilmMW = (req: Request, res: Response, next: NextFunction) => {
  const title = req.body.t
  const year = req.body.y

  OMDB_Api.getInstance().search(title, year)
    .then(result => {
      res.locals.title = title
      res.locals.year = year
      res.locals.result = result
      next()
    }).catch(next)
}


export const getFilmDataMW = async (req: Request, res: Response, next: NextFunction) => {
  const imdbID = req.params.imdbID
  if (!imdbID) return next('No id specified')

  try {
    let film = await Film.findOne({
      imdbID
    })

    if (!film) {
      film = new Film()
      const filmData = await OMDB_Api.getInstance().getById(imdbID)
      film.Title = filmData.Title
      film.Year = filmData.Year
      film.Poster = filmData.Poster
      film.imdbID = imdbID
      await film.save()
    }

    res.locals.film = film
    return next()
  }
  catch (error) {
    return next(error)
  }
}


export const findOrCreateOpinionMW = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!res.locals.film)
      return next('No film found')

    const film: Film = res.locals.film
    const currentUser: User = res.locals.user

    let opinion = await UserToFilm.findOne({
      userId: currentUser.id,
      filmId: film.id
    })

    if (!opinion) {
      opinion = new UserToFilm()
      opinion.user = currentUser
      opinion.film = film
    }

    res.locals.opinion = opinion
    return next()
  } 
  catch (error) {
    next(error)
  }
}

export const likeFilmMW = (req: Request, res: Response, next: NextFunction) => {
  if (!res.locals.opinion) {
    return next('No opnion found')
  }
  const op: UserToFilm = res.locals.opinion

  if (op.hasId() && op.liked) {
    return res.sendStatus(405)
  }

  op.liked = true
  return op.save().
    then(() => next())
    .catch(next)
}

export const dislikeFilmMW = (req: Request, res: Response, next: NextFunction) => {

  if (!res.locals.opinion) {
    return next('No opnion found')
  }
  const op: UserToFilm = res.locals.opinion

  if (op.hasId() && !op.liked) {
    return res.sendStatus(405)
  }

  op.liked = false
  return op.save().
    then(() => next())
    .catch(next)
}
