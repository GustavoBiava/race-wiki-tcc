import Sequelize, { Model } from "sequelize";

export default class Season extends Model {
  static init(sequelize) {
    super.init({
      year: {
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
      begin_date: {
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
      end_date: {
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
      winner_driver: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      winner_constructor: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    }, { sequelize });
    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Team, { through: 'team_classifications' });
    this.belongsToMany(models.Driver, { through: 'driver_classifications' });
    this.hasMany(models.Race, { foreignKey: 'season_id' });
    this.belongsTo(models.Driver);
    this.belongsTo(models.Team);
  }

}
