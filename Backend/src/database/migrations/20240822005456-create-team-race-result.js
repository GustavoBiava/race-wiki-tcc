'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('team_race_results',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        team_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'teams',
            key: 'id'
          },
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE'
        },
        race_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'races',
            key: 'id'
          },
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE'
        },
        position: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        laps: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        points: {
          type: Sequelize.DOUBLE,
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
