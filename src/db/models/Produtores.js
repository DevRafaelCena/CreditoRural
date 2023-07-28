const { DataTypes } = require('sequelize');
const { sequelize } = require('../index');

module.exports = (sequelize) => {
    
    const Produtores = sequelize.define('Produtores', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cep: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        estado: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        data_create: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        data_update: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    }, {
         tableName: 'produtores',
        }
    );
    return Produtores;
};
