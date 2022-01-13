const res = require("express/lib/response")
const passport = require("passport")
const passportLocal = require("passport-local")

const LocalStrategy = passportLocal.Strategy

const User = require('../models/User')

passport.use(new LocalStrategy(async (username, password, done) => {
  try {
     const user = User.findOne({ username, password })

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