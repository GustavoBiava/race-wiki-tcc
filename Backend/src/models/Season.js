import Sequelize, { Model } from "sequelize";

export default class Season extends Model {
  static init(sequelize) {
    super.init({
      year: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        unique: true,
        validate: {
          is: {
            args: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/,
            msg: 'Year is not a valid year (YYYY)',
          },
        }
      },
      begin_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        validate: {
          is: {
            args: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/,
            msg: 'Begin_date is not a valid Date (YYYY:MM:DD)',
          },
        }
      },
      end_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        validate: {
          is: {
            args: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/,
            msg: 'End_date is not a valid Date (YYYY:MM:DD)',
          },
        }
      },
      driver_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
          isInt: {
            msg: 'Driver_id need to be a integer!',
          }
        }
      },
      team_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
          isInt: {
            msg: 'Team_id need to be a integer!',
          }
        }
      }
    }, { sequelize });

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Team, { through: 'team_classifications' });
    this.belongsToMany(models.Driver, { through: 'driver_classifications', foreignKey: 'season_id' });
    this.hasMany(models.Race, { foreignKey: 'season_id' });
    this.belongsTo(models.Driver, { foreignKey: 'driver_id', as: 'winner_driver'});
    this.belongsTo(models.Team, { foreignKey: 'team_id', as: 'winner_constructor'});
  }

}
