const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Conta = sequelize.define('Conta', {
  id_conta: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  numero_conta: {
    type: DataTypes.STRING(20),
    unique: true,
    allowNull: false,
  },
  saldo: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    defaultValue: 0,
  },
  tipo_conta: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  data_abertura: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.STRING(45),
    allowNull: false,
    defaultValue: 'ATIVA',
  },
  Usuario_idUsuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'conta',
  timestamps: false,
});

module.exports = Conta;
