import Sequelize, { Model } from "sequelize";

export default class Practice extends Model {
  static init(sequelize) {
    super.init({
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        validate: {
          isDate: {
            msg: 'Invalid date!',
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
    this.belongsToMany(models.Driver, { through: 'driver_pratice_results' });
    this.belongsTo(models.Race);
  }

}
