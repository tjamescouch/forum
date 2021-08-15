const express = require('express');
const passport = require("passport");
const router = express.Router({mergeParams: true});
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const Comment = require('../models/schema/comment').Comment;

//Get comments for a post
router.get('/', async function(req, res) {
  try{
    let comments = await Comment.find({post:new ObjectId(req.params.postId)}).sort({date: 1}).limit(50).populate('author', '-password -email').exec();
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Server Error"});
  }
});



//Create a comment - requires authentication
router.post('/', passport.authenticate('jwt', { session: false }), async function(req, res) {
  try{
    let user = req.user;
    let bodyJson = req.body;
    let comment = {
      text: bodyJson.text,
      author: user.id,
      post: bodyJson.postId,
    }
    let persistedComment = await Comment.create(comment);
    res.status(201).json(persistedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Server Error"});
  }
});

module.exports = router;
