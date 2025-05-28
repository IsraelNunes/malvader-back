const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,      // database
  process.env.DB_USER,      // usuário
  process.env.DB_PASSWORD,  // senha
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: false // pode colocar true para ver os logs SQL
  }
);

module.exports = sequelize;
