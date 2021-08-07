const express = require('express');
const router = express.Router();
const Post = require('../models/schema/post.js').Post;

//Get a page of posts
router.get('/', async function(req, res) {
  try{
    let posts = await Post.find().sort({date: -1}).limit(50).exec();
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

//Create a post
router.post('/', async function(req, res) {
  try{
    let post = req.body;
    let persistedPost = await Post.create(post);
    res.status(201).json(persistedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Server Error"});
  }
});

module.exports = router;
