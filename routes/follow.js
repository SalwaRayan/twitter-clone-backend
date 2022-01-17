const express = require("express");
const User = require("../models/User");
const app = express();

app.post("/:idMyUser/:idOtherUser/follow", async (req, res) => {
  const { idMyUser, idOtherUser } = req.params;

  try {
    const followingExist = await User.findOne({ following: idOtherUser }).exec();

    if (!followingExist) {
      const myUser = await User.findOne({ _id: idMyUser }).exec();
      const otherUser = await User.findOne({ _id: idOtherUser }).exec();

      myUser.following = [...myUser.following, idOtherUser];
      otherUser.followers = [...otherUser.followers, idMyUser];

      myUser.save((err) => {
        if (err) {
          res.status(500).json({ error: err });
          return;
        }
      });

      otherUser.save((err) => {
        if (err) {
          res.status(500).json({ error: err });
          return;
        }
      });
      res.json(otherUser)
    } else {
      await User.findOneAndUpdate({ _id: idMyUser }, {$pull: { following: idOtherUser }})
      await User.findOneAndUpdate({ _id: idOtherUser }, {$pull: { followers: idMyUser }})

      res.json({ success: "unfollow done" })
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err })
  }
})

module.exports = app;
