'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('career_contracts','isActive',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      });
  },

  async down () {}
};
