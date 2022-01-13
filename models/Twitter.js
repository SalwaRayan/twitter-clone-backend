const { Schema, model } = require('mongoose')

const TwitterSchema = Schema({
    content: {
        type: String
    },
    user: { 
        type: Schema.Types.ObjectId, ref: 'User' 
    },
    retweets: [
        { type: Schema.Types.ObjectId, ref: 'Tweet' }
    ],
    comments: [{ 
        type: Schema.Types.ObjectId, ref: 'Comment' }]
}, {
    timestamps: true
})

const Twitter = model('Twitter', TwitterSchema)

module.exports = Twitter