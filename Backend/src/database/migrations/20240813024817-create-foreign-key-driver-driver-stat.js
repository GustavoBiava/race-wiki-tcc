"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('driver_stats', 'driver_id',
    {
      type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
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
