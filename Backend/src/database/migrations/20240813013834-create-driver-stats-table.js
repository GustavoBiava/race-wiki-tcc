'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('driver_stats', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      number: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      races_entered: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      drivers_championships: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      victories: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      podiums: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      career_points: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      highest_grid_position: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      highest_race_finish: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      times_highest_finish: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down () {
  }
};
