"use strict";


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "tags",
      [
        {
          tag_name: "Max Verstappen",
          slug: "max-verstappen",
          type: "DRIVER",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          tag_name: "Kick Sauber",
          slug: "kick-sauber",
          type: "TEAM",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down() {},
};
