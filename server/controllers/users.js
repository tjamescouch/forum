const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require('../models/schema/user').User;

//User input validators
const validateRegistrationData = require("../validation/register");


//Creates a new user
router.post("/", async function(req, res) {
  try {
    // Form validation
    const { errors, isValid } = validateRegistrationData(req.body);
    console.log('post users errors=', errors);
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    //Look for existing user with same email
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      // Hash password before saving in database
      //A Random 'salt' is included before hashing to prevent rainbow table attacks
      let salt = await bcrypt.genSalt(10);
      //The generated hash also includes the salt so that it can be reproduced at login
      let hash = await bcrypt.hash(newUser.password, salt);
      newUser.password = hash;
      let user = await User.create(newUser);
      return res.status(201).json(user);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});

module.exports = router;
