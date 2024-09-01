"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "career_contracts",
      [
        {
          driver_id: 1,
          team_id: 1,
          begin_date: "2022-01-02",
          end_date: "2028-01-02",
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          driver_id: 2,
          team_id: 2,
          begin_date: "2021-01-02",
          end_date: "2023-01-02",
          is_active: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("career_contracts", null, {});
  },
};

