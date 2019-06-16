const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

// Load User model
const User = require("../../models/user");

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users route works" }));

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email })
    .then(user => {
      if (user) {
        res.send("User already exists");
      } else {
        const newUser = new User({ name, email, password });
        bcrypt.genSalt(10, (error, salt) => {
          bcrypt.hash(newUser.password, salt, (error, hash) => {
            if (error) throw error;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                res.send(user);
              })
              .catch(err => console.log(err));
          });
        });
      }
    })
    .catch(err => console.log(err));
});

module.exports = router;
