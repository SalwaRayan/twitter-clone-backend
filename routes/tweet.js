const express = require('express')
const Tweet = require("../models/Tweet")
const User = require("../models/User")
const app = express()


// post a new tweet
app.post('/:id/tweet', async (req, res) => {

    
    const { id } = req.params

    try {
        // creation of the new tweet (instanciation)
        const tweet = await new Tweet({ ...req.body })

        // register the new tweet made by user
        tweet.save(async (err, tweet) => {
            if (tweet) {

                // each tweet is created so linked by a unique user
                // so it is necessary to create a relation between the new tweet created
                // by user that already exists

                // 
                tweet.user = id
                const getCurrentUser = await User.findOne({ _id: id })
                
                // console.log(getCurrentUser)
                getCurrentUser.tweets.push(tweet._id)
                getCurrentUser.save()
                
                res.json(tweet)
                return
            }
            console.log('tweet', tweet);
            console.log(err)
            res.status(500).json({ error: err })
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err })
    }
})

// route created to delete a tweet
app.delete('/:id/tweet', async (req, res) => {

    // get the tweet id in order for target it first
    const { id } = req.params

    try {
        // delete the current tweet once its id retrieved
        await Tweet.findOneAndDelete({ _id: id }).exec()
        // find the current user who posted the tweet with an id and remove the id of the tweet from the tweets Array of User
        await User.findOneAndUpdate({ tweets: id }, { $pull: { tweets: id }})

        res.json({ success: 'Tweet deleted' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err })
    }
})

module.exports = app