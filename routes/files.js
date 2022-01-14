const express = require('express')
const app = express()
const multer = require('multer')
const fs = require('fs')

const upload = multer({ dest: 'public' })

const User = require('../models/User')

app.post('/profile/:id', upload.single('photo'), async (req, res) => {
  const { id } = req.params
  console.log(req.file)
  const photoUrl = `${req.file.destination}/${req.file.originalname}`
  fs.renameSync(req.file.path, photoUrl)
  
  const user = await User.findOneAndUpdate({ _id: `${id}` }, { profilePicture: `http://localhost:5000/${req.file.originalname}` })

  user.save(async (err, user) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }
    res.json(user)
  })
})

app.post('/banner/:id', upload.single('photo'), async (req, res) => {
  const { id } = req.params
  console.log(req.file)
  const photoUrl = `${req.file.destination}/${req.file.originalname}`
  fs.renameSync(req.file.path, photoUrl)
  
  const user = await User.findOneAndUpdate({ _id: `${id}` }, { bannerPicture: `http://localhost:5000/${req.file.originalname}` })

  user.save(async (err, user) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }
    res.json(user)
  })
})

module.exports = app