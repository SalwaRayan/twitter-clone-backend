const res = require("express/lib/response")
const passport = require("passport")
const passportLocal = require("passport-local")

const LocalStrategy = passportLocal.Strategy

const User = require('../models/User')

passport.use(new LocalStrategy({ usernameField: "email" }, async (username, password, done) => {
  try {
     const user = await User.findOne({ email: username, password: password })
     console.log(user)

     if (!user) {
       return done(null, false)
     }

     return done(null, user)
  } catch (err) {
    console.log(err)
  }
}))

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  try {
    const user = User.findOne({ _id: id }) 
    done(null, user)
  } catch (err) {
    console.log(err)
  }
})

module.exports = passport