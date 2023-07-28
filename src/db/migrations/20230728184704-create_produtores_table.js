'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('produtores', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nome: {
        type: Sequelize.STRING(150),
        allowNull: false,        
      },
      cep: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      estado: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      data_create: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      data_update: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
   
    await queryInterface.sequelize.query(`
      CREATE TRIGGER update_produtores_data_update
      BEFORE UPDATE ON produtores
      FOR EACH ROW
      BEGIN
        SET NEW.data_update = CURRENT_TIMESTAMP;
      END;
    `);
  },

  down: async (queryInterface, Sequelize) => {
   
    await queryInterface.sequelize.query(`
      DROP TRIGGER IF EXISTS update_produtores_data_update;
    `);
   
    await queryInterface.dropTable('produtores');
  }
};