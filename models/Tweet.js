const { Schema, model } = require('mongoose')

const TweetSchema = Schema({
    content: {
        type: String,
        maxLenght: 280,
        required: true
    },
    user: { 
        type: Schema.Types.ObjectId, ref: 'User' 
    },
    retweets: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    }],
    comments: [{ 
        type: Schema.Types.ObjectId, ref: 'Comment' 
    }],
}, {
    timestamps: true
})

const Tweet = model('Tweet', TweetSchema)

module.exports = Tweet