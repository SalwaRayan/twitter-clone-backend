const express = require('express')
const app = express()

// User instance for create a user profile
const User = require('../models/User')

// signup route
app.post('/signup', async (req, res) => {


    try {
        // const { email, username } = req.body
        let user = await User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] }).exec()
        console.log(user)

        if (!user) {
            user = await new User({
                ...req.body
            })
            user.save(async (err, user) => {
                if (err) {
                    res.status(500).json({ error: err })
                    return
                }
                res.json(user)
            })
        } else {
            res.status(409).json({ error: 'User already exist' })
        }
    } catch (err) {
        res.status(500).json({ error: err })
    }


})

module.exports = app