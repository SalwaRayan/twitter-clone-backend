const express = require("express")
const app = express()

const User = require("../models/User")
const Tweet = require("../models/Twitter")
const Comment = require("../models/Comment")

// post a comment
app.post('/:idUser/:idTweet/comment', async (req, res) => {
  const { idUser, idTweet } = req.params
  
  try {
    const comment = await new Comment({
      ...req.body
    })

    comment.save(async (err, comment) => {
      if (err) {
        res.status(500).json({ error: err });
        return;
      }
      res.json(comment);
    });

    const user = await User.findOne({ _id: idUser })
    user.comments = [ ...user.comments, comment._id ]

    user.save()

    const tweet = await Tweet.findOne({ _id: idTweet })
    tweet.comments = [ ...tweet.comments, comment._id ]

    tweet.save()
  } catch (err) {
    res.status(500).json({ error: err });
  }
})

module.exports = app