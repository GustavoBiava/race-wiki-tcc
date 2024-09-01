"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "drivers",
      [
        {
          name: "Max",
          surname: "Verstappen",
          description: "3 times world champiom",
          height: 1.8,
          nationality: "Netherlands",
          birth_date: "2024-12-29",
          birth_place: "Somewhere in Netherlands",
          short_name: "MAX",
          driver_stat_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Carlos",
          surname: "Sainz",
          description: "Smooth Operator",
          height: 1.76,
          nationality: "Spain",
          birth_date: "2024-09-01",
          birth_place: "Somewhere in Spain",
          short_name: "SAI",
          driver_stat_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("drivers", null, {});
  },
};
