const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
module.exports = sequelize.define('Usuario', {
 nome: { type: DataTypes.STRING(100), allowNull: false },
 email: { type: DataTypes.STRING(150), allowNull: false, unique: true, validate: { isEmail: true } },
 senha: { type: DataTypes.STRING, allowNull: false }
});
