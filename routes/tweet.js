const express = require('express')
const Tweet = require("../models/Tweet")
const User = require("../models/User")
const app = express()


// post a new tweet
app.post('/:id/tweet', async (req, res) => {
    const { id } = req.params
    // current tweet user
    const { user } = req.body

    try {
        // creation of the new tweet (instanciation)
        const tweet = await new Tweet({ ...req.body })

        // register the new tweet made by user
        tweet.save(async (err, tweet) => {
            if (tweet) {
                // each tweet is created so linked by a unique user
                // so it is necessary to create a relation between the new tweet created
                // by user that already exists
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

app.delete('/:id/tweet', (req, res) => {
    // console.log();
})

module.exports = app