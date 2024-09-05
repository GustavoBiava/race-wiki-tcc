'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('driver_race_results',
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
        total_race_duration: {
          type: Sequelize.TIME,
          allowNull: false,
        },
        interval_to_leader: {
          type: Sequelize.TIME,
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
