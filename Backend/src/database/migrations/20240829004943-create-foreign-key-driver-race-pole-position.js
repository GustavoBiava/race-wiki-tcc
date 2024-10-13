'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('races', 'pole_position',
    {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'drivers',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down () {
  }
};
