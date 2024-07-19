const Sequelize = require("sequelize");
const sequelize = require("../utils/db");
const { Usuario } = require('../models/User')

const Dietas = sequelize.define(
  "dietas",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    nome_da_dieta: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    peso_medio: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    producao_estimada: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    del: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    fill_preenchimento_ruminal: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    preco_do_leite: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    pb_dieta: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    pndr_dieta: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    pdr_dieta: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    proteina_soluvel_dieta: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    fdn_efetivo_dieta: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    ndt_dieta: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    fdn_dieta: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    cnf_dieta: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    amido_dieta: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    ee_dieta: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    ms_dieta: {
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
    tableName: "dietas",
    timestamps: false,
  }
);

Dietas.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
Usuario.hasMany(Dietas, { foreignKey: 'usuario_id', as: 'dietas' });

module.exports = { Dietas };
