import Sequelize, { Model } from "sequelize";

export default class DriverPracticeResult extends Model {
  static init(sequelize) {
    super.init({
      driver_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'drivers',
          key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        validate: {
          isInt: {
            msg: 'Driver_id need to be a integer!',
          }
        }
      },
      practice_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'practices',
          key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        validate: {
          isInt: {
            msg: 'Practice_id need to be a integer!',
          }
        }
      },
      best_time: {
        type: Sequelize.TIME,
        allowNull: false,
        validate: {
          is: {
            args: /^[0-9]{2}:[0-9]{2}:[0-9]{2}$/,
            msg: 'Best_time is not a valid Time (HH:mm:ss)',
          },
        }
      },
      interval_to_leader: {
        type: Sequelize.TIME,
        allowNull: false,
        validate: {
          is: {
            args: /^[0-9]{2}:[0-9]{2}:[0-9]{2}$/,
            msg: 'Interval_to_leader is not a valid Time (HH:mm:ss)',
          },
        }
      },
      laps: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isInt: {
            msg: 'Laps not a integer value!',
          }
        }
      },
    }, { sequelize });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Driver, { foreignKey: 'driver_id', as: 'driver_practice' });
    this.belongsTo(models.Practice, { foreignKey: 'practice_id', as: 'practice' });
  }

}
