import Sequelize, { Model } from "sequelize";

export default class Race extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 50],
            msg: 'Invalid length (Min: 3, Max: 50)'
          }
        }
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        validate: {
          isDate: {
            args: true,
            msg: 'Invalid date!',
          },
        }
      },
      laps_quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
          isInt: {
            msg: 'Not a Integer value!',
          }
        }
      },
      type: {
        type: Sequelize.ENUM('NORMAL', 'SPRINT'),
        allowNull: false,
        defaultValue: 'NORMAL',
      },
      race_distance: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          isFloat: {
            msg: 'Not a Float value!',
          }
        }
      },
      isDone: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    }, { sequelize });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Circuit);
    this.belongsToMany(models.Team, { through: 'team_race_results' });
    this.belongsToMany(models.Driver, { through: 'driver_race_results' });
    this.belongsTo(models.Season);
    this.hasMany(models.Practice, { foreignKey: 'race_id' });
    this.hasOne(models.Qualifying, { foreignKey: 'qualifying_id' });
  }

}
