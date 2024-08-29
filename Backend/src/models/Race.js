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
            msg: 'Nmae invalid length (Min: 3, Max: 50)'
          }
        }
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        validate: {
          is: {
            args: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/,
            msg: 'Date is not a valid Date (YYYY-MM-DD)',
          },
        }
      },
      laps_quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
          isInt: {
            msg: 'Laps_quantity not a Integer value!',
          }
        }
      },
      type: {
        type: Sequelize.ENUM('NORMAL', 'SPRINT'),
        allowNull: false,
        defaultValue: 'NORMAL',
        validate: {
          len: {
            args: [6,6],
            msg: 'Type invalid value! (NORMAL or SPRINT)',
          }
        }
      },
      race_distance: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          isFloat: {
            msg: 'Race_distance not a Float value!',
          }
        }
      },
      race_place: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 50],
            msg: 'Race_place invalid length! (Min: 3, Max: 50)',
          }
        }
      },
      is_done: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      circuit_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: 'Circuit_id need to be a integer!',
          }
        }
      },
      season_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: 'Season_id need to be a integer!',
          }
        }
      },
      pole_position: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        validate: {
          isInt: {
            msg: 'Pole_position need to be a integer!',
          }
        }
      },
      race_winner: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        validate: {
          isInt: {
            msg: 'Winner_driver need to be a integer!',
          }
        }
      }
    }, { sequelize });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Circuit, { foreignKey: 'circuit_id', as: 'circuit' });
    this.belongsToMany(models.Team, { through: 'team_race_results' });
    this.belongsToMany(models.Driver, { through: 'driver_race_results' });
    this.belongsTo(models.Season, { foreignKey: 'season_id', as: 'season' });
    this.hasMany(models.Practice, { foreignKey: 'race_id' });
    this.hasOne(models.Qualifying, { foreignKey: 'race_id' });
    this.belongsTo(models.Driver, { foreignKey: 'pole_position', as: 'position_pole' });
    this.belongsTo(models.Driver, { foreignKey: 'race_winner', as: 'winner_driver'});
  }

}
