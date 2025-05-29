// tabelas/Auditoria.js
const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const Usuario = require('./Usuario');

const Auditoria = sequelize.define('Auditoria', {
  id_auditoria: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  acao: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  data_hora: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  detalhes: {
    type: DataTypes.TEXT,
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
  tableName: 'auditoria',
  timestamps: false,
});

Auditoria.belongsTo(Usuario, { foreignKey: 'Usuario_idUsuario' });

module.exports = Auditoria;
