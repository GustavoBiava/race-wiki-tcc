import Sequelize, { Model } from "sequelize";

export default class Driver extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 50],
            msg: 'Name invalid length (Min: 3, Max: 50)'
          }
        }
      },
      surname: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 50],
            msg: 'Surname invalid length (Min: 3, Max: 50)'
          }
        }
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: '',
      },
      height: {
        type: Sequelize.FLOAT,
        allowNull:false,
        validate: {
          isFloat: {
            msg: 'Height not a Float value!',
          }
        }
      },
      nationality: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 50],
            msg: 'Nationality invalid length (Min: 3, Max: 50)'
          }
        }
      },
      birth_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {
          is: {
            args: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/,
            msg: 'birth_date is not a valid Date (YYYY-MM-DD)',
          },
        }
      },
      birth_place: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 50],
            msg: 'Birth_place invalid length (Min: 3, Max: 50)'
          }
        }
      },
      short_name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 10],
            msg: 'Short_name invalid length (Min: 3, Max: 10)'
          }
        }
      },
      driver_stat_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        validate: {
          isInt: {
            msg: 'Driver_stat_id need to be a Integer!',
          }
        }
      }
    }, { sequelize });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.DriverStat, { foreignKey: 'driver_stat_id', as: 'driver_stat',});
    this.belongsToMany(models.Team, { through: 'career_contracts' });
    this.belongsToMany(models.Season, { through: 'driver_classifications' });
    this.belongsToMany(models.Race, { through: 'driver_race_results' });
    this.belongsToMany(models.Practice, { through: 'driver_pratice_results' });
    this.belongsToMany(models.Qualifying, { through: 'driver_qualifying_results' });
    this.hasMany(models.Season, { foreignKey: 'driver_id' });
    this.hasMany(models.Race, { foreignKey: 'pole_position'});
    this.hasMany(models.Race, { foreignKey: 'race_winner'});
  }

}
