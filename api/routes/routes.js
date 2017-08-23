module.exports = (app) => {
  //add your new routes here
  const controllerMethods = require('../controllers/postControllers');
  const login = require('../controllers/userControllers');

  app.route('/new-user')
    .post(login.createAccount);

  app.route('/login')
    .post(login.returnUser);

  app.route('/new-post')
    .post(controllerMethods.newPost);

  app.route('/posts')
    .get(controllerMethods.listPosts);

  app.route('/posts/:id')
    .get(controllerMethods.singlePost)
    // .put(controllerMethods.deletePost)
    .put(controllerMethods.addComment);

};
