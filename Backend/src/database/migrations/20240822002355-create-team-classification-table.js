'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('team_classifications',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        season_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'seasons',
            key: 'id'
          },
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE'
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
        position: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        points: {
          type: Sequelize.DOUBLE,
          allowNull: false,
        },
        chassis: {
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

  async down () {
  }
};
