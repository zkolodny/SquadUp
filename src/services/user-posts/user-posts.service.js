// Initializes the `UserPosts` service on path `/userposts`
const createService = require('feathers-sequelize');
const createModel = require('../../models/user-posts.model');
const hooks = require('./user-posts.hooks');
const filters = require('./user-posts.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'user-posts',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/userposts', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('userposts');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
