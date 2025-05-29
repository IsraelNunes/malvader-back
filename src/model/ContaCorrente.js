// tabelas/ContaCorrente.js
const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const Conta = require('./Conta');

const ContaCorrente = sequelize.define('ContaCorrente', {
  id_conta_corrente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  limite: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    defaultValue: 0,
  },
  data_vencimento: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  taxa_manutencao: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
    defaultValue: 0,
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
  tableName: 'conta_corrente',
  timestamps: false,
});

ContaCorrente.belongsTo(Conta, { foreignKey: 'conta_id_conta' });

module.exports = ContaCorrente;
