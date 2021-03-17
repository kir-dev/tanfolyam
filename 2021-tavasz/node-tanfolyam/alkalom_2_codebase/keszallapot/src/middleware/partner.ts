import { NextFunction, Request, Response } from 'express'
import { Film } from '../entity/Film'
import { User } from '../entity/User'

export const partnerListMW = async (req: Request, res: Response, next: NextFunction) => {
  /*res.locals.matches = [
      {
          id: "123456",
          name: "Filmnéző Réka",
          email: "mov.ie@exxample.com",
          points: 35
      },
      {
          id: "654655",
          name: "Filmnéző Dorka",
          email: "mov.ie2@exxample.com",
          points: 20
      },
          {
          id: "1asdjksdajhasd",
          name: "Filmnéző Réka",
          email: "mov.ie3@exxample.com",
          points: 10
      }
  ]*/

  const currentUser: User = res.locals.user
  const partners: Map < string, [User, number] > = new Map()

  //not the most elegant way, like joining tables, but the code is more readablye than sql
  for (const u2f of currentUser.films) {
    const film = await Film.findOne({
      id: u2f.filmId
    })
    for (const f2u of film.users) {
      const checked_user = await User.findOne({
        id: f2u.userId
      })
      console.log(`checking ${checked_user.name} on ${film.Title}`)
      const data_old = partners.get(checked_user.id) || [checked_user, 0]
      const p_new = (u2f.liked == f2u.liked) ? data_old[1] + 1 : data_old[1] - 1
      partners.set(checked_user.id, [checked_user, p_new])
    }
  }

  /** Transform the map into an array of objects, with the correct points */
  res.locals.matches = Array.from(partners.keys())
    // filter out the current user
    .filter(user => user !== currentUser.id)
    // map into output data
    .map(user => {
      const [userdata, points] = partners.get(user)
      return {
        id: user,
        name: userdata.name,
        email: userdata.email,
        points: points
      }
    })
    .sort((a,b)=> b.points - a.points)

  console.log(res.locals.matches)

  return next()
}
