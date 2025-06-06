// Classe Funcionario com atributos como id, nome, cargo, cpf, senha.
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../util/database');
const Usuario = require('./Usuario');

class Funcionario extends Model {}

Funcionario.init({
id_funcionario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  codigo_funcionario: {
  type: DataTypes.STRING(20),
  allowNull: false
},
    cargo: {
    type: DataTypes.ENUM('Supervisor', 'Funcionário simples'),
    allowNull: false,
    },
    id_supervisor: {
  type: DataTypes.INTEGER,
  allowNull: true
},
   id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
      model: 'Usuario',
      key: 'idUsuario'
      }
    }
    }, { 
    sequelize,
    modelName: 'Funcionario',
    tableName: 'funcionario',
    timestamps: false
});


Funcionario.belongsTo(Usuario, {
  foreignKey: 'id_usuario',
  as: 'usuario'
});

Usuario.hasOne(Funcionario, {
  foreignKey: 'id_usuario',
  as: 'funcionario'
});

module.exports = Funcionario;
