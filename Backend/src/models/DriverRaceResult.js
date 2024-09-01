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
        onUpdate: 'CASCADE',
        validate: {
          isInt: {
            msg: 'Driver_id need to be a integer!',
          }
        }
      },
      race_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'races',
          key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        validate: {
          isInt: {
            msg: 'Race_id need to be a integer!',
          }
        }
      },
      position: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: 'Position not a integer value',
          }
        }
      },
      laps: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: 'Laps not a integer value',
          }
        }
      },
      points: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        validate: {
          isFloat: {
            msg: 'Points not a double value',
          }
        }
      },
      total_race_duration: {
        type: Sequelize.TIME,
        allowNull: false,
        validate: {
          is: {
            args: /^[0-9]{2}:[0-9]{2}:[0-9]{2}$/,
            msg: 'Total_race_duration is not a valid Time (HH:mm:ss)',
          },
        }
      },
      interval_to_leader: {
        type: Sequelize.TIME,
        allowNull: false,
        validate: {
          is: {
            args: /^[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}$/,
            msg: 'Interval_to_leader is not a valid Time (HH:mm:ss.SSS)',
          },
        }
      },
    }, { sequelize });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Driver, { foreignKey: 'driver_id' });
    this.belongsTo(models.Race, { foreignKey: 'race_id'});
  }

}
