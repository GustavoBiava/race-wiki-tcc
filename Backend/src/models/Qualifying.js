import Sequelize, { Model } from "sequelize";

export default class Qualifying extends Model {
  static init(sequelize) {
    super.init({
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
      is_done: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      race_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: 'Race_id need to be a integer!',
          }
        },
      }
    }, { sequelize });
    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Driver, { through: 'driver_qualifying_results', foreignKey: 'qualifying_id', as: 'qualifying' });
    this.belongsTo(models.Race, { foreignKey: 'race_id', as: 'race' });
  }
}
