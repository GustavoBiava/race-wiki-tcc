'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('teams', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      first_participation: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      team_chief: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      technical_chief: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      constructors_championships: {
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
      fastest_laps: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      pole_positions: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      main_color: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      secondary_color: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      power_unit: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      base: {
        type: Sequelize.STRING,
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

  async down () {}
};
