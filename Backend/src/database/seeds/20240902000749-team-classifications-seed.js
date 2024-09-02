"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "team_classifications",
      [
        {
          season_id: 2,
          team_id: 1,
          position: 1,
          points: 325,
          chassis: "RB19",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          season_id: 1,
          team_id: 2,
          position: 2,
          points: 210,
          chassis: "FR24",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("team_classifications", null, {});
  },
};

