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
            msg: 'Number field not a Integer value!',
          }
        }
      },
      races_entered: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isInt: {
            msg: 'Races_entered not a Integer value!',
          }
        }
      },
      drivers_championships: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isInt: {
            msg: 'Drivers_championships not a Integer value!',
          }
        }
      },
      victories: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isInt: {
            msg: 'Victories not a Integer value!',
          }
        }
      },
      podiums: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isInt: {
            msg: 'Podiums not a Integer value!',
          }
        }
      },
      career_points: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isFloat: {
            msg: 'Career_points not a Float value!',
          }
        }
      },
      highest_grid_position: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isInt: {
            msg: 'Highest_grid_position not a Integer value!',
          }
        }
      },
      highest_race_finish: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isInt: {
            msg: 'Highest_race_finish not a Integer value!',
          }
        }
      },
      times_highest_finish: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isInt: {
            msg: 'Times_highest_finish not a Integer value!',
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
