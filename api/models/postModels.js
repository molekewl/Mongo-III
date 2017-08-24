const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
   text: String,
   author: {
     type: Schema.Types.ObjectId,
     ref: 'User',
   },
});

const PostSchema = new Schema({
  title: {
    type: String, 
    required: true
  }, 
  content: { 
    type: String, required: true
  },

  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  comments: [CommentSchema],
});

// const PostSchema = new mongoose.Schema({
//   title: {
//     type: String,
//   },
//   content: {
//     type: String,
//   },

//   author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
//   comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
// });

// const CommentSchema = new mongoose.Schema({
  // _parent: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Comment'
  // },
  // text: {
  //   type: String,
  //   // required: true
  // },
  // author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author'}
// });

module.exports = mongoose.model('Post', PostSchema);
module.exports = mongoose.model('Author', PostSchema);
module.exports = mongoose.model('Comment', CommentSchema);