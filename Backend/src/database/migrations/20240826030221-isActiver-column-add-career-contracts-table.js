'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('career_contracts', 'is_active',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      });
  },

  async down () {
  }
};
