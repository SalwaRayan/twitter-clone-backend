const { Schema, model } = require('mongoose')

const UserSchema = Schema({
  username: {
    type: String
  },
  password: {
    type: String
  },
  
})

const Car = model('User', UserSchema)

module.exports