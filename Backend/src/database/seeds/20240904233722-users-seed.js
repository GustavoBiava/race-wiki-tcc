"use strict";

const bcryptjs = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          nickname: "admin",
          name: "Gustavo",
          surname: "Biava",
          email: "gustavo@email.com",
          password_hash: bcryptjs.hashSync("admin0000", 10),
          birth_date: "2006-12-06",
          type: "ADMIN",
          status: "ACTIVE",
          race_level: 10,
          race_points: 10000,
          favorite_driver: 1,
          favorite_team: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nickname: "MaxFan",
          name: "Albert",
          surname: "Moreno",
          email: "moreno@email.com",
          password_hash: bcryptjs.hashSync("Senha123@", 10),
          birth_date: "1996-09-09",
          type: "NORMAL",
          status: "ACTIVE",
          race_level: 0,
          race_points: 0,
          favorite_driver: 2,
          favorite_team: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down() {},
};
