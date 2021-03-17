import express from 'express'
import passport from 'passport'

/**Create authentication routers */
const router = express.Router()

router.get('/oauth', passport.authenticate('oauth2'))

router.get('/oauth/callback',
  passport.authenticate('oauth2', {
    failureRedirect: '/login'
  }),
  (req, res) => res.redirect('/')
)

router.get('/logout', (req, res) => {
  req.logOut()
  return res.redirect('/')
})



export default router