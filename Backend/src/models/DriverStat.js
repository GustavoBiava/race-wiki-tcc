import Sequelize, { Model } from "sequelize";

export default class DriverStat extends Model {
  static init(sequelize) {
    super.init({
      number: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
        unique: true,
        validate: {
          isInt: {
            msg: 'Not a Integer value!',
          }
        }
      },
      races_entered: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isInt: {
            msg: 'Not a Integer value!',
          }
        }
      },
      drivers_championships: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isInt: {
            msg: 'Not a Integer value!',
          }
        }
      },
      victories: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isInt: {
            msg: 'Not a Integer value!',
          }
        }
      },
      podiums: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isInt: {
            msg: 'Not a Integer value!',
          }
        }
      },
      career_points: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isFloat: {
            msg: 'Not a Float value!',
          }
        }
      },
      highest_grid_position: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isFloat: {
            msg: 'Not a Integer value!',
          }
        }
      },
      highest_race_finish: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isFloat: {
            msg: 'Not a Integer value!',
          }
        }
      },
      times_highest_finish: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isFloat: {
            msg: 'Not a Integer value!',
          }
        }
      },
    }, { sequelize });
    return this;
  }

  static associate(models) {
    this.hasOne(models.Driver, { foreignKey: 'driver_stat_id' });
  }

}
