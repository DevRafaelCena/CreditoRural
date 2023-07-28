// db/index.js
const { Sequelize } = require('sequelize');
const config = require('./config/config');

const env = process.env.NODE_ENV || 'dev';

const sequelize = new Sequelize(config[env]);

// Importar todos os modelos
//const User = require('./models/User');
//const Product = require('./models/Product');

module.exports = { sequelize, User, Product };
