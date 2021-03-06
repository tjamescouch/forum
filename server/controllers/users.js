const express = require('express');
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer  = require('multer');
const path = require('path');

const keys = require('../config/keys');
const User = require('../models/schema/user').User;

//User input validators
const validateRegistrationData = require("../validation/register");
const validateLoginData = require("../validation/login");



const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
});

const upload = multer({ storage: storage });

//Authenticates user
router.post("/login", async function(req, res) {
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


//Get your user object
router.get('/me', passport.authenticate('jwt', { session: false }), async function(req, res) {
  try{
    let user = req.user;
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Server Error"});
  }
});

//Get your user object
router.post('/me/avatar', passport.authenticate('jwt', { session: false }), upload.single('file'), async function(req, res) {
  try{
    let user = req.user;
    user.avatar = req.file.filename;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Server Error"});
  }
});

module.exports = router;
