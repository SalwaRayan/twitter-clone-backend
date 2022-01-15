const { Schema, model } = require("mongoose")

const CommentSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  tweet: {
    type: Schema.Types.ObjectId,
    ref: 'Tweet'
  },
  content: {
    type: String,
    maxLength: 280,
    required: true
  }
}, {
  timestamps: true
})

const Comment = model('Comment', CommentSchema)

module.exports = Comment