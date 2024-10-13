"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "countries",
      [
        {
          name: 'Brasil',
          iso3: 'BRA',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Holanda',
          iso3: 'NLD',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Espanha',
          iso3: 'ESP',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Argentina',
          iso3: 'ARG',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("countries", null, {});
  },
};
