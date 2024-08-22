import Sequelize, { Model } from "sequelize";

export default class DriverPraticeResult extends Model {
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
      pratice_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'practices',
          key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },
      best_time: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      interval_to_leader: {
        type: Sequelize.TIME,
        allowNull: false,
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
    }, { sequelize });
    return this;
  }
}
