"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "team_race_results",
      [
        {
          team_id: 1,
          race_id: 2,
          laps: 66,
          points: 18,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          team_id: 2,
          race_id: 1,
          laps: 90,
          points: 33,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("team_race_results", null, {});
  },
};

