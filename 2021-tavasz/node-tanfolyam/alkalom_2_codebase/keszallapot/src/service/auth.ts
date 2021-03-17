import fetch from 'node-fetch'
import OAuth2Strategy from 'passport-oauth2'
import { User } from '../entity/User'

/**Configure passport to use authsch ouath2  service */
export const authschStrategy = new OAuth2Strategy({
  authorizationURL: 'https://auth.sch.bme.hu/site/login',
  tokenURL: 'https://auth.sch.bme.hu/oauth2/token',
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL,
  scope: ['basic', 'displayName', 'mail']
},
async function (accessToken: string, refreshToken: string, profile: any, done: (err: Error, user: User) => void) {

  //todo integrate this into our own database
  const userdata = await fetch(`https://auth.sch.bme.hu/api/profile?access_token=${accessToken}`)
    .then(res => res.json())
  const user = await User.findOne({
    id: userdata.internal_id
  })

  if (user) {
    done(null, user)
  } else {
    const newUser = new User()
    newUser.id = userdata.internal_id
    newUser.name = userdata.displayName
    newUser.email = userdata.mail
    await newUser.save()
    done(null, newUser)
  }
})

export const authscUserSerializer = (user: User, done) => {
  done(null, user.id)
}

export const authschUserDeserializer = async (id: string, done) => {
  const user = await User.findOne({
    id: id
  })
  done(null, user)
}