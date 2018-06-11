// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const events = sequelizeClient.define('Events', {
    eventId: {
      type: Sequelize.STRING(128),
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    eventTitle: {
      type: Sequelize.STRING(32),
      allowNull: false
    },
    eventDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    capacity: {
      type: Sequelize.Integer
    },
    eventDescription: {
      type: Sequelize.TEXT("medium")
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  events.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return events;
};
