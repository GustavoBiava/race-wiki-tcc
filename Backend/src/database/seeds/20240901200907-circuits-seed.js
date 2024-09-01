"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "circuits",
      [
        {
          name: "CircuitTest",
          first_apparition: "1977-01-01",
          circuit_length: 10.3,
          fastest_lap_record: "00:01:15",
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "CircuitTest2",
          first_apparition: "1979-01-01",
          circuit_length: 7.3,
          fastest_lap_record: "00:01:04",
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("circuits", null, {});
  },
};
