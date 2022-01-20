const express = require("express");
const { body } = require("express-validator");
const app = express();
const passport = require("../config/passport");

// User instance for create a user profile
const User = require("../models/User");

// login route
app.post("/login", 
  body("email").isEmail().withMessage("email is not valid"),
  body("password").isStrongPassword().withMessage("password is not valid"),
  passport.authenticate("local"), 
  async (req, res) => {
    console.log(req.user);
    if (req.user) {
      req.logIn(req.user, (err) => {
        if (err) throw res.status(500).json({ error: err });
        return res.json(req.user);
      });
    }
  }
);

// logout route
app.delete("/logout", (req, res) => {
  req.logout();
  res.status(200).send("ok");
});

// signup route
app.post(
  "/signup",
  body("username").exists(),
  body("email").exists().isEmail().withMessage("mail is not valid"),
  body("password").exists().isStrongPassword().withMessage("password is not valid"),
  // body("birthDate").exists().isDate().withMessage("birthdate is not valid"),
  async (req, res) => {
    try {
      // const { email, username } = req.body
      let user = await User.findOne({
        $or: [{ username: req.body.username }, { email: req.body.email }],
      }).exec();
      console.log(user);

      if (!user) {
        user = await new User({
          ...req.body,
        });
        user.save(async (err, user) => {
          if (err) {
            res.status(500).json({ error: err });
            return;
          }
          res.json(user);
        });
      } else {
        res.status(409).json({ error: "User already exist" });
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
);

module.exports = app;
