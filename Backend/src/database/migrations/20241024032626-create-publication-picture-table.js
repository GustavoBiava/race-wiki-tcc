"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "publication_pictures",
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
        publication_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: false,
          references: {
            model: "publications",
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
