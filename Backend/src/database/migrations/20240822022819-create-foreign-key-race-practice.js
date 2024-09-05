'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('practices', 'race_id',
    {
      type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'races',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
  },

  async down () {
  }
};
