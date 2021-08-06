const express = require('express');
const router = express.Router();

const users = require('./users');
const posts = require('./posts');
const comments = require('./comments');

//Attach controllers to routes
router.use('/users', users);
router.use('/posts', posts);
router.use('/comments', comments);

/* GET home page. */
router.get('/', function(req, res) {
  res.send('homepage');
});

module.exports = router;
