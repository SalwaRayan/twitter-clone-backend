const express = require("express");
const app = express();

const User = require("../models/User");
const Tweet = require("../models/Tweet");
const Comment = require("../models/Comment");

// post a new tweet
app.post("/:id/tweet", async (req, res) => {
    const { id } = req.params;
    // current tweet user
    const { user } = req.body;

    try {
        // creation of the new tweet (instanciation)
        const tweet = await new Tweet({
            ...req.body,
        });

        // register the new tweet made by user
        tweet.save(async (err, tweet) => {
            if (tweet) {
                // each tweet is created so linked by a unique user
                // so it is necessary to create a relation between the new tweet created
                // by user that already exists
                const getCurrentUser = await User.findOne({ _id: id }).exec();

                // tweet.user = id;

                // console.log(getCurrentUser)
                getCurrentUser.tweets.push(tweet._id);
                getCurrentUser.save();

                res.json(tweet);
                return;
            }
            console.log("tweet", tweet);
            console.log(err);
            res.status(500).json({ error: err });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
});

// retweet
app.post("/:idUser/:idTweet/retweet", async (req, res) => {
    const { idUser, idTweet } = req.params;
    try {
        const retweetExist = await User.findOne({ retweets: idTweet }).exec();

        if (!retweetExist) {
            const tweet = await Tweet.findOne({ _id: idTweet }).exec();
            const user = await User.findOne({ _id: idUser }).exec()

            user.retweets = [...user.retweets, idTweet];
            tweet.retweets = [...tweet.retweets, idUser];

            tweet.save(async (err) => {
                if (err) {
                    res.status(500).json({ error: err })
                    return;
                }
            });

            user.save(async (err) => {
                if (err) {
                    res.status(500).json({ error: err });
                    return;
                }
            });

            res.json([
                user,
                tweet
            ]);
        } else {

            await User.findOneAndUpdate({ retweets: idTweet }, { $pull: { retweets: idTweet } })
            await Tweet.findOneAndUpdate({ retweets: idUser }, { $pull: { retweets: idUser } })

            res.json({ retweet: "removed" })


        }

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
        await User.findOneAndUpdate({ tweets: id }, { $pull: { tweets: id } })

        res.json({ success: 'Tweet deleted' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err })
    }
})

module.exports = app
