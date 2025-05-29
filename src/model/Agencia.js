// tabelas/Agencia.js
const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const Endereco = require('./Endereco');
const Conta = require('./Conta');

const Agencia = sequelize.define('Agencia', {
  id_agencia: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nome: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  codigo_agencia: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,
  },
  endereco_id_endereco: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Endereco,
      key: 'id_endereco',
    },
  },
  conta_id_conta: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Conta,
      key: 'id_conta',
    },
  },
}, {
  tableName: 'agencia',
  timestamps: false,
});

Agencia.belongsTo(Endereco, { foreignKey: 'endereco_id_endereco' });
Agencia.belongsTo(Conta, { foreignKey: 'conta_id_conta' });

module.exports = Agencia;
