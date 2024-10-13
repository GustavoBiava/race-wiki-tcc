"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "driver_stats",
      [
        {
          number: 55 ,
          races_entered: 103,
          drivers_championships: 1,
          victories: 25,
          podiums: 36,
          career_points: 1989.5,
          highest_grid_position: 1,
          highest_race_finish: 1,
          times_highest_finish: 25,
          driver_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          number: 1 ,
          races_entered: 432,
          drivers_championships: 3,
          victories: 66,
          podiums: 89,
          career_points: 2700.3,
          highest_grid_position: 1,
          highest_race_finish: 1,
          times_highest_finish: 66,
          driver_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        }
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("driver_stats", null, {});
  },
};
