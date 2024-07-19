const Sequelize = require("sequelize");
const sequelize = require("../utils/db");
const { Usuario } = require('../models/User')

const Resumos = sequelize.define(
    "resumos",
    {
        id:{
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        nome_resumo: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        alimentos_select: {
            type: Sequelize.JSON,
            allowNull: false,
        }, 
        milho_estimado: {
            type: Sequelize.FLOAT,
            allowNull: true,
        },
        materia_seca_existente: {
            type: Sequelize.FLOAT,
            allowNull: true,
        },
         fracao_proteica_necessaria: {
            type: Sequelize.FLOAT,
            allowNull: true,
        },
        materia_seca_faltando:{
            type: Sequelize.FLOAT,
            allowNull: true,
        },
        mineral: {
            type: Sequelize.FLOAT,
            allowNull: true,
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
        amido_estimado: {
            type: Sequelize.FLOAT,
            allowNull: true,
        },
        usuario_id: {
            type: Sequelize.INTEGER,
            references: {
              model: 'usuarios',
              key: 'usuario_id'
            },
            allowNull: false,
    
    }
}, 
    {
        schema: "public",
        tableName: "resumos",
        timestamps: false,
    }
);

Resumos.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
Usuario.hasMany(Resumos, { foreignKey: 'usuario_id', as: 'resumos' });

module.exports = { Resumos };
