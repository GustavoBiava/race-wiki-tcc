'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('drivers',
      {
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
        surname: {
          type: Sequelize.STRING,
          allowNull:false,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: false,
          defaultValue: '',
        },
        height: {
          type: Sequelize.FLOAT,
          allowNull:false,
        },
        birth_date: {
          type: Sequelize.DATEONLY,
          allowNull: false,
        },
        birth_place: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        short_name: {
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
