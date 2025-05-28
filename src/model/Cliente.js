const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Cliente = sequelize.define('Cliente', {
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
      allowNull: false
    }
  }, {
    tableName: 'cliente',
    timestamps: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci'
  });

  // Associação (relacionamento com a tabela Usuario)
  Cliente.associate = (models) => {
    Cliente.belongsTo(models.Usuario, {
      foreignKey: 'Usuario_idUsuario',
      targetKey: 'idUsuario',
      as: 'usuario',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    });
  };

  return Cliente;
};

