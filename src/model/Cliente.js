const { DataTypes, Model } = require('sequelize');
const sequelize = require('../util/database');
const Usuario = require('./Usuario');

class Cliente extends Model {}
Cliente.init({
   id_cliente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    score_credito: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      defaultValue: 0
    },
    Usuario_idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
      model: 'Usuario',
      key: 'idUsuario'
    }
      
    } 
  }, { 
    sequelize,
    modelName: 'Cliente',
    tableName: 'cliente',
    timestamps: false
});

Cliente.belongsTo(Usuario, {
  foreignKey: 'Usuario_idUsuario',
  as: 'usuario'
});

Usuario.hasOne(Cliente, {
  foreignKey: 'Usuario_idUsuario',
  as: 'cliente'
});

module.exports = Cliente;