const Sequelize = require('sequelize');
const sequelize = require('../utils/db');
const { Usuario } = require('../models/User'); 

const Livrarias = sequelize.define('livrarias', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  ms: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  pb: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  pndr: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  pdr: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  proteina_soluvel: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  fdn_efetivo: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  ndt: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  fdn: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  cnf: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  amido: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  ee: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  usuario_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'usuarios', 
      key: 'usuario_id',
    },
    allowNull: false,
  },
}, {
  schema: 'public',
  tableName: 'livrarias',
  timestamps: false,
});

Livrarias.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
Usuario.hasMany(Livrarias, { foreignKey: 'usuario_id', as: 'livrarias' });

module.exports = { Livrarias };
