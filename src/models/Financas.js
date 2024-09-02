const Sequelize = require("sequelize");
const sequelize = require("../utils/db");
const { Usuario } = require('../models/User')

const Financas = sequelize.define(
  "financas",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    nome_da_financa: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    valor_total_dieta: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    alimentos_select: {
      type: Sequelize.JSON,   
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
    tableName: "financas",
    timestamps: false,
  }
);

Financas.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
Usuario.hasMany(Financas, { foreignKey: 'usuario_id', as: 'financas' });

module.exports = { Financas };
