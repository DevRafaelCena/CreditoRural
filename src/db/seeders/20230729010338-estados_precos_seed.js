'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('estados_precos', [
      {
        nome: 'São Paulo',
        uf: 'SP',
        preco: 1050.00,
      },
      {
        nome: 'Minas Gerais',
        uf: 'MG',
        preco: 1100.00,
      },
      {
        nome: 'Espírito Santo',
        uf: 'ES',
        preco: 1030.00,
      },
      {
        nome: 'Bahia',
        uf: 'BH',
        preco: 1080.00,
      },
      // Adicione mais dados se desejar
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('estados_precos', null, {});
  }
};