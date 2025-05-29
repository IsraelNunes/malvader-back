// tabelas/ContaInvestimento.js
const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const Conta = require('./Conta');

const ContaInvestimento = sequelize.define('ContaInvestimento', {
  id_conta_investimento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  perfil_risco: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  valor_minimo: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
  },
  taxa_rendimento_base: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
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
  tableName: 'conta_investimento',
  timestamps: true,
});

ContaInvestimento.belongsTo(Conta, { foreignKey: 'conta_id_conta' });

module.exports = ContaInvestimento;
