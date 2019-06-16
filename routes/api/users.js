const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

// Load Input Validation
const validateRegisterInput = require("../../validation/register");

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
  const { name, email, password, password2 } = req.body;
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.email = "User already exists";
        return res.status(400).json(errors);
      } else {
        const newUser = new User({ name, email, password });
        bcrypt.genSalt(10, (error, salt) => {
          bcrypt.hash(newUser.password, salt, (error, hash) => {
            if (error) throw error;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    })
    .catch(err => console.log(err));
});

module.exports = router;
