const users = require('./users/users.service.js');
const userPosts = require('./user-posts/user-posts.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(users);
  app.configure(userPosts);
};
