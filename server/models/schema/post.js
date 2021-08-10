const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title:  String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  body:   String,
  date: {
    type: Date,
    default: Date.now
  },
});


const Post = mongoose.model('Post', postSchema);

module.exports = {schema:postSchema, Post: Post};
