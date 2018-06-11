// Initializes the `RSVP` service on path `/rsvp`
const createService = require('feathers-sequelize');
const createModel = require('../../models/rsvp.model');
const hooks = require('./rsvp.hooks');
const filters = require('./rsvp.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'rsvp',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/rsvp', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('rsvp');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
