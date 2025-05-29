// tabelas/Relatorio.js
const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const Funcionario = require('./Funcionario');

const Relatorio = sequelize.define('Relatorio', {
  id_relatorio: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  tipo_relatorio: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  data_geracao: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  conteudo: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  funcionario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Funcionario,
      key: 'id_funcionario',
    },
  },
}, {
  tableName: 'relatorio',
  timestamps: false,
});

Relatorio.belongsTo(Funcionario, { foreignKey: 'funcionario_id' });

module.exports = Relatorio;
