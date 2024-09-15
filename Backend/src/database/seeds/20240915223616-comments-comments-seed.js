"use strict";


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "comments_comments",
      [
        {
          body: 'Sainz tá merecendo um carro competitivo faz tempo...',
          user_id: 2,
          comment_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          body: 'Concordo com você, ele não deveria ter renovado, quem sabe ir para a Mercedes seria uma boa...',
          user_id: 2,
          comment_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down() {},
};
