const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('task_management', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
