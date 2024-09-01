"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "qualifyings",
      [
        {
          date: '2025-01-01',
          is_done: true,
          race_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          date: '2024-10-29',
          is_done: false,
          race_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("qualifyings", null, {});
  },
};

