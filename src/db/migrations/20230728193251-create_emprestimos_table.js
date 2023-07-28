'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('emprestimos', {

      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      produtor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'produtores',
          key: 'id',
        },

        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      qtd_sacas: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      data_quitacao: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      valor_total: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      
      date_created: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('emprestimos');
  }
};