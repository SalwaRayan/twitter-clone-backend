const express = require("express");
const app = express();
const passport = require("../config/passport");

// const User = require("../models/User")

app.post("/login", passport.authenticate("local"), (req, res) => {
  console.log(req.user);
});

// app.post('/login', async (req, res) => {
// // app.post('/login', async (req, res) => {
//   const user = {
//     email: req.email,
//     password: req.password
//   }
//     if (user) {
//       req.logIn(user, err => {
//         if (err) throw res.status(500).json({ error: err })
//         return res.json(user)
//       })
//     }
// })

module.exports = app;
