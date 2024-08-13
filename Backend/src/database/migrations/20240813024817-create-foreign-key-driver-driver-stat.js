"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('drivers', 'driver_stat_id',
    {
      type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'driver_stats',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
  },

  async down() {},
};
