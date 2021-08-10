const express = require('express');
const passport = require("passport");
const router = express.Router();

const Post = require('../models/schema/post').Post;

//Get a page of posts
router.get('/', async function(req, res) {
  try{
    let posts = await Post.find().sort({date: -1}).limit(50).populate('author', '-password -email').exec();
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Server Error"});
  }
});

//Get one post
router.get('/:id', async function(req, res) {
  try {
    let post = await Post.findOne({_id:req.params.id}).exec();
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Server Error"});
  }
});

//Create a post - requires authentication
router.post('/', passport.authenticate('jwt', { session: false }), async function(req, res) {
  try{
    let user = req.user;
    let bodyJson = req.body;
    let post = {
      title: bodyJson.title,
      body: bodyJson.body,
      author: user.id,
    }
    let persistedPost = await Post.create(post);
    res.status(201).json(persistedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Server Error"});
  }
});

module.exports = router;
