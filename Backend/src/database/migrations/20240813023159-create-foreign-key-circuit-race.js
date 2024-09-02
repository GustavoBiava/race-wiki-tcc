"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('races', 'circuit_id',
    {
      type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'circuits',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
  },

  async down (queryInterface) {
    await queryInterface.removeColumn('races', 'circuit_id');
  }
};
