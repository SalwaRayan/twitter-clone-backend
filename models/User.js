const { Schema, model } = require('mongoose')

const UserSchema = Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    default: ""
  },
  bannerPicture: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    default: ""
  },
  birthDate: {
    type: Date,
    default: Date.now(),
    // required: true
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