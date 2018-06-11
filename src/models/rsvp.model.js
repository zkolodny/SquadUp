// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const rsvp = sequelizeClient.define('RSVPs', {

  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    },
    timestamps: false
  });

  rsvp.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    models.Users.belongsToMany(models.Events, {
      as: "Attendee",
      through: "RSVPs",
      foreignKey: "userId",
      primaryKey: true
    });

    models.Events.belongsToMany(models.Users, {
      as: "Attending",
      through: "RSVPs",
      foreignKey: "eventId",
      primaryKey: true
    });
  };

  return rsvp;
};
