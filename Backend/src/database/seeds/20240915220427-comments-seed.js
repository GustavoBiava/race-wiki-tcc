"use strict";


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "comments",
      [
        {
          title: 'Opinião sobre renovação',
          body: 'Max vacilou... Devia ter aceitado a proposta da McLaren, melhor carro do grid faz anos.',
          user_id: 1,
          publication_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Carlos Sainz de saída da Willians após meia temporada',
          body: 'Hmmm isso me cheira a transferência... Mercedes tava de olho faz tempo.',
          user_id: 2,
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
