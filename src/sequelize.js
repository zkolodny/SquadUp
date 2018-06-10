require('dotenv').config()
const Sequelize = require('sequelize');

module.exports = function () {
  const app = this;
  // const connectionString = `mysql://${process.env.MSNAME}:${process.env.MSPASS}@
  // ${process.env.MSPATH}:${process.env.MSPORT}/squadup`;
  //
  // const sequelize = new Sequelize(connectionString, {
  //   host: process.env.MSPATH,
  //   dialect: 'mysql',
  //   logging: console.log,
  //   maxConcurrentQueries: 100,
  //   dialectOptions: {
  //     ssl: 'Amazon RDS'
  //   },
  //   pool: { maxConnections: 5, maxIdleTime: 30},
  //   language: 'en'
  // });

  const sequelize = new Sequelize(process.env.MSDB, process.env.MSNAME, process.env.MSPASS, {
    host: process.env.MSPATH,
    port: process.env.MSPORT,
    dialect: 'mysql',
    logging: console.log,
    maxConcurrentQueries: 100,
    dialectOptions: {
      ssl: 'Amazon RDS'
    },
    pool: { maxConnections: 5, maxIdleTime: 30},
    language: 'en'
  });
  const oldSetup = app.setup;

  app.set('sequelizeClient', sequelize);

  app.setup = function (...args) {
    const result = oldSetup.apply(this, args);

    // Set up data relationships
    const models = sequelize.models;
    Object.keys(models).forEach(name => {
      if ('associate' in models[name]) {
        models[name].associate(models);
      }
    });

    // Sync to the database
    sequelize.sync();

    return result;
  };
};
