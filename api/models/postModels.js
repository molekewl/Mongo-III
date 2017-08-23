const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  text: {
    type: String,
  },
  author: {
    type: String,
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

const CommentSchema = new mongoose.Schema({
  _parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  },
  text: {
    type: String,
    // required: true
  },
  author: {
    type: String
  }
});

module.exports = mongoose.model('Post', PostSchema);
module.exports = mongoose.model('Author', PostSchema);
module.exports = mongoose.model('Comment', CommentSchema);