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
        onUpdate: 'CASCADE',
        validate: {
          isInt: {
            msg: 'Driver_id need to be a integer!',
          }
        }
      },
      qualifying_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'qualifiers',
          key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        validate: {
          isInt: {
            msg: 'Qualifying_id need to be a integer!',
          }
        },
      },
      q1_time: {
        type: Sequelize.TIME,
        allowNull: false,
        validate: {
          is: {
            args: /^[0-9]{2}:[0-9]{2}:[0-9]{2}$/,
            msg: 'q1_time is not a valid Time (HH:mm:ss)',
          },
        }
      },
      q2_time: {
        type: Sequelize.TIME,
        allowNull: false,
        validate: {
          is: {
            args: /^[0-9]{2}:[0-9]{2}:[0-9]{2}$/,
            msg: 'q2_time is not a valid Time (HH:mm:ss)',
          },
        }
      },
      q3_time: {
        type: Sequelize.TIME,
        allowNull: false,
        validate: {
          is: {
            args: /^[0-9]{2}:[0-9]{2}:[0-9]{2}$/,
            msg: 'q3_time is not a valid Time (HH:mm:ss)',
          },
        }
      },
      position: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: 'Position not a integer value!',
          }
        }
      },
      laps: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: 'Laps not a integer value!',
          }
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
    }, { sequelize });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Driver, { foreignKey: 'driver_id', as: 'driver_qualifying'});
    this.belongsTo(models.Qualifying, { foreignKey: 'qualifying_id', as: 'qualifying' });
  }

}
