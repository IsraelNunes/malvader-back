// tabelas/Endereco.js
const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const Usuario = require('./Usuario');

const Endereco = sequelize.define('Endereco', {
  id_endereco: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  cep: {
    type: DataTypes.STRING(8),
    allowNull: false,
  },
  local: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  numero_casa: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bairro: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  cidade: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  estado: {
    type: DataTypes.CHAR(2),
    allowNull: false,
  },
  complemento: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  Usuario_idUsuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: 'idUsuario',
    },
  },
}, {
  tableName: 'endereco',
  timestamps: false,
});

Endereco.belongsTo(Usuario, { foreignKey: 'Usuario_idUsuario' });

module.exports = Endereco;
