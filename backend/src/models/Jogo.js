const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
module.exports = sequelize.define('Jogo', {
 nome: { type: DataTypes.STRING(120), allowNull: false },
 genero: { type: DataTypes.STRING(80), allowNull: false },
 plataforma: { type: DataTypes.STRING(80), allowNull: false },
 ano: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1950, max: 2100 } },
 descricao: { type: DataTypes.TEXT, allowNull: true }
});
