const express = require("express");
const User = require("../models/User");
const app = express();

app.post("/:idMyUser/:idOtherUser", async (req, res) => {
  const { idMyUser, idOtherUser } = req.params;

  if (idMyUser === idOtherUser) {
    res.status(400).json({ error: "You cannot follow youself" });
    return;
  }

  try {
    const followingExist = await User.findById(idMyUser)
      .find({ following: idOtherUser })
      .exec();

    // const addFollowing = User.findByIdAndUpdate(idMyUser, {$push: {following:})

    const user = await User.findById(idMyUser).exec();
    const otherUser = await User.findById(idOtherUser).exec();

    if (followingExist.length === 0) {
      user.following = [...user.following, idOtherUser];
      otherUser.followers = [...otherUser.followers, idMyUser];

      user.save((err) => {
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

      res.json(user);
    } else {
      const user = await User.findOneAndUpdate({ _id: idMyUser }, { $pull : { following: idOtherUser }}, { new: true }).exec()
      const otherUser = await User.findOneAndUpdate({ _id: idOtherUser }, { $pull : { followers: idMyUser }}, { new: true }).exec()
      
      res.json(user);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

module.exports = app;
