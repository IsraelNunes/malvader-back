// tabelas/Transacao.js
const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const Conta = require('./Conta');

const Transacao = sequelize.define('Transacao', {
  id_transacao: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  id_conta_origem: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  id_conta_destino: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  tipo_transacao: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  valor: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
  },
  data_hora: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  descricao: {
    type: DataTypes.STRING(100),
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
  tableName: 'transacao',
  timestamps: false,
});

Transacao.belongsTo(Conta, { foreignKey: 'conta_id_conta' });

module.exports = Transacao;
