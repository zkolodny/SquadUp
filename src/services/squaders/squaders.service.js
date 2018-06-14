// Initializes the `squaders` service on path `/squaders`
const createService = require('feathers-sequelize');
const createModel = require('../../models/squaders.model');
const hooks = require('./squaders.hooks');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'squaders',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/squaders', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('squaders');

  service.hooks(hooks);
};
