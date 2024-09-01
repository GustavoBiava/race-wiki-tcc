"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "teams",
      [
        {
          name: "Red Bull",
          description: "Austrian Team",
          first_participation: "1955-01-01",
          team_chief: "Christian Horner",
          technical_chief: "Getulio Vargas",
          constructors_championships: 7,
          highest_race_finish: 1,
          times_highest_finish: 99,
          fastest_laps: 167,
          pole_positions: 299,
          main_color: "#1212ew",
          secondary_color: "#4343dd",
          power_unit: "RBuniv 29",
          base: "Milton, United States",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Ferrari",
          description: "Italian Team",
          first_participation: "1955-01-01",
          team_chief: "Fernando Collor",
          technical_chief: "Getulio Vargas",
          constructors_championships: 10,
          highest_race_finish: 1,
          times_highest_finish: 99,
          fastest_laps: 167,
          pole_positions: 299,
          main_color: "#1212ew",
          secondary_color: "#4343dd",
          power_unit: "FERRAuniv 29",
          base: "Monza, Italy",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("teams", null, {});
  },
};

