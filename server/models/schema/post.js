const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title:  String, // String is shorthand for {type: String}
  author: Schema.Types.ObjectId,
  body:   String,
  //comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
});


const Post = mongoose.model('Post', postSchema);

module.exports = {schema:postSchema, Post: Post};
