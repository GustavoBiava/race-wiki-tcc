"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "driver_classifications",
      [
        {
          season_id: 2,
          driver_id: 1,
          position: 1,
          points: 325,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          season_id: 1,
          driver_id: 2,
          position: 2,
          points: 210,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("driver_classifications", null, {});
  },
};

