// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const uuid4 = require('uuid/v4');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const users = sequelizeClient.define('Users', {
    userId: {
      type: Sequelize.UUID,
      allowNull: false,
      unique: true,
      primaryKey: true,
      defaultValue: uuid4()
    },
    username: {
      type: Sequelize.STRING(64),
      allowNull: false,
      unique: true
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    },
    timestamps: false
  });

  users.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return users;
};
