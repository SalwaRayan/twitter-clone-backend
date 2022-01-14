const express = require('express')
const app = express()
const multer = require('multer')
const fs = require('fs')
const moment = require('moment')
moment().format()

const upload = multer({ dest: 'public' })

const User = require('../models/User')


// upload profile image
app.post('/profile/:id', upload.single('photo'), async (req, res) => {
  const { id } = req.params
  
  const date = moment().format('DD-MM-YYYY-hh-mm-ss')
  const fileName = `${date}-${req.file.originalname}`
  const photoUrl = `${req.file.destination}/${fileName}`

  fs.renameSync(req.file.path, photoUrl)
  
  const user = await User.findOneAndUpdate({ _id: `${id}` }, { profilePicture: `http://localhost:5000/${fileName}` })

  user.save(async (err, user) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }
    res.json(user)
  })
})

// upload banner image
app.post('/banner/:id', upload.single('photo'), async (req, res) => {
  const { id } = req.params

  const date = moment().format('DD-MM-YYYY-hh-mm-ss')
  const fileName = `${date}-${req.file.originalname}`
  const photoUrl = `${req.file.destination}/${fileName}`
  
  fs.renameSync(req.file.path, photoUrl)
  
  const user = await User.findOneAndUpdate({ _id: `${id}` }, { bannerPicture: `http://localhost:5000/${fileName}` })

  user.save(async (err, user) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }
    res.json(user)
  })
})

module.exports = app