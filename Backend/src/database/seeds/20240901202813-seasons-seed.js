"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "seasons",
      [
        {
          year: "2024-01-01",
          begin_date: "2024-01-01",
          end_date: "2024-12-30",
          driver_id: 2,
          team_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          year: "2025-01-01",
          begin_date: "2025-01-01",
          end_date: "2025-12-30",
          driver_id: 1,
          team_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("seasons", null, {});
  },
};

