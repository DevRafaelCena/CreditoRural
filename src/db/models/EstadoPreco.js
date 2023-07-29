const { DataTypes } = require('sequelize');
const { sequelize } = require('../index');

module.exports = (sequelize) => {
    const EstadoPreco = sequelize.define('EstadoPreco',{
        
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
            uf: {
                type: DataTypes.STRING(2),
                allowNull: false,
                unique: true,
            },
            preco: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
        },
        {
            tableName: 'estados_precos',
            timestamps: false,
        }
    );

    return EstadoPreco;
};
