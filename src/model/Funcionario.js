// Classe Funcionario com atributos como id, nome, cargo, cpf, senha.
const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const Usuario = require('./Usuario');

const Funcionario = sequelize.define('Funcionario', {
  idFuncionario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  idUsuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: 'idUsuario',
    },
    unique: true,
  },
  cargo: {
  type: DataTypes.ENUM('Supervisor', 'Funcionário simples'),
  allowNull: false,
  },
  salario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  data_admissao: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
}, {
  tableName: 'Funcionarios',
  timestamps: false,
});

// Associação 1:1 (Funcionario -> Usuario)
Funcionario.belongsTo(Usuario, { foreignKey: 'idUsuario' });
Usuario.hasOne(Funcionario, { foreignKey: 'idUsuario' });

module.exports = Funcionario;
