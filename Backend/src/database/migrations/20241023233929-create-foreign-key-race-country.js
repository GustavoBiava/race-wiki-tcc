'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE races
      DROP COLUMN race_place;
    `);

    await queryInterface.addColumn('races', 'race_place', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'countries',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down () {
  }
};
