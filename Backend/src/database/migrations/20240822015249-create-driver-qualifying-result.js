'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('driver_qualifying_results',
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
        qualifying_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'qualifyings',
            key: 'id'
          },
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE'
        },
        q1_time: {
          type: Sequelize.TIME,
          allowNull: false,
        },
        q2_time: {
          type: Sequelize.TIME,
          allowNull: false,
        },
        q3_time: {
          type: Sequelize.TIME,
          allowNull: false,
        },
        position: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        laps: {
          type: Sequelize.INTEGER,
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
