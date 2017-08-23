const mongoose = require('mongoose');

const Post = mongoose.model('Post');
const Author = mongoose.model('Author');
const Comment = mongoose.model('Comment');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;

// Post: '/new-post takes in a new blog post object & saves it to the db
// You'll need set up an array of comments that can be `referenced` users by `ObjectId`.
// It will also need a `reference` to the author (user) of the post. 
const newPost = (req, res) => {
  const { title, content } = req.body;
  const post = new Post({ title, content });
  post.save()
    .then((newPost) => {
      res.json(newPost);
    })
    .catch((err) => {
      res.status(STATUS_USER_ERROR);
      res.json({ stack: err.stack, message: err.message });
    });
};

// get: '/posts * This will return all the posts stored in the database
// return a list of posts. Only the title & id is necessary
const listPosts = (req, res) => {
  Post.find({})
    .populate()
    .exec()
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      res.status(STATUS_USER_ERROR);
      res.json({ stack: err.stack, message: err.message });
    });
};

// get: '/posts/:id'
// This get Post by Id end point should return an object of a single 
// post's data:
const singlePost = (req, res) => {
  const { id } = req.params;
  Post.findById(id)
    .populate()
    .exec()
    .then((post) => {
      res.json(post);
    })
    .catch((err) => {
      res.status(STATUS_SERVER_ERROR);
      res.json({ stack: err.stack, message: err.message });
    });
};

const addComment = (req, res) => {
  const { id } = req.params;
  const { text, author } = req.query;

  const newComment = new Comment({ _parent: id, text, author });
  newComment.save()
    .then((comment) => {
      Post.findById(id)
        // .populate('text', 'author')
        .exec()
        .then((post) => {
          post.comments.push(comment);
          post.save();
          // res.send({ success: true })
          res.json(comment);
        })
        .catch((err) => {
        res.status(STATUS_USER_ERROR);
        res.json({ stack: err.stack, message: err.messge });
      });
    })
    .catch((err) => {
      res.status(STATUS_USER_ERROR);
      res.json({ stack: err.stack, message: err.messge });
    });
};

// const deletePost = (req, res) => {
//   const { id } = req.params;
//   const post = Post.findByIdAndRemove(id)
//     .exec()
//     .then((post) => {
//       res.json(post);
//     })
//     .catch((err) => {
//       res.status(STATUS_USER_ERROR);
//       res.json({ stack: err.stack, message: err.message });
//     });
// };

module.exports = {
  newPost,
  listPosts,
  singlePost,
  addComment,
  // deletePost
};