"use strict";

const bcryptjs = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "publications",
      [
        {
          title: 'Max verstappen acerta renovação com RedBull até 2028',
          body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
          slug: 'max-verstappen-acerta-renovação-com-redbull-ate-2028',
          likes: 0,
          author: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Carlos Sainz de saída da Willians após meia temporada',
          body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
          slug: 'carlos-sainz-de-saída-da-willians-apos-meia-temporada',
          likes: 0,
          author: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down() {},
};
