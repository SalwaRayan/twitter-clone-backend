const { Schema, model } = require('mongoose')

const TweetSchema = Schema({
    tweetContent: {
        type: String
    },
    user: { 
        type: Schema.Types.ObjectId, ref: 'User' 
    },
    retweets: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Tweet' 
    }],
    comments: [{ 
        type: Schema.Types.ObjectId, ref: 'Comment' }]
}, {
    timestamps: true
})

const Tweet = model('Tweet', TweetSchema)

module.exports = Tweet