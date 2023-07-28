const { DataTypes } = require('sequelize');
const { sequelize } = require('../index');
const Produtores = require('./Produtores');

const Emprestimos = sequelize.define('Emprestimos', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  produtor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  qtd_sacas: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  data_quitacao: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  valor_total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  date_created: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'emprestimos',
});

Emprestimos.belongsTo(Produtores, { foreignKey: 'produtor_id' });

module.exports = Emprestimos;
