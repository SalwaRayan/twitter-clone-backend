const express = require('express')
const app = express()

const User = require("../models/User")
const Tweet = require("../models/Tweet")
const Comment = require("../models/Comment")

// post a comment
//   idUser is the id of the user who comments
//   idTweet is the id of the tweet the user want to comment
app.post("/:idUser/:idTweet", async (req, res) => {
    const { idUser, idTweet } = req.params

    try {
        const tweet = await Tweet.findOne({ _id: idTweet }).exec()

        const comment = await new Comment({
            ...req.body,
        })

        comment.save(async (err, comment) => {
            if (err) {
                res.status(500).json({ error: err })
                return;
            }

            // add to the object comment its user => the key user of comment is the id of the user who comments
            comment.user = idUser;
            // add to the object comment its tweet => the key tweet of comment is the id of the tweet the user is commenting
            comment.tweet = tweet._id;

            const user = await User.findOne({ _id: idUser })
            user.comments = [...user.comments, comment._id]

            user.save()

            tweet.comments = [...tweet.comments, comment._id]

            tweet.save()

            res.json(comment)
        })
    } catch (err) {
        res.status(500).json({ error: err })
    }
})


// delete a comment
app.delete('/:idComment', async (req, res) => {
   
    // dynamic id : idComment
    const { idComment } = req.params

    try {
        // filter and delete comment at the same time
        await Comment.findOneAndDelete({ _id: idComment }).exec()
        
        // update Schema/Model because each one of them had a link with the comment 
        await Tweet.findOneAndUpdate({ comments: idComment }, { $pull: { comments: idComment } }).exec()
        await User.findOneAndUpdate({ comments: idComment }, { $pull: { comments: idComment } }).exec()

        res.json({ success: 'Comment have been deleted' })

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err })
    }
})

// show a comment 
app.get('/:idComment', async (req, res) => {
    const { idComment } = req.params

    const comment = await Comment.findOne({ _id: idComment })

    res.json(comment)
})

module.exports = app