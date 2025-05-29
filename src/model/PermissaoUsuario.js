const Usuario = require('./Usuario');   // já é o model Sequelize
const Permissao = require('./Permissao'); // já é o model Sequelize
const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const PermissaoUsuario = sequelize.define('PermissaoUsuario', {
  id_permissao_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Usuario_idUsuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: 'idUsuario',
    },
  },
  permissao_id_role: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Permissao,
      key: 'id_role',
    },
  },
}, {
  tableName: 'permissao_usuario',
  timestamps: false,
});

// Associações
PermissaoUsuario.belongsTo(Usuario, { foreignKey: 'Usuario_idUsuario', as: 'usuario' });
PermissaoUsuario.belongsTo(Permissao, { foreignKey: 'permissao_id_role', as: 'permissao' });

Usuario.hasMany(PermissaoUsuario, { foreignKey: 'Usuario_idUsuario', as: 'permissoesUsuarios' });
Permissao.hasMany(PermissaoUsuario, { foreignKey: 'permissao_id_role', as: 'permissoesUsuarios' });

module.exports = PermissaoUsuario;
