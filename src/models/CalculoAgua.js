const Sequelize = require("sequelize");
const sequelize = require("../utils/db");
const { Usuario } = require('../models/User');

const CalculoAgua = sequelize.define(
  "calculo_agua",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    nome_calculo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    valor_materia_seca_existente: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    valor_materia_seca_estimada: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    resultado: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    usuario_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'usuarios',
        key: 'usuario_id'
      },
      allowNull: false,
    },
  },
  {
    schema: "public",
    tableName: "calculo_agua",
    timestamps: false,
  }
);

CalculoAgua.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
Usuario.hasMany(CalculoAgua, { foreignKey: 'usuario_id', as: 'calculos_agua' });

module.exports = { CalculoAgua };
