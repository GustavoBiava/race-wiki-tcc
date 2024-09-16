"use strict";


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "tags_publications",
      [
        {
          tag_id: 1,
          publication_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          tag_id: 2,
          publication_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down() {},
};
