const express = require("express")
const app = express()
const port = 5000
const cors = require("cors")
const session = require("express-session")
const passport = require("passport")
const mongoose = require("mongoose")

const authRoutes = require('./routes/auth')

const dbName = 'test'
const dbUrl = `mongodb+srv://salwarayan:twitterclone@cluster0.66nkv.mongodb.net/${dbName}`

mongoose.connect(dbUrl)
const db = mongoose.connection

db.on('error', (err) => {
  console.log(err)
})

db.once('open', () => {
  console.log(`Connection to ${dbName} established`)
})

app.use(express.json())
app.use(express.static('public'))


app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: false
}))

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))

app.use(passport.initialize())
app.use(passport.session())


// routes
app.use('/', authRoutes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})