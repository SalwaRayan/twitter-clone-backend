const { Schema, model } = require('mongoose')

const UserSchema = Schema({
  username: {
    type: String
  },
  password: {
    type: String
  },
  profilePicture: {
    type: String
  },
  bannerPicture: {
    type: String
  },
  description: {
    type: String
  },
  birthDate: {
    type: Date
  },
  followers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  following: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  tweets: [{
    type: Schema.Types.ObjectId,
    ref: 'Tweet'
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
}, {
  timestamps: true
})

const User = model('User', UserSchema)

module.exports = User