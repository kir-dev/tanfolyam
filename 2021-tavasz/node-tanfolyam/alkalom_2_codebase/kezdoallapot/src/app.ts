import express from 'express'
import 'reflect-metadata'
import passport from 'passport'
import session from 'express-session'
import { authschStrategy, authscUserSerializer, authschUserDeserializer } from './service/auth'
import authController from './controller/auth'
import filmController from './controller/film'
import baseController from './controller/base'
import partnerController from './controller/partner'
import errorHandler from 'errorhandler'
import { authRequiredMW } from './middleware/auth'
import { redirectMW } from './middleware/base'

const app = express()

app.set('port', process.env.PORT || 3000)
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({ secret: 'cats', resave: true, saveUninitialized: true }))
app.use(express.static('public'))
app.use(errorHandler())

/**passport init */
passport.use(authschStrategy)
passport.serializeUser(authscUserSerializer)
passport.deserializeUser(authschUserDeserializer)
app.use(passport.initialize())
app.use(passport.session())

app.use('/', baseController)
app.use('/auth', authController)
app.use('/films', filmController)
app.use('/partners', partnerController)

/**
 * Error routes
 */
app.use('*', (req, res) => res.render('error/not-found'))

export default app