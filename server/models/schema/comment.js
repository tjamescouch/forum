const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  post: { type: Schema.Types.ObjectId, ref: 'Post' },
  text:   String,
  date: {
    type: Date,
    default: Date.now
  },
});


const Comment = mongoose.model('Comment', commentSchema);

module.exports = {schema:commentSchema, Comment: Comment};
