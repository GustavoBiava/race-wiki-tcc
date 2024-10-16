'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('teams', 'short_name',
      {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      });
  },

  async down () {
  }
};
