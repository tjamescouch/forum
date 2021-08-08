const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require('../models/schema/user').User;
const keys = require('../config/keys');

//User input validators
const validateLoginData = require("../validation/login");


//Authenticates user
router.post("/", async function(req, res) {
  try {
    // Form validation
    const { errors, isValid } = validateLoginData(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    let user = await User.findOne({ email }).exec();

    // Ensure user exists
    if (!user) {
      return res.status(404).json({ email: "Email not found" });
    }

    // Check password
    let isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      // User matched
      // Create JWT Payload
      const payload = {
        id: user.id,
        name: user.name
      };
      // Sign token
      jwt.sign(
        payload,
        keys.secretOrKey,
        {
          expiresIn: 31556926 // 1 year in seconds
        },
        (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        }
      );
    } else {
      return res
      .status(400)
      .json({ password: "Password incorrect" });
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});


module.exports = router;
