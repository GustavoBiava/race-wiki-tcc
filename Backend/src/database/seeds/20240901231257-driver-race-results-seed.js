"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "driver_race_results",
      [
        {
          driver_id: 1,
          race_id: 2,
          position: 1,
          laps: 48,
          points: 25,
          total_race_duration: "01:32:33",
          interval_to_leader: "00:00:00.000",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          driver_id: 2,
          race_id: 1,
          position: 2,
          laps: 59,
          points: 18,
          total_race_duration: "01:35:22",
          interval_to_leader: "00:00:17.090",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("driver_race_results", null, {});
  },
};

