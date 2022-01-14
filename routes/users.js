const express = require('express')
const User = require("../models/User")
const app = express()

// update user
app.put('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const user = await User.findOneAndUpdate(
            // find the user by specification id
            { _id: id },
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

module.exports = app