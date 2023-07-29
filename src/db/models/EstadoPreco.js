const { DataTypes } = require('sequelize');
const sequelize = require('../index'); // Importe a instância do Sequelize

module.exports = (sequelize) => {
    const EstadoPreco = sequelize.define(
        'EstadoPreco',
        {
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
            tableName: 'estados_precos', // Nome da tabela no banco de dados
            timestamps: false, // Desativa as colunas createdAt e updatedAt
        }
    );

    return EstadoPreco;
};
