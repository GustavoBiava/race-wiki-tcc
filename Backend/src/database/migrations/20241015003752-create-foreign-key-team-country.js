'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('teams', 'nationality',
    {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'countries',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down () {
  }
};
