const { DataTypes, Model } = require('sequelize');
const sequelize = require('../util/database');

class Usuario extends Model{}

Usuario.init({
  idUsuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  CPF: {
    type: DataTypes.STRING(11),
    allowNull: false,
    unique: true,
    validate: {
      isNumeric: true,
      len: [11, 11],
    },
  },
  data_nascimento: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  tipo_usuario: {
    type: DataTypes.ENUM('FUNCIONARIO', 'CLIENTE'), // Exemplo de tipos possíveis
    allowNull: false,
  },
  senha_hash: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  otp_ativo: {
    type: DataTypes.STRING(6),
    allowNull: true,
  },
  otp_expiracao: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  sequelize,
  modelName : 'Usuarios' ,
  tableName: 'Usuario',
  timestamps: false,

})

module.exports = Usuario;