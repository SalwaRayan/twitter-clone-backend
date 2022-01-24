const express = require("express");
const app = express();
const User = require("../models/User");



// update user
app.put("/:idUser", async (req, res) => {
  const { idUser } = req.params;

  try {
    const user = await User.findOneAndUpdate(
      // find the user by specification id
      { _id: idUser },
      // update data
      {
        $set: { ...req.body },
      },
      // return the actual updated user
      { new: true }
    ).exec();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// show all users
app.get("/", async (req, res) => {
  const users = await User.find().exec();

  res.json(users);
});

// show a user
app.get('/:username', async(req, res) => {
    const { username } = req.params

    const user = await User.findOne({ username: username })
        .populate('tweets')
        .populate('comments')
        .populate('retweets')
        .exec()

  res.json(user);
});

// get two random user
app.get("/get/following", async (req, res) => {
    try {
        // le tableau est le tableau de l'user connecter déjà suivi
        // la requete va retourne la liste d'user qui n'a pas suivi
        const usersFollowing = await User.find({ _id: { $nin: [...req.user.following, req.user._id]}}).limit(2).exec()
        
        res.json(usersFollowing)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err })
    }
});

module.exports = app;
