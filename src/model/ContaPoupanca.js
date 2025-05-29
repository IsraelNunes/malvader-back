// tabelas/ContaPoupanca.js
const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const Conta = require('./Conta');

const ContaPoupanca = sequelize.define('ContaPoupanca', {
  id_conta_poupanca: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  taxa_rendimento: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
  },
  ultimo_rendimento: {
    type: DataTypes.DATE,
    allowNull: true,
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
  tableName: 'conta_poupanca',
  timestamps: false,
});

ContaPoupanca.belongsTo(Conta, { foreignKey: 'conta_id_conta' });

module.exports = ContaPoupanca;


