const express = require('express')
const app = express()
const User = require("../models/User")

// update user
app.put('/:idUser', async (req, res) => {
    const { idUser } = req.params

    try {
        const user = await User.findOneAndUpdate(
            // find the user by specification id
            { _id: idUser },
            // update data
            {
                $set: { ...req.body }
            },
            // return the actual updated user
            { new: true }
        ).exec()
        res.json(user)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

// show all users
app.get('/', async (req, res) => {
    const users = await User.find().exec()

    res.json(users)
})

// show a user
app.get('/:username', async(req, res) => {
    const { username } = req.params

    const user = await User.findOne({ username: username })
        .populate('tweets')
        .populate('comments')
        .populate('retweets')
        .exec()

    res.json(user)
})



module.exports = app