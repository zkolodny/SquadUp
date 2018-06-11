// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const events = sequelizeClient.define('Events', {
    eventId: {
      type: Sequelize.UUID,
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
      type: Sequelize.INTEGER
    },
    currentCapacity: {
      type: Sequelize.INTEGER,
      defaultValue: 1
    },
    eventDescription: {
      type: Sequelize.TEXT("medium")
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    },
    timestamps: false
  });

  events.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    models.Users.hasMany(models.Events, {
      foreignKey: "userId"
    });
  };

  return events;
};
