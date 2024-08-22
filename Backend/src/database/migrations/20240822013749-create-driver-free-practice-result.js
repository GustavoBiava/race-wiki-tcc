'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('driver_practice_results',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        driver_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'drivers',
            key: 'id'
          },
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE'
        },
        pratice_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'practices',
            key: 'id'
          },
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE'
        },
        best_time: {
          type: Sequelize.TIME,
          allowNull: false,
        },
        interval_to_leader: {
          type: Sequelize.TIME,
          allowNull: false,
        },
        laps: {
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

  async down () {}
};
