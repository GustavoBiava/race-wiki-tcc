import Sequelize, { Model } from "sequelize";

export default class CareerContracts extends Model {
  static init(sequelize) {
    super.init({
      driver_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'drivers',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        validate: {
          isInt: {
            msg: 'Driver_id need to be a integer!',
          }
        }
      },
      team_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'teams',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        validate: {
          isInt: {
            msg: 'Team_id need to be a integer!',
          }
        }
      },
      begin_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
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
        validate: {
          is: {
            args: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/,
            msg: 'Begin_date is not a valid Date (YYYY:MM:DD)',
          },
        }
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    }, { sequelize });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Driver, { foreignKey: 'driver_id'});
    this.belongsTo(models.Team, { foreignKey: 'team_id' });
  }

}
