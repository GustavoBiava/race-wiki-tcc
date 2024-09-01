"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "driver_qualifying_results",
      [
        {
          driver_id: 1,
          qualifying_id: 2,
          q1_time: "00:01:51",
          q2_time: "00:01:50",
          q3_time: "00:01:36",
          position: 1,
          laps: 78,
          interval_to_leader: "00:00:16",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          driver_id: 2,
          qualifying_id: 1,
          q1_time: "00:01:50",
          q2_time: "00:01:35",
          q3_time: "00:01:20",
          position: 1,
          laps: 44,
          interval_to_leader: "00:00:00",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("driver_qualifying_results", null, {});
  },
};

