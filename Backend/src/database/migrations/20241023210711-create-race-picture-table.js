"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "race_pictures",
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        original_name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        filename: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        race_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "races",
            key: "id",
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
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

  async down() {},
};
