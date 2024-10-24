"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "races",
      [
        {
          name: "Grande Prêmio de Monza",
          date: '2024-09-09',
          laps_quantity: 55,
          type: "NORMAL",
          race_distance: 7.9,
          race_place: 1,
          is_done: true,
          circuit_id: 1,
          season_id: 1,
          pole_position: 1,
          race_winner: 2,
          slug: 'grande-premio-de-monza',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Grande Prêmio de Interlagos",
          date: '2025-11-03',
          laps_quantity: 48,
          type: "SPRINT",
          race_distance: 4.9,
          race_place: 2,
          is_done: false,
          circuit_id: 2,
          season_id: 2,
          pole_position: 2,
          race_winner: 1,
          slug: 'grande-premio-de-interlagos',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("races", null, {});
  },
};

