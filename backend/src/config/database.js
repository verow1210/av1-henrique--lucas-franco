const { Sequelize } = require('sequelize');
const path = require('path');
const storage = process.env.DB_STORAGE || './database.sqlite';
module.exports = new Sequelize({ dialect: 'sqlite', storage: path.resolve(__dirname, '../../', storage), logging: false });
