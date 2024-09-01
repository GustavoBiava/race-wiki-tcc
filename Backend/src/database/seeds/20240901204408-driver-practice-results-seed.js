"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "driver_practice_results",
      [
        {
          driver_id: 1,
          practice_id: 2,
          best_time: "00:01:23",
          interval_to_leader: "00:00:01",
          laps: 78,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          driver_id: 2,
          practice_id: 1,
          best_time: "00:01:11",
          interval_to_leader: "00:00:16",
          laps: 99,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("driver_practice_results", null, {});
  },
};

