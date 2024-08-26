import Sequelize, { Model } from "sequelize";

export default class DriverRaceResult extends Model {
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
      race_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'races',
          key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },
      position: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: 'Not a integer value',
          }
        }
      },
      laps: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: 'Not a integer value',
          }
        }
      },
      points: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        validate: {
          msg: 'Not a double value',
        }
      },
      total_race_duration: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      interval_to_leader: {
        type: Sequelize.TIME,
        allowNull: false,
      },
    }, { sequelize });
    return this;
  }
}
