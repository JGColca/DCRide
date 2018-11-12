'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      carstartlocation: {
        type: Sequelize.STRING
      },
      pickuplocation: {
        type: Sequelize.STRING
      },
      dropofflocation: {
        type: Sequelize.STRING
      },
      pickupduration: {
        type: Sequelize.STRING
      },
      tripduration: {
        type: Sequelize.STRING
      },
      cost: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Transactions');
  }
};