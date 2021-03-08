import { NextFunction, Request, Response } from 'express'

export const authRequiredMW = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    res.locals.user = req.user
    return next()
  } 
  else {
    return res.redirect('/login')
  }
}