import Sequelize, { Model } from "sequelize";

export default class DriverQualifyingResult extends Model {
  static init(sequelize) {
    super.init({
      driver_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'drivers',
          key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },
      qualifying_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'qualifiers',
          key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },
      Q1_TIME: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      Q2_TIME: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      Q3_TIME: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      position: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: 'Not a integer value!',
          }
        }
      },
      laps: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: 'Not a integer value!',
          }
        }
      },
      interval_to_leader: {
        type: Sequelize.TIME,
        allowNull: false,
      },
    }, { sequelize });
    return this;
  }
}
