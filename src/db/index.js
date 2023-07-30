const { Sequelize } = require('sequelize');
const config = require('./config/config');

const env = process.env.NODE_ENV || 'development';

async function loadSequelize() {
  try {
    const sequelize = new Sequelize(config[env]);
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
    await sequelize.authenticate();
    return sequelize;
  } catch (error) {
    console.error('Erro ao conectar-se ao banco de dados:', error.message);
    throw error;
  }
}

module.exports = { loadSequelize };
