const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Permissao = sequelize.define('Permissao', {
  id_role: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING(45),
    allowNull: false,
    unique: true,
  },
  descricao: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
}, {
  tableName: 'permissao',
  timestamps: false,
});

module.exports = Permissao;