const express = require('express');
const router = express.Router();

const users = require('./users');
const sessions = require('./sessions');
const posts = require('./posts');
const comments = require('./comments');

//Attach controllers to routes
router.use('/users', users);
router.use('/sessions', sessions);
router.use('/posts', posts);
router.use('/comments', comments);



module.exports = router;
