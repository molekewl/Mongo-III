const mongoose = require('mongoose');

const User = mongoose.model('User');

const STATUS_USER_ERROR = 422;

// Dont have an account. login for new user
const createAccount = (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  user.save()
    .then((newUser) => {
      res.json(newUser);
    })
    .catch((err) => {
      res.status(STATUS_USER_ERROR);
      res.json({ stack: err.stack, message: err.message });
    });
    // this is the old way below. Promises Version above
  // if (!username || !password) {
  //   res.status(STATUS_USER_ERROR);
  //   res.json({ error: 'Must provide username & password'});
  //   return;
  // }
  // // create new user and save document
  // const user = new User({ username, password });
  // user.save((err) => {
  //   if (err) throw err;
  //   res.json(user);
  // });
};

// Post: instead of save, find user in the db and return to client
const returnUser = (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username, password })
    .then((returnUser) => {
      res.json(returnUser);
    })
    .catch((err) => {
      res.status(STATUS_USER_ERROR);
      res.json({ stack: err.stack, message: err.message });
    });
};

module.exports = {
  createAccount,
  returnUser
};